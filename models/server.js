const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnection = require('../db/config');


class Server{

    constructor(){

        this.app = express();

        this.paths = {
            products: '/api/products',
            categories:'/api/categories'
        }
        
        
        this.conectarDB()
        this.middlewares()
        this.routes()
        
       /*  this.corsOptions = {
            origin: 'https://parking-now.herokuapp.com',
            optionsSuccessStatus: 200 
        } */
    }
    
    async conectarDB(){
        await dbConnection()
    }
    
    middlewares(){
        
        // cors
        this.app.use( cors())
        
        // lectura y parseo del body
        this.app.use( express.json() )
        
    }

    routes(){

        this.app.use( this.paths.products, require('../routes/products') )
        this.app.use( this.paths.categories, require('../routes/categories') )
        
    }

    listen(){
        this.app.listen( process.env.PORT, () => {
            console.log( 'server on port : ' , process.env.PORT )
        })
    }

}

module.exports = Server;