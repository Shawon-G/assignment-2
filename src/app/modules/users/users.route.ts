import express from 'express';
import { usersController } from './users.controller';

const router = express.Router();

router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getASingleUser);
router.delete('/:userId', usersController.deleteASingleUser);
router.put('/:userId', usersController.updateASingleUser);

export const usersRouter = router;
