import { Response } from 'express'
import { RequestWithUser } from './authController';
import User from '../models/User';

export const updateUser = async (req: RequestWithUser, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ ack: 0, message: 'User not found' });
    }

    res.status(200).json({ ack: 1 });
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'User update failed' });
  }
};


export const getUserDetails = async (req: RequestWithUser, res: Response) => {
    try {
      // Find the user by ID and exclude the 'password' field
      const user = await User.findById(req.user.userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ ack: 0, message: 'User not found' });
      }
  
      res.status(200).json({ ack: 1, user });
    } catch (error) {
      res.status(500).json({ ack: 0, message: 'Failed to fetch user details' });
    }
}
