const express = require("express");
const router = express.Router();

const Person = require("../models/person");
//get All persons
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errror: "Internal Server Error", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //Create a new Person document using  the Mongoose  Model

    const newPerson = new Person(data);

    //Save the new Person in database
    const response = await newPerson.save();
    console.log("Data saved successfully");
    res.status(200).json(response); //it will give you the
  } catch (err) {
    console.log(err);
    res.status(500).json({ errror: "Internal Server Error", msg: err.message });
  }
});

router.get("/getPersonBywork/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "Chef" || workType == "Waiter" || workType == "Manager") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).send({ message: "Invalid workType " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errror: "Internal Server Error", msg: err.message });
  }
});


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedpersondata = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedpersondata ,{
            new: true,
            runValidators: true,
        });
        if(!response) {
            return res.status(404).send({error:'person not found'});
        }
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({errror:"Internal Server Error", msg: err.message});
    }
    })

router.delete('/:id', async (req, res) => {
   try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response) {
        return res.status(404).send({error:'person not found'});
    }
    res.status(200).json({message:"person deleted successfully"});

   } catch (error) {
     res.status(500).json({errror:"Internal Server Error", msg: err.message});
   }
})


module.exports = router;