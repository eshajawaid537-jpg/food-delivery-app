const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// 1. Get all food items
router.get('/', async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Add a new food item
router.post('/add', async (req, res) => {
  try {
    const newItem = new FoodItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Update a food item by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Delete a food item by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Food item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;