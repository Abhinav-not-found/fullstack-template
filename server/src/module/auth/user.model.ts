import mongoose, { type HydratedDocument } from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser {
  name: string;
  email: string;
  password: string | null;
  provider: "local" | "google";
  googleId: string | null;
  refreshToken: string | null;
  avatar:string | null;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

export type UserDocument = HydratedDocument<IUser, IUserMethods>;


const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true,'Name is required'],
    trim:true,
  },
  email: {
    type: String,
    required: [true,'Email is required'],
    unique: true,
    trim:true,
    lowercase:true,
  },
  password: {
    type: String,
    default:null,
    minlength:[6,'Minimum 6 characters are required']
  },
  refreshToken:{
    type: String,
    default:null
  },
  provider:{
    type:String,
    enum:['local','google'],
    default:'local'
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  avatar: {
    type: String,
    default: null,
    },
},{
  timestamps:true
});

userSchema.pre('save',async function():Promise<void>{
  if(!this.isModified('password') || !this.password) return
  this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;