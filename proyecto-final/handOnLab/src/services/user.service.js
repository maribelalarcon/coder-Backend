import { USERSDAO } from "../dao/index.js";

const create = (user) => {
  const _user = USERSDAO.create(user);
  return _user;
};

const findByEmail = (email) => {
  const user = USERSDAO.findByEmail(email);
  return user;
};

const findById = (id) => {
  const user = USERSDAO.findById(id);
  return user;
};

const updateOne = (email, user) => {
  const _user = USERSDAO.updateOne(email, user);
  return _user;
};

export { create, findByEmail, findById, updateOne };
