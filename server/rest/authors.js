const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
    const { body: {firstName, lastName, aboutAuthor} } = req;
    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name: {
        firstName,
        lastName
      },
      aboutAuthor
    });

    author.save();
    res.status(201).send(author);
  });

router
  .route('/:name')
  .get((req, res) => {
    console.log('GET /authors/:name');
    const { params: {name: authorName} } = req;

    Author.findOne({
      name: {
        firstName,
        lastName
      }
    }, (error, author) => {
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
        author.name = req.body.name;
        author.description = req.body.description;
        author.quantity = req.body.quantity;
        
        author.save();

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
