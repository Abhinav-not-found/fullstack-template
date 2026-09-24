import type { Response } from 'express';
import cookie from '../../shared/constants/cookie.constant.js';
import type mongoose from 'mongoose';
import Token from '../../shared/utils/token.util.js';

const token = new Token();

class AuthSession {
  generateToken(userId: mongoose.Types.ObjectId) {
    const accessToken = token.generateAccessToken({ id: userId });
    const refreshToken = token.generateRefreshToken({ id: userId });

    return { accessToken, refreshToken };
  }

  setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, cookie.accessTokenOpts);
    res.cookie('refreshToken', refreshToken, cookie.refreshTokenOpts);
  }

  issue(res: Response, userId: mongoose.Types.ObjectId) {
    const { accessToken, refreshToken } = this.generateToken(userId);

    this.setCookies(res, accessToken, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  clearCookies(res: Response) {
    res.clearCookie('accessToken', cookie.accessTokenOpts);
    res.clearCookie('refreshToken', cookie.refreshTokenOpts);
  }
}
export default AuthSession;
