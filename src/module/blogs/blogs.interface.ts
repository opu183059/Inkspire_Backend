import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IBlog {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  author?: Types.ObjectId;
  isPublished?: boolean;
}

export interface IAuthorInfo {
  name: string;
  email: string;
}
