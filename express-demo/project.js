const winston=require('winston');
const express=require('express');
const app=express();


require('./startup/logging')
require('./startup/config')();
require('./startup/route')(app);
require('./startup/db')();
require('./startup/validation');

//app.use(logger);
//app.use(auth);
        const port=process.env.PORT||5000;
    app.listen(port,()=>winston.info(`listening on port ${port}...`));
































