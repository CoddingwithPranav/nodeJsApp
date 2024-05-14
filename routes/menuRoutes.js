const express = require("express");
const router = express.Router();

const MenuItem = require("../models/menu");
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errror: "Internal Server Error", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //Create a new Menu document using  the Mongoose  Model

    const newMenu = new MenuItem(data);
    //Save the new Menu in database
    const response = await newMenu.save();
    console.log("Data saved successfully");
    res.status(200).json(response); //it will give you the response
  } catch (err) {
    console.log(err);
    res.status(500).json({ errror: "Internal Server Error", msg: err.message });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    console.log(taste == "sour");
    if (taste == "sour" || taste == "spicy" || taste == "sweet") {
      const response = await MenuItem.find({ taste: taste });
      res.status(200).json(response);
    } else {
      res.status(404).json({ errror: "Bad Request", msg: "Invalid taste" });
    }
  } catch (err) {
    res.status(500).json({ errror: "Internal Server Error", msg: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const UpdateMenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId, UpdateMenuData, {
      new: true.valueOf,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ errror: "Bad Request", msg: "Invalid menuId" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ errror: "Internal Server Error", msg: err.message });
  }
}),
  router.delete("/:id", async (req, res) => {
    try {
      const menuId = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuId);
      if (!response) {
        res.status(404).json({ errror: "Bad Request", msg: "Invalid menuId" });
        return;
      }
      res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ errror: "Internal Server Error", msg: error.message });
    }
  });
module.exports = router;
