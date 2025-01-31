import { IUser } from "./user.interface";
import { User } from "./user.model";

const registerUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const getUser = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

export const userService = {
  registerUser,
  getUser,
  getSingleUser,
};
