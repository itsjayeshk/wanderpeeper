const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const {
    isLoggedIn,
    validateListing
} = require("../middleware.js");

const listingController = require("../controllers/listings.js");


// ================= CLOUDINARY + MULTER =================
const multer = require("multer");
const { storage } = require("../utils/cloudConfig");

const upload = multer({ storage });


// ================= INDEX ROUTE =================
router.get(
    "/",
    wrapAsync(listingController.index)
);


// ================= NEW ROUTE =================
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
);


// ================= CREATE ROUTE =================
router.post(
    "/",
    isLoggedIn,

    upload.single("image"),

    validateListing,

    wrapAsync(listingController.createListing)
);


// ================= SHOW ROUTE =================
router.get(
    "/:id",
    wrapAsync(listingController.showListing)
);


// ================= EDIT ROUTE =================
router.get(
    "/:id/edit",

    isLoggedIn,

    wrapAsync(listingController.renderEditForm)
);


// ================= UPDATE ROUTE =================
router.put(
    "/:id",

    isLoggedIn,

    upload.single("image"),

    validateListing,

    wrapAsync(listingController.updateListing)
);


// ================= DELETE ROUTE =================
router.delete(
    "/:id",

    isLoggedIn,

    wrapAsync(listingController.destroyListing)
);


module.exports = router;