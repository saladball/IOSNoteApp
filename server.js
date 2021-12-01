const express = require('express')
const mongoose = require('mongoose')
var app = express()
var Data = require('./noteSchema')

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", () => {
    
    console.log("connected to DB!")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})

// CREATE A NOTE
// POST request
app.post("/create", (req, res) => {

    var note = new Data ({
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")
    })

    note.save().then(() => {
        if (note.isNew == false) {
            console.log("Saved data!")
            res.send("Saved data!")
        } else {
            console.log("Failed to save data")
        }
    })
})

// http://127.0.0.1:8081/create
var server = app.listen(8081, "127.0.0.1", () => {
    console.log("Server is running!")
})

// FETCH ALL NOTES
// GET requests
app.get('/fetch', (req, res) => {
    Data.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})

// DELETE A NOTE
// POST request
app.post("/delete", (req, res) => {
    Data.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        console.log("Failed" + err)
    })

    res.send("Deleted!")
})

// UPDATE A NOTE
// POST request
app.post('/update', (req, res) => {
    Data.findByIdAndUpdate({
        _id: req.get("id")
    }, {
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")
    }, (err) => {
        console.log("Failed to update " + err)
    })
    res.send("Updated!")
})


