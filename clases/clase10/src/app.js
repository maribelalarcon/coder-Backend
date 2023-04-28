import express from "express";
import viewsRouter from "./routes/web/views.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productRouter from "./routes/api/product.router.js";
import cartRouter from "./routes/api/cart.router.js";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use("/", viewsRouter);

const server = app.listen(8080, () => console.log("Server running"));
const io = new Server(server);
app.set("io", io);
