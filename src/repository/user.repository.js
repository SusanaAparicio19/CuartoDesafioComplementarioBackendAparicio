import { userDao } from '../dao/user.dao.js'





import { User } from '../dto/user.dto.js'

export class UserRepository {
  constructor({ userDao }) {
    this.userDao = userDao
  }

  async save(user) {
    const found = await this.userDao.findOne({ _id: user._id })
    if (found) {
      await this.userDao.updateOne({ _id: user._id }, user.toPOJO())
    } else {
      await this.userDao.create(user.toPOJO())
    }
  }

  async findOne(query) {
    const dto = await this.userDao.findOne(query)
    if (!dto) throw new Error('not found')
    return new User(dto)
  }


  async deleteOne(userId) {
        return await userDao.deleteOne(userId);
          
  }

  async resetPassword (username, newPassword) {
    return await userDao.resetPassword(username, newPassword);
      
}





}

export const userRepository = new UserRepository({ userDao })










