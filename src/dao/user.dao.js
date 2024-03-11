import { userModel } from '../models/User.model.js';
import { hashear } from '../utils/cripto.js';





class UserDao {
    async create(userDto) {
        const doc = await userModel.create(userDto)
        return doc.toPOJO()
    }

    async findOne (query) {
      const doc = await userModel.findOne(query)
      if (!doc) return null
      return doc.toPOJO()
    }

    async updateOne (query, newDocDto) {
      const doc = await userModel.findOneAndUpdate(query, { $set: newDocDto })
      if (!doc) return null
      return doc.toPOJO()
    }



    async deleteOne (userId) {
        return await userModel.findOneAndDelete({ _id: userId });
     }    
        
 

    async resetPassword (username, newPassword) {
        //! encrypt password!
        newPassword = hashear(newPassword);

        const updatedUser = await userModel.findOneAndUpdate(
            { username: username },
            { $set: { password: newPassword } },
            { new: true }
        )
        .lean();
        if (!updatedUser) {
        throw new Error("No se pudo actualizar!");
        }
        
        return updatedUser;
    }

}  

  export const userDao = new UserDao()

















