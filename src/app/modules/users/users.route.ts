import express from 'express';
import { usersController } from './users.controller';

const router = express.Router();

router.post('/', usersController.createUser);

export const usersRouter = router;
