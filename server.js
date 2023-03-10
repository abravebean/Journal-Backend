import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";


const app = express()



//DATABASE CONECTION
const CONNECTION_URL = 'mongodb+srv://Kevinawesome12:Pu3YSAEkKT3nDrMx@cluster0.dm1y5fi.mongodb.net/journal?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


//MODEL 
const JournalSchema = new mongoose.Schema({
  Date: String,
  Note: String,
  Picture: String,

})
const Journal = mongoose.model("Journal", JournalSchema)

//middleware
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors())



//ROUTES

app.get("/", (req, res) => {
  res.send("HELLO WORLD")
})

//index route
app.get("/journal", async (req, res) => {
  try {
      res.status(200).json(await Journal.find({}))
  } catch (error) {
      res.status(400).json(error)
  }

})
//create route
app.post("/journal", async (req, res) => {
  try {

      res.status(200).json(await Journal.create(req.body))
  } catch (error) {
      res.status(400).json(error)

  }
})

//delete route
app.delete("/journal/:id", async (req, res) => {
  try {
    // send deleted record
    res.json(await Journal.findByIdAndDelete(req.params.id))
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
      await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    )
  } catch (error) {
    //send error
    res.status(400).json(error)
  }
})
