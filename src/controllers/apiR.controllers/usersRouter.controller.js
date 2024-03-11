import passport from 'passport';
import { errorHandler } from '../../middlewares/errorHandler.js';
import { appendJwtAsCookie } from '../../middlewares/autenticar.js';
import { usersOnly } from '../../middlewares/autorizar.js';
import { userService } from '../../service/user.service.js';


export async function registerUser(req, res, next) {
    passport.authenticate('localRegister', {
        failWithError: true,
        session: false
    })(req, res, async (error) => {
        if (error) {
            next(error);
            return;
        }
        appendJwtAsCookie(req, res, async () => {
            res.status(200).json(req.user);
        });
    });
}

export async function getCurrentUser(req, res, next) {
    passport.authenticate('jwtAuth', {
        failWithError: true,
        session: false
    })(req, res, async (error) => {
        if (error) {
            next(error);
            return;
        }
        usersOnly(req, res, async () => {
            res.status(200).json(req.user);
        });
    });
}


export async function deleteOne(req, res, next) {
    try {
        const userId = req.params.userId;
        await userService.deleteOne(userId);
        res.status(204).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
}   
    

  export async function resetUserPassword(req, res, next) {
    try {
            const { username, newPassword } = req.body;   
            const updatedPassword = await userService.resetPassword(username, newPassword);
            if (!updatedPassword) {
                return res.status(404).json({ message: 'Recurso no encontrado' });
            }
            res.json(updatedPassword);
        } catch (error) {
            errorHandler(error, req, res, next); 
        }
  }
        