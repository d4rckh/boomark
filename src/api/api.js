const express = require('express')
const router = express.Router()

const {apires} = require('./response')

const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

router.get('/bookmarks', (req, res) => {
    const result = new apires(undefined, db.get('bookmarks').value())
    res.json(result.apires)
})



router.post('/bookmarks/new', (req, res) => {
    // --------------
    // TODO: auth
    // --------------
    var error = []
    var re = 'Success'
    if (db.get('bookmarks').find({name: req.body.name}).value()) {
        error.push('A bookmark with this name already exists.')
        re = 'Errored'
    } else {
        db.get('bookmarks').push({
            name: req.body.name,
            url: req.body.url
        }).write()
    }
    const result = new apires(error, re)
    res.send(result.apires)
})

router.post('/bookmarks/delete', (req, res) => {
    // --------------
    // TODO: auth
    // --------------
    var error = []
    var re = 'Success' 
    if (db.get('bookmarks').find({name: req.body.name}).value()) {
        db.get('bookmarks')
        .remove({ name: req.body.name })
        .write()
    } else {
        error.push('There is no bookmark with this name.')
        re = 'Errored'
    }
    const result = new apires(error, re)
    res.send(result.apires)
})

module.exports = router