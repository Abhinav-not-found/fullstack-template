import cookie from '../../shared/constants/cookie.constant.js';
import ApiError from '../../shared/utils/apiError.util.js';
import ApiResponse from '../../shared/utils/apiResponse.util.js';
import AsyncHandler from '../../shared/utils/async-handler.util.js';
import { sanitizeUser } from '../../shared/utils/sanitize.util.js';
import Token from '../../shared/utils/token.util.js';
import AuthDao from './auth.dao.js';
import AuthSession from './auth.session.js';

const authDao = new AuthDao();
const authSession = new AuthSession();
const token = new Token();

class AuthController {
  register = AsyncHandler(async (req, res) => {
    const data = req.body;

    const user = await authDao.findUserByEmail(data.email);
    if (user) throw ApiError.badRequest('User already exist');

    const newUser = await authDao.createNewUser(data);

    const tokens = await authSession.issue(res, newUser._id);

    await authDao.updateRefreshToken(newUser._id, tokens.refreshToken);

    return ApiResponse.created('Register successful', sanitizeUser(newUser)).send(res);
  });

  login = AsyncHandler(async (req, res) => {
    const data = req.body;

    const user = await authDao.findUserByEmail(data.email);
    if (!user) throw ApiError.unAuthorized('Invalid credentials');

    const validatePassword = await user.comparePassword(data.password);
    if (!validatePassword) throw ApiError.unAuthorized('Invalid credentials');

    const tokens = await authSession.issue(res, user._id);

    await authDao.updateRefreshToken(user._id, tokens.refreshToken);

    return ApiResponse.ok('Login successful', sanitizeUser(user)).send(res);
  });

  logout = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw ApiError.unAuthorized('Unauthorized');
    }

    const user = await authDao.findUserById(req.user.id);
    if (!user) throw ApiError.notFound('User not found');

    if (user.refreshToken === req.cookies.refreshToken) {
      user.refreshToken = null;
      await user.save();
    }

    await authSession.clearCookies(res);

    return ApiResponse.ok('Logout successful').send(res);
  });

  refresh = AsyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw ApiError.unAuthorized('Unauthorized - no token provided');

    const decoded = token.verifyRefreshToken(refreshToken);
    if (!decoded) throw ApiError.unAuthorized('Invalid token');

    const userId = decoded.id;

    const user = await authDao.findUserById(userId);
    if (!user) throw ApiError.notFound('User not found');

    if (user.refreshToken !== req.cookies.refreshToken) {
      throw ApiError.unAuthorized('Refresh token is expired or already used');
    }

    const newAccessToken = token.generateAccessToken({ id: user._id });
    res.cookie('accessToken', newAccessToken, cookie.accessTokenOpts);

    return ApiResponse.ok('Token refreshed').send(res);
  });

  me = AsyncHandler(async (req, res) => {
    if (!req.user) throw ApiError.unAuthorized('Invalid session');
    const userId = req.user.id;

    const user = await authDao.findUserById(userId);
    if (!user) throw ApiError.notFound('User not found');

    return ApiResponse.ok('Fetched user info', sanitizeUser(user)).send(res);
  });
}

export default AuthController;
