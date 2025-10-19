const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const methodOverride = require('method-override');
const { testConnection } = require('./src/models/koneksi');
const { setUserLocals } = require('./src/controller/middleware/auth');
const loginRoutes = require('./src/routes/login');
const dashboardRoutes = require('./src/routes/dashboard');
const calendarRoutes = require('./src/routes/calendar');
const employeeRoutes = require('./src/routes/employee');
const userRoutes = require('./src/routes/users');
const taskRoutes = require('./src/routes/tasks');
const oauthRoutes = require('./src/routes/oauth');
const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

// Set view engine dan views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

// Layouts harus setelah view engine
app.use(expressLayouts);
app.set('layout', false); // Disable default layout atau set ke path layout yang benar

// Middleware untuk parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware untuk static files
app.use(express.static(path.join(__dirname, 'views')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 jam
}));

// Flash messages
app.use(flash());

// Method override untuk PUT/DELETE
app.use(methodOverride('_method'));

// Set user locals middleware
app.use(setUserLocals);

// Routes
app.use('/', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/calendar', calendarRoutes);
app.use('/employee', employeeRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/', oauthRoutes); // OAuth callback route

app.get('/',(req,res)=>{
        if (req.session && req.session.user){
            res.redirect('/dashboard')
        }
        else {
            res.redirect('/login')
        }
})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        console.log("error ga bisa logout" + err)
    })
    res.clearCookie('connect.sid');
    res.redirect('/login');
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})