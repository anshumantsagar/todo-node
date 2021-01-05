const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Todo = require('../models/todo');

router.get('/', (req, res, next) => {
    Todo
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(er => {
            console.log(er);
            res.status(500).json({
                error: er
            })
        });
    // res.status(200).json({
    //     message: 'handeling get request to /todo'
    // });
});

router.post('/', (req, res, next) => {
    const task = new Todo({
        _id: new mongoose.Types.ObjectId(),
        task: req.body.task
    });
    task
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'handeling post request to /todo',
                createdTask: result
            });
        })
        .catch(er => {
            console.log(er);
            res.status(500).json({
                error: er
            })
        });
});

router.get('/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    Todo.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    message: 'No valid enrty found for provided id'
                })
            }
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
    // if (id === '123') {
    //     res.status(200).json({
    //         message: 'You discovered',
    //         id: id
    //     });
    // } else {
    //     res.status(200).json({
    //         message: 'you passed an id'
    //     });
    // }
});

router.patch('/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Todo.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(er => {
            console.log(er);
            res.status(500).json({
                error: err
            })
        });
    // if (id === '123') {
    //     res.status(200).json({
    //         message: 'You updated task with id below',
    //         id: id
    //     });
    // } else {
    //     res.status(200).json({
    //         message: 'you patched a task'
    //     });
    // }
});

router.delete('/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    Todo.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(er => {
            console.log(er);
            res.status(500).json({
                error: er
            });
        });
    // const id = req.params.todoId;
    // if (id === '123') {
    //     res.status(200).json({
    //         message: 'You deleted task with id below',
    //         id: id
    //     });
    // } else {
    //     res.status(200).json({
    //         message: 'you deleted a task'
    //     });
    // }
});

module.exports = router;