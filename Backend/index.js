const { app } = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { SERVER_PORT } = process.env;

conn
  .sync({ alter: true })
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  })
  .catch((error) => console.error(error));
