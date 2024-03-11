import { Router } from 'express'

import { registerUser, /*findUsers,*/ getCurrentUser, deleteOne, resetUserPassword } from '../../controllers/apiR.controllers/usersRouter.controller.js'

export const usersRouter = Router()

usersRouter.post('/', registerUser);
//usersRouter.get('/', findUsers); probar despues
usersRouter.get('/current', getCurrentUser);

usersRouter.delete('/:userId', deleteOne);

usersRouter.put("/reset", resetUserPassword);
