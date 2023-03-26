const Book = require("../models/bookModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  if (!books) {
    res.status(404);
    throw new Error("No books found");
  }
  res.json(books);
});

const getSingleBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  // if (book.user.toString() !== req.user.id) {
  //   res.status(404);
  //   throw new Error("User not authorized");
  // }
  res.status(200).json({ book });
});

const createBook = asyncHandler(async (req, res) => {
  const { title, type, author, image, description } = req.body;

  if (!title || !author) {
    res.status(400);
    throw new Error("Please, fill in all fields");
  }

  //   const duplicate = await Book.findOne({title});
  //   if(duplicate) {
  //     res.status(409);
  //     throw new Error("Book already exists");
  //   }

  const book = await Book.create({
    title,
    author,
    type,
    image,
    description
  });

  if (book) {
    res.status(201).json(book);
  }
});

const updateBook = asyncHandler(async (req, res) => {
  const { id, title, author, type, image, description } = req.body;
  const updatedBook = await Book.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title,
      type,
      author,
      image,
      description
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedBook);
});

const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }
  await Book.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Book was deleted succesfully" });
});

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getSingleBook
};
