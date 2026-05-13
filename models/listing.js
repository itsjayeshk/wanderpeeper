const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      trim: true,
      default: "default-listing-image",
    },
    url: {
      type: String,
      trim: true,
      default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ], // <-- missing comma fixed here

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  category: {
    type: String,
    enum: ["Country", "City"],
    default: "Country",
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
