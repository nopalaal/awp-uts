const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const methodOverride = require('method-override');
//const { testConnection } = require('./src/models/database');
const { setUserLocals } = require('./view/middleware/auth');
const loginRoutes = require('./view/routes/login');
const dashboardRoutes = require('./view/routes/dashboard');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
        res.send("hellooooo")

})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})
