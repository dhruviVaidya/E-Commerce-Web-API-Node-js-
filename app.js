const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const authJwt = require('../e-shop/helper/jwt');
const errorHandler = require('../e-shop/helper/error-handler');
require('dotenv/config')

app.use(cors());
app.options('*',cors())
app.use(authJwt());
app.use(errorHandler);


const ProductsRouter = require('../e-shop/routers/products')
const categoriesRoutes = require('../e-shop/routers/categories');
const UserRoute = require('../e-shop/routers/users')
const ordersRoutes = require('../e-shop/routers/orders');
//Middleware    
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/public/upload', express.static(__dirname + '/public/upload'));
const api = process.env.API_URL
console.log(api)


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`,ProductsRouter)
app.use(`${api}/users`,UserRoute)
app.use(`${api}/orders`, ordersRoutes);



 




mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:"eshop-database"
})
.then(() => {
    console.log('DATABASE CONNECTED CORRECTLY!')
    
})
.catch((err) => {
    console.log(err)
    return
})

app.listen(3000,() => {
    console.log('server is running http://localhost:3000')
})