const express = require('express');
const router = express.Router();
const {getAllBooks, createBook, updateBook, deleteBook, getSingleBook} = require('../controllers/bookController');
const protect = require('../middleware/authMiddleware');

router.get('/getbooks', getAllBooks);
router.get('/getbook/:id', getSingleBook);
router.post('/create', createBook);
router.patch('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;