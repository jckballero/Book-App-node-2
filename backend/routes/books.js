const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Book = require('../models/Book');

router.get('/', async(req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/', async(req, res) => {
    const { title, author, isbn } = req.body; //extrayendo los datos desde postman, y guardando en constantes
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({ title, author, isbn, imagePath }) //guardado del nuevo libro
    await newBook.save();
    res.json({ mensaje: 'Libro guardado' })
})

router.delete('/:id', async(req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + book.imagePath))
    res.json({ mensaje: 'Libro Eliminado' });
});

module.exports = router;