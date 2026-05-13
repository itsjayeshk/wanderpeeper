const express = require("express");
const router = express.Router();

const passport = require("passport");

const wrapAsync =
    require("../utils/wrapAsync.js");
const userController = require("../controllers/users.js");

// ================= SIGNUP FORM =================
router.get("/signup", userController.renderSignupForm);

// ================= SIGNUP LOGIC =================
router.post(
    "/signup",

    wrapAsync(userController.signup)
);

// ================= LOGIN FORM =================
router.get("/login", userController.renderLoginForm);

// ================= LOGIN LOGIC =================
router.post(
    "/login",

    passport.authenticate(
        "local",
        {
            failureRedirect:
                "/users/login",

            failureFlash: true,
        }
    ),

    userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
