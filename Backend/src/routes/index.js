const { Router } = require("express");
const userRouter = require("./storeRouter");
const router = Router();

router.use("/user", userRouter);

module.exports = router;