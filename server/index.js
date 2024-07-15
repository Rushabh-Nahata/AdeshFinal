import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import paymentRoute from "./routes/paymentRoute.js";
//Handling Uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Shutting down the server due to the uncaught exception ! ");
  process.exit(1);
});
dotenv.config({ path: "./config/config.env" });

//MIDDLEWARES
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
      allowedHeaders: ['Authorization', 'Content-Type'],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(fileUpload());

/*ROUTES*/
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

//ERROR MIDDLEWARE
app.use(errorMiddleware);

//SERVER CONNECTION
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    app.listen(PORT, () => {
      console.log("=================================");
      console.log(`App running on port : ${PORT}`);
      console.log("=================================");
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
