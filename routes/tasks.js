var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://pdl5p:Password1@ds057816.mlab.com:57816/mean", ['tasks']);

router.get('/tasks', (req, resp, next) => {

    db.tasks.find(function (err, tasks) {
        if (err) {
            resp.send(err);
        } else {
            resp.json(tasks);
        }
    })
});

router.get('/task/:id', (req, resp, next) => {

    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            resp.send(err);
        } else {
            resp.json(task);
        }
    })
});

router.post("/task", function (req, resp, next) {

    var task = req.body;

    console.log(task);

    if (!task.title || !(task.isDone + '')) {

        resp.status(400);
        resp.json({ "error": "bad data" });
    } else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                resp.send(err);
            } else {
                resp.json(task);
            }
        })
    }

});

router.delete('/task/:id', (req, resp, next) => {

    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            resp.send(err);
        } else {
            resp.json(task);
        }
    })
});

router.put('/task/:id', (req, resp, next) => {

    var task = req.body;
    var up = {};

    if (task.isDone) {
        up.isDone = task.isDone;
    }

    if (task.title) {
        up.title = task.title;
    }

    if (!up) {
        resp.status(400);
        resp.json({ "error": "bad data" });

    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, up, {}, function (err, task) {
            if (err) {
                resp.send(err);
            } else {
                resp.json(task);
            }
        })

    }

});

module.exports = router;