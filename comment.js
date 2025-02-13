// create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const commentData = require('./comment_data');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    res.json(commentData);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = commentData.find(comment => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send(`Comment with id ${id} not found`);
    }
});

// Create a comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    commentData.push(comment);
    res.status(201).json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = commentData.find(comment => comment.id === id);
    if (comment) {
        const index = commentData.indexOf(comment);
        const updatedComment = { ...comment, ...req.body };
        commentData[index] = updatedComment;
        res.json(updatedComment);
    } else {
        res.status(404).send(`Comment with id ${id} not found`);
    }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = commentData.find(comment => comment.id === id);
    if (comment) {
        commentData = commentData.filter(comment => comment.id !== id);
        res.status(204).send();
    } else {
        res.status(404).send(`Comment with id ${id} not found`);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// comment_data.js
module.exports = [
    {
        id: '1',
        name: 'Alice',
        message: 'Hello World!'
    },
    {
        id: '2',
        name: 'Bob',
        message: 'Hi Alice!'
    }
];