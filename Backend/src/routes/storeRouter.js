const { Router } = require("express");
 const {
  getAllUsers,
} = require("../controllers/getAllUsers.js");
const{createUser} =require("../controllers/createUser.js")
const{deleteUser} =require("../controllers/deleteUser.js")
const {updateUser}= require("../controllers/updateUser.js")

const userRouter = Router();
userRouter.post("/", createUser );
userRouter.get("/", getAllUsers );
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser)


module.exports = userRouter;