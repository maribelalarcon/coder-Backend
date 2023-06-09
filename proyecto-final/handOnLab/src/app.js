import express from "express";
import __dirname from "./utils.js";
import productRouter from "../src/routes/product.router.js";
import cartRouter from "../src/routes/cart.router.js";
import sessionsRouter from "../src/routes/sessions.router.js";
import viewRouter from "../src/routes/views.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  await mongoose.connect(
    "mongodb+srv://maribelsoledadalarcon:JePcVZ4BBPLRixXn@cluster0.uljtdd8.mongodb.net/?retryWrites=true&w=majority"
  );
} catch (error) {
  console.log(error);
}

//sesion trabajando mongo storage
app.use(
  session({
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "adminCod3r123",
    resave: true,
    saveUninitialized: true,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(8080, () => console.log("Listening on port 8080"));
