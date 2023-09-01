const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const notLogged = require("../middlewares/notLogged");
const userController = require("../controller/userController");

router.get("/login", notLogged, userController.login);
router.post("/login", userController.processLogin);
router.get("/logout", userController.logout);
router.get("/register", notLogged, userController.register);
router.post(
  "/register",
  upload.single("image"),
  userController.processRegister
);
router.get("/users", userController.listUsers);
router.get("/users/profile", auth, userController.userDetail);
router.put("/users/:id", userController.userEdit);

module.exports = router;
