import express from "express";
import Item from "../models/Item.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});


router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  const saved = await newItem.save();
  res.json(saved);
});


router.put("/:id", async (req, res) => {
  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

export default router;