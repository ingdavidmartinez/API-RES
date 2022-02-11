const express = require('express')
const router = express.Router();
const uploader = require('../services/upload')

const ProductManager = require('../manager/products');


const productService =new ProductManager();

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    if (isNaN(id))return res.status(400).send({error:"incorrect!, it is not a number"})
    let parseid= parseInt(id);
    productService.getByid(parseid).then(result=>res.send(result))
    
})


router.get('/',(req,res)=>{
    productService.get().then(result=>res.send(result))
})


router.post('/',uploader.single('file'),(req,res)=>{
    let product = req.body;
    let file = req.file;
    product.thumbnail = req.protocol + "://"+req.hostname+":8080/img/"+file.filename;   
    if(!file)return res.status(500).send({error:"Could not upload file"})
    productService.add(product).then(result=>res.send(result));
})

router.put('/:id',uploader.single('file'),(req,res)=>{
    let id = req.params.id;
    if (isNaN(id))return res.status(400).send({error:"incorrect!, it is not a number"})
    let parseid= parseInt(id);
    let product = req.body;
    let file = req.file;
    product.thumbnail = req.protocol + "://"+req.hostname+":8080/img/"+file.filename;   
    if(!file)return res.status(500).send({error:"Could not upload file"})
    productService.putByid(parseid,product).then(result=>res.send(result));
})

router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    if (isNaN(id))return res.status(400).send({error:"incorrect!, it is not a number"})
    let parseid= parseInt(id);
     
    productService.delateById(parseid).then(result=>res.send(result));
})


module.exports = router;