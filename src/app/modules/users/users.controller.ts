import { Request, Response } from 'express';
import { usersServices } from './users.service';
import UsersModel from './users.model';
import usersValidationSchema from './users.joi.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Validation using JOI:
    const { error } = usersValidationSchema.validate(user);
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error,
      });
    }

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

// Getting All Data:
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'All Users Retreieved Successfully!',
      data: result,
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
  getAllUsers,
};
