const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { Db, ObjectId } = require('mongodb');

const app = express();

const uri = "mongodb+srv://admin:xgeeC8204fEiOxSx@cluster0.wyzgd.mongodb.net/crud?retryWrites=true&w=majority";

let db = null;

app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db('crud');
   
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    })
})

// ---------------------------- PRODUTO ---------------------------- //

app.get('/product', (req, res) => {
    res.render('product/product.ejs')
})

app.post('/product', (req, res) => {
    db.collection('produto').insertOne(req.body, (err, result) => { 
        if(err) 
            return console.log(err)
        console.log("Salvo no bd")
        res.redirect('product/show')
    })
});

app.get('/product/show', (req, res) => {
    db.collection('produto').find().toArray((err, results) => {
        if(err)
            return console.log(err)
        res.render('product/show.ejs', { produto: results })
    })
})

app.route('/product/edit/:id')
    .get((req, res) => {
        var id = req.params.id
        db.collection('produto').find(ObjectId(id)).toArray((err, result) => {
            if(err)
                return res.send(err)
            res.render('product/edit.ejs', { produto: result })
        })
    })
    .post((req, res) => {
        var id = req.params.id
        var name = req.body.name
        var description = req.body.description
        var category = req.body.category
        var price = req.body.price

        db.collection('produto').updateOne({ _id: ObjectId(id) }, {
            $set: {
                name: name,
                description: description,
                category: category,
                price: price
            }
        }, (err, result) => {
            if(err)
                res.send(err)
            res.redirect('/product/show')
            console.log('Atualizado no banco de dados')
        })
    })

app.route('/product/delete/:id')
    .get((req, res) => {
    var id = req.params.id
    
    db.collection('produto').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/product/show')
    })
})

// ---------------------------- USUÁRIO ---------------------------- //

app.get('/', (req, res) => {
    res.render('user/index.ejs')
})

app.get('/show', (req, res) => {
    db.collection('usuario').find().toArray((err, results) => {
        if(err)
            return console.log(err)
        res.render('user/show.ejs', { usuario: results })
    })
})

app.post('/show', (req, res) => {
    db.collection('usuario').insertOne(req.body, (err, result) => { // troquei pra insertOne pq o save tá ~deprecated~
        if(err) 
            return console.log(err)
        console.log("Salvo no bd")
        res.redirect('/show')
    })
});

app.route('/edit/:id')
    .get((req, res) => {
        var id = req.params.id
        db.collection('usuario').find(ObjectId(id)).toArray((err, result) => {
            if(err)
                return res.send(err)
            res.render('user/edit.ejs', { usuario: result })
        })
    })
    .post((req, res) => {
        var id = req.params.id
        var name = req.body.name
        var surname = req.body.surname

        db.collection('usuario').updateOne({ _id: ObjectId(id) }, {
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
    
    db.collection('usuario').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/show')
    })
})
