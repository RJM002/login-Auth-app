const express= require('express');
const app = express();
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter=require('./Routes/AuthRouter');

const ProdutRouter=require('./Routes/ProductRouter')
require('dotenv').config();
require('./Models/db');

const PORT= process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);

app.use('/products',ProdutRouter)

app.get('/testApi',(req,res)=>{
    res.send("ROHIT")
})

app.listen(PORT, ()=>{
    console.log("Server is Running on 8080")
})