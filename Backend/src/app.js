const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/index.js");

const corsOptions = {
  origin: "https://desarrollador-junior-iprocess-v2j8.vercel.app/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

// Json parser
app.use(express.json());
app.use(cookieParser());

// Request logs on console
app.use(morgan("dev"));

// Cors config
app.use(cors(corsOptions));

// Rutas
app.use("/", router);

module.exports = { app };