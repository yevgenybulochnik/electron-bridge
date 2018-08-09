import { Router } from 'express';
import * as controller from './usersController';
import authenticate from '../authMiddleware';

const UsersRouter = Router()

UsersRouter.get('/:userID/menu', controller.getUserMenu)

export default UsersRouter
