import express from "express";
import __dirname from "./utils.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewRouter from "./routes/views.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cartModel from "./dao/models/cart.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

try {
  await mongoose.connect(
    "mongodb+srv://maribelsoledadalarcon:JePcVZ4BBPLRixXn@cluster0.uljtdd8.mongodb.net/?retryWrites=true&w=majority"
  );

  const product = await cartModel.find();
  // console.log(JSON.stringify(product, null, "\t"));
} catch (error) {
  console.log(error);
}

app.listen(8080, () => console.log("Listening on port 8080"));
