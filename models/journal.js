const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
    date: {type:Date,
    default: new Date("<YYYY-mm-dd>")},
    note: String,
    picture: String,
    tags: [String],
    selectedFile:String,
  })

  const JournalSchema = mongoose.model("Journal", journalSchema)

module.exports = JournalSchema