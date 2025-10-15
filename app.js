const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const methodOverride = require('method-override');
const { testConnection } = require('./src/models/database');
const { setUserLocals } = require('./src/controllers/middleware/auth');
const loginRoutes = require('./view/routes/login');
const dashboardRoutes = require('./src/routes/dashboard');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

app.get('/',(req,res)=>{
        if (req.session && req.session.user){
            res.redirect('/dashboard')
        }
        else {
            res.redirect('/login')
        }
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})