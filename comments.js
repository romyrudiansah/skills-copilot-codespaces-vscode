// Create web server
// Start server
// Create route to serve comments
// Create route to add comments
// Create route to delete comments

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const COMMENTS_PATH = 'comments.json';

app.get('/comments', (req, res) => {
  fs.readFile(COMMENTS_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  fs.readFile(COMMENTS_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }
    let comments = JSON.parse(data);
    comments.push(comment);
    fs.writeFile(COMMENTS_PATH, JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error writing comments file');
        return;
      }
      res.send('Comment added');
    });
  });
});

app.delete('/comments/:index', (req, res) => {
  const index = req.params.index;
  fs.readFile(COMMENTS_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }
    let comments = JSON.parse(data);
    comments.splice(index, 1);
    fs.writeFile(COMMENTS_PATH, JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error writing comments file');
        return;
      }
      res.send('Comment deleted');
    });
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});