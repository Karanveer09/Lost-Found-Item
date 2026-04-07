import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    module: {
      type: String,
      enum: ["campus", "hostel"],
      required: true,
    },
    hostel: String,

    title: {
      type: String,
      required: true,
    },

    description: String,

    category: {
      type: String,
      required: true,
    },

    location: String,

    date: {
      type: String,
    },

    status: {
      type: String,
      enum: ["open", "claimed"],
      default: "open",
    },

    reportedBy: String,
    claimedBy: String,

    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);