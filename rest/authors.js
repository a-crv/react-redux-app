const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router
  .route('/')
  .get((req, res) => {
    console.log('GET /authors');
    Author.find((error, authors) => {

      if (error) {
        res.status(500).send(error);
        return;
      }

      console.log(authors);
      res.json(authors);
    });
  })
  .post((req, res) => {
    console.log('POST /authors');
    const author = new Author(req.body);

    author.save();
    res.status(201).send(author);
  });

router
  .route('/:id')
  .get((req, res) => {
    console.log('GET /authors/:id');
    const authorID = req.params.id;

    Author.findOne({ id: authorID }, (error, author) => {
      if (error) {
        res.status(500).send(error);
        return;
      }

      console.log(author);
      res.json(author);
    });
  })
  .put((req, res) => {
    console.log('PUT /authors/:id');
    const authorID = req.params.id;

    Author.findOne({ id: authorID }, (error, author) => {
      if (error) {
        res.status(500).send(error);
        return;
      }

      if (author) {
        // author.name = req.body.name;
        // author.description = req.body.description;
        // author.quantity = req.body.quantity;
        
        // author.save();

        const { name, description, quantity } = req.body;
        const updatedAuthor = {
          ...author,
          name,
          description,
          quantity
        };
        
        updatedAuthor.save();

        res.json(author);
        return;
      }

      res.status(404).json({
        message: `Item with id ${authorID} was not found.`
      });
    });
  })
  .delete((req, res) => {
    console.log('DELETE /authors/:id');
    const authorID = req.params.id;

    Item.findOne({ id: authorID }, (error, author) => {
      if (error) {
        res.status(500).send(error);
        return;
      }

      if (author) {
        author.remove((error) => {
          if (error) {
            res.status(500).send(error);
            return;
          }

          res.status(200).json({
            message: `User with id ${authorID} was removed.`
          });
        });
      } else {
        res.status(404).json({
          message: `User with id ${authorID} was not found.`
        });
      }
    });
  });

module.exports = router;
