import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  isBlocked?: boolean;
  isDeleted?: boolean;
}
