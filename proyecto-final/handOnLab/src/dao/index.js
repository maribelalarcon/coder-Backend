import config from "../config/config.js";

import mongoCartsDao from "./dbManagers/carts.dao.js";
import mongoProductsDao from "./dbManagers/products.dao.js";
import mongoUsersDao from "./dbManagers/users.dao.js";
import fileCartsDao from "./fileManagers/carts.dao.js";
import fileProductsDao from "./fileManagers/products.dao.js";
import fileUsersDao from "./fileManagers/users.dao.js";

export const PRODUCTSDAO =
  config.persistece === "FILE" ? new fileProductsDao() : new mongoProductsDao();

export const CARTSDAO =
  config.persistece === "FILE" ? new fileCartsDao() : new mongoCartsDao();

export const USERSDAO =
  config.persistece === "FILE" ? new fileUsersDao() : new mongoUsersDao();
