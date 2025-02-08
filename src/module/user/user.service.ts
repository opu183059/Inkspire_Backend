import { IUser } from "./user.interface";
import { User } from "./user.model";

const registerUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const getUser = async (): Promise<IUser[]> => {
  const result = await User.find().sort({
    createdAt: -1,
  });
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

const handleBlockStatus = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  return await User.findByIdAndUpdate(
    userId,
    { isBlocked: !user.isBlocked },
    { new: true }
  );
};

const handleDeleteStatus = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  return await User.findByIdAndUpdate(
    userId,
    { isDeleted: !user.isDeleted },
    { new: true }
  );
};

export const userService = {
  registerUser,
  getUser,
  getSingleUser,
  handleBlockStatus,
  handleDeleteStatus,
};
