require("dotenv").config()
const { PORT = 3000, CONNECTION_URL } = process.env;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const JournalSchema = require('./models/journal.js');
const bodyParser = require('body-parser');
// import postRoutes from './routes/post.js'


const app = express()

// app.use('/posts',postRoutes)

//DATABASE CONECTION
// const { CONNECTION_URL } = process.env

// const PORT =  3000
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  // .catch((error) => console.log(`${error} did not connect`));

  mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));
//MODEL 



//middleware
app.use(cors()) //prevents cross origin resource sharing error, allows access to the server from all the origin, react frontend
app.use(morgan("dev")) // loggs details of all server hits to terminal
app.use(express.json()) // parse json bodies from request
app.use(express.urlencoded({extended:false})); // URL encoded


//ROUTES

app.get("/", (req, res) => {

  res.send("HELLO WORLD")
})

//index route
app.get("/journal", async (req, res) => {


  try {
      res.status(200).json(await JournalSchema.find({}))
  } catch (error) {
      res.status(400).json(error)
  }

})
//create route
app.post("/journal", async (req, res) => {
  try {

      res.status(200).json(await JournalSchema.create(req.body))
  } catch (error) {
      res.status(400).json(error)

  }
})

//delete route
app.delete("/journal/:id", async (req, res) => {
  try {
    // send deleted record
    res.json(await JournalSchema.findByIdAndDelete(req.params.id))
  } catch (error) {
    //send error
    res.status(400).json(error)
  }
})

//update route
app.put("/journal/:id", async (req, res) => {
  try {
    // send updated person
    res.json(
      await JournalSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
    )
  } catch (error) {
    //send error
    res.status(400).json(error)
  }
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));