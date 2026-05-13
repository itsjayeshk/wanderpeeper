// controllers/listings.js

const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { cloudinary } = require("../utils/cloudinary.js");
const { LISTINGS_FOLDER } = require("../utils/upload.js");

const DEFAULT_IMAGE_URL =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

const defaultImage = {
    filename: "default-listing-image",
    url: DEFAULT_IMAGE_URL,
};

const getUploadedImage = (file) => {
    if (!file) {
        return { ...defaultImage };
    }

    return {
        filename: file.filename,
        url: file.path,
    };
};

const isCloudinaryListingImage = (image) =>
    Boolean(
        image?.filename &&
            image.filename.startsWith(`${LISTINGS_FOLDER}/`)
    );

const isLocalUploadUrl = (url) =>
    typeof url === "string" && url.startsWith("/uploads/");

const deleteCloudinaryImage = async (image) => {
    if (!isCloudinaryListingImage(image)) {
        return;
    }

    try {
        await cloudinary.uploader.destroy(image.filename, {
            resource_type: "image",
            invalidate: true,
        });
    } catch (err) {
        console.log(err);
    }
};

// ================= INDEX ROUTE WITH FILTERS =================
module.exports.index = async (req, res) => {

    let { location, city } = req.query;

    let filter = {};

    // FILTER BY LOCATION
    if (location && location.trim() !== "") {
        filter.location = {
            $regex: location,
            $options: "i",
        };
    }

    // FILTER BY COUNTRY
    if (city && city.trim() !== "") {
        filter.country = {
            $regex: city,
            $options: "i",
        };
    }

    const allListings = await Listing.find(filter);

    res.render("listings/index", {
        allListings,
        req,
    });
};

// ================= NEW FORM =================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// ================= CREATE LISTING =================
module.exports.createListing = async (req, res) => {

    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid listing data");
    }

    const listingData = { ...req.body.listing };

    delete listingData.image;

    const newListing = new Listing({
        ...listingData,
        image: getUploadedImage(req.file),
    });

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "Successfully created a new listing!");

    res.redirect("/listings");
};

// ================= SHOW LISTING =================
module.exports.showListing = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};

// ================= EDIT FORM =================
module.exports.renderEditForm = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/edit", { listing });
};

// ================= UPDATE LISTING =================
module.exports.updateListing = async (req, res) => {

    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid listing data");
    }

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    const oldImage = listing.image
        ? {
              filename: listing.image.filename,
              url: listing.image.url,
          }
        : null;

    const listingData = { ...req.body.listing };

    delete listingData.image;

    Object.assign(listing, listingData);

    if (req.file) {
        listing.image = getUploadedImage(req.file);
    } else if (!listing.image?.url || isLocalUploadUrl(listing.image.url)) {
        listing.image = { ...defaultImage };
    }

    await listing.save();

    if (req.file) {
        await deleteCloudinaryImage(oldImage);
    }

    req.flash("success", "Listing updated successfully!");

    res.redirect(`/listings/${id}`);
};

// ================= DELETE LISTING =================
module.exports.destroyListing = async (req, res) => {

    const { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    await deleteCloudinaryImage(deletedListing.image);

    req.flash("success", "Successfully deleted the listing!");

    res.redirect("/listings");
};