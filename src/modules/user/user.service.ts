import { User } from "./user.model";
import { TUser } from "./user.validation";

// Create a new user
export const createUserIntoDB = async (userData: TUser) => {
    const data = new User(userData);
    return await User.create(data);
};

// Get all users
export const getAllUsersFromDB = async () => {
    return await User.find();
};

// Get a single user by ID
export const getUserByIdFromDB = async (id: string) => {
    return await User.findById(id);
};

// Update a user by ID
export const updateUserByIdIntoDB = async (id: string, userData: Partial<TUser>) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

// Delete a user by ID
export const deleteUserByIdFromDB = async (id: string) => {
    return await User.findByIdAndDelete(id);
};
