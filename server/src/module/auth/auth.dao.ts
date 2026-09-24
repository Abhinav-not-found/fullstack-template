import mongoose from 'mongoose';
import { type UserDocument } from './user.model.js';
import type { CreateNewUserPayload } from './auth.types.js';
import User from './user.model.js';

class AuthDao {
  findUserByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email });
  }

  createNewUser(data: CreateNewUserPayload): Promise<UserDocument> {
    return User.create(data);
  }

  updateRefreshToken = (
    userId: mongoose.Types.ObjectId,
    refreshToken: string,
  ): Promise<UserDocument | null> => {
    return User.findByIdAndUpdate(userId, { refreshToken });
  };

  findUserById = (id: mongoose.Types.ObjectId | string): Promise<UserDocument | null> => {
    return User.findById(id);
  };
}
export default AuthDao;
