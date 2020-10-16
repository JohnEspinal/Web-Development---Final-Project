const express = require("express");
const router = express.Router();
const path = require('path');
const Item = require('../models/item');

router.get('/', async (req, res) =>{
    const items = await Item.find();
    //res.sendFile(path.join(__dirname, '..', 'views/index.html'));

    res.render('index', {
        items
    })
})

router.post('/add', async (req, res) =>{
    const item = new Item(req.body)
    window.localStorage.setItem("item", req.body)
    await item.save(()=>{
        

    });
    
    res.redirect('/');
})

router.get('/changeStatus/:id', async (req, res) =>{
    const { id } = req.params;
    const item = await Item.findById(id);
    item.status = !item.status;
    await item.save();
    res.redirect('/');
})

router.get('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const item = await Item.findById(id);
    res.render('edit', {
        item
    });
})

router.post('/edit/:id', async (req, res) =>{
    const {id} = req.params;
    //console.log(req.params);
    await Item.update({_id:id}, req.body);
    res.redirect('/');
})


router.get('/delete/:id', async (req, res) =>{
    const { id } = req.params;
    //console.log(id);
    await Item.remove({_id: id});
    res.redirect('/');
})

module.exports = router;