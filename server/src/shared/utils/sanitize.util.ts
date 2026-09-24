import type { UserDocument } from "../../module/auth/user.model.js";

export function sanitizeUser(user: UserDocument) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
}