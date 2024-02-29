const { Router } = require("express");
const storeRouter = require("./storeRouter");
const router = Router();

router.use("/store", storeRouter);

module.exports = router;