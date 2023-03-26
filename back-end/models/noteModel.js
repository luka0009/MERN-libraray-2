const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    title: {
      type: String,
      default: "Notes",
    },
    text: {
      type: String,
      required: false,
    },
    // untouched: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  {
    timestamps: true,
  }
);

noteSchema.plugin(autoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 782,
})
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
