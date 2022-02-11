const express = require('express');
const productsRouter = require('./routers/products')
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/productos',productsRouter)
app.use(express.static(__dirname +'/public'))
const port = 8080;
const server = app.listen(port,()=>{
    console.log(`Listen to${port} port`);
})


