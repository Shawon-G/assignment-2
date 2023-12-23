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

//  Get a single user:
const getASingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await usersServices.getASingleUser(Number(id));
    if (result === null) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Delete a single user:
const deleteASingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await usersServices.deleteASingleUser(Number(id));
    if (result === null) {
      res.status(404).json({
        success: false,
        message: 'Specefic user is not found',
        error: {
          code: 404,
          description: 'Specefic user is not found',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User is deleted successfully!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Update a single user:
const updateASingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const updatedInformation = req.body;

    // Validation using JOI:
    const { error } = usersValidationSchema.validate(updatedInformation);
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error,
      });
    }

    const result = await usersServices.updateASingleUser(
      Number(id),
      updatedInformation,
    );
    if (result === null) {
      return res.status(404).json({
        success: false,
        message: 'Specefic user is not found for updating',
        error: {
          code: 404,
          description: 'Specefic user is not found for updating',
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'User is updated successfully!',
        data: result,
      });
    }
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
  getASingleUser,
  deleteASingleUser,
  updateASingleUser,
};
