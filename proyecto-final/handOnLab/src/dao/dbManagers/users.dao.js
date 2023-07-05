import userModel from "../models/user.model.js";

export default class UsersDao {
  create(user) {
    return userModel.create(user);
  }

  findByEmail(email) {
    return userModel.findOne({ email }).lean();
  }

  findById(id) {
    return userModel.findById(id).lean();
  }

  updateOne(email, user) {
    return userModel.updateOne({ email }, user).lean();
  }
}
