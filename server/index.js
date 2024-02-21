require("dotenv").config();
const express = require("express");
const sequelize = require('./db');

const cors = require('cors');
const router = require('./routes/index');
const PORT = process.env.PORT || 3000;
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);



app.use(errorHandler);



const start = async ()=> {

    try {
        await sequelize.authenticate();
        
        app.listen(PORT, ()=> {
            console.log(`Server working on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();

