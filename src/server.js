import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import "./daos/mongodb/connection.js";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.listen(PORT, () => {
  console.log(`Server ok en puerto ${PORT}`);
});

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
