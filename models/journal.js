const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
    date: {type:Date,
    default:  Date.now},
    note: String,
    picture: String,
    
  })

  const Journal = mongoose.model("Journal", JournalSchema)

module.exports = Journal