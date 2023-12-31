const { updateUser, deleteUser, getUser, getUsers } = require("../controllers/userContoller.js");
const {verifyUser,verifyAdmin} = require("../utils/verifyToken");

const express = require("express")

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

module.exports = router