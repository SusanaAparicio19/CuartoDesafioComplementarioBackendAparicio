import { User } from '../dto/user.dto.js'
import { hashear } from '../utils/cripto.js'
import { userRepository } from '../repository/user.repository.js'
import { userModel } from '../models/User.model.js'
//import { emailService } from './email/email.service.js'

class UserService {
  constructor({ userRepository, /*emailService*/ }) {
    this.userRepository = userRepository
    /*this.emailService = emailService*/
  }

  async register(userData) {
    const user = new User({
      ...userData,
      password: hashear(userData.password)
    })
    await this.userRepository.save(user)
    //await this.emailService.send(user.email, 'bienvenida', 'gracias por registrarte!')
    const pojo = user.toPOJO()
    return pojo
  }


    

    async deleteOne(userId) {
        try {
            const deleteUser = await userRepository.deleteOne(userId);
            if (!deleteUser) {
                throw new Error('No se encontró ningún usuario con el ID proporcionado');
            }
            return await userRepository.deleteOne(userId);
        } catch (error) {
            throw new Error('Error al eliminar usuario por ID en la base de datos: ' + error.message);
        }
        
    }    



    async resetPassword (username, newPassword) {
        return await userRepository.resetPassword(username, newPassword);
        
    }

}
export const userService = new UserService({ userRepository }) /*emailService*/ 











