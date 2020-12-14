const express = require('express');
const bodyparser = require('body-parser');
const objectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const { Db, ObjectId } = require('mongodb');

const app = express();

const uri = "mongodb+srv://admin:xgeeC8204fEiOxSx@cluster0.wyzgd.mongodb.net/crud?retryWrites=true&w=majority";

let db = null;

app.use(bodyparser.urlencoded({ extended: true }))

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db('crud');
   
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    })
})

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
        res.render('index.ejs')
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if(err)
            return console.log(err)
        res.render('show.ejs', { data: results })
    })
})

app.post('/show', (req, res) => {

    db.collection('data').insertOne(req.body, (err, result) => { // troquei pra insertOne pq o save tá ~deprecated~
        if(err) 
            return console.log(err)
        console.log("Salvo no bd")
        res.redirect('/show')
    })
});

app.route('/edit/:id')
    .get((req, res) => {
        var id = req.params.id
        db.collection('data').find(ObjectId(id)).toArray((err, result) => {
            if(err)
                return res.send(err)
            res.render('edit.ejs', { data: result })
        })
    })
    .post((req, res) => {
        var id = req.params.id
        var name = req.body.name
        var surname = req.body.surname

        db.collection('data').updateOne({ _id: ObjectId(id) }, {
            $set: {
                name: name,
                surname: surname
            }
        }, (err, result) => {
            if(err)
                res.send(err)
            res.redirect('/show')
            console.log('Atualizado no banco de dados')
        })
    })

app.route('/delete/:id')
    .get((req, res) => {
    var id = req.params.id
    
    db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/show')
    })
})
