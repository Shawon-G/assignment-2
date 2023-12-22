import { Request, Response } from 'express';
import { usersServices } from './users.service';
import UsersModel from './users.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await usersServices.createUserIntoDB(user);

    const createdUser = await UsersModel.findOne({
      userId: result.userId,
    }).select('-password');

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const usersController = {
  createUser,
};
