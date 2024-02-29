const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/index.js");

const app = express();

// Json parser
app.use(express.json());
app.use(cookieParser());

// Request logs on console
app.use(morgan("dev"));

// Cors config
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
// Rutas
app.use("/", router);

// Middleware para manejar el CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://desarrollador-junior-iprocess-v2j8.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = { app };