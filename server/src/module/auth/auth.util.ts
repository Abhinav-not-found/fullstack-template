import type { Request } from 'express';
import type { UserDocument } from '@/module/auth/user.model.js';
import ApiError from '@/shared/utils/apiError.util.js';

export const getCurrentUser = (req: Request) => {
  if (!req.user) throw ApiError.unAuthorized('Invalid session');

  return req.user.id;
};

export function sanitizeUser(user: UserDocument) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
}
