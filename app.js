const express = require('express');
const app = express();
const path = require('path')

const { user, sequelize } = require('./models');

const port = 3000;


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));


app.get('/', async (req,res)=>{
    try{
        const users = await user.findAll();
        res.render('index',{users});
        console.log(users);
    } catch(err){
        res.status(500).send(err.message);
    }
})

app.post('/create', async(req,res)=>{
    try{
     const { username, nama, password,tanggalLahir, email, domisili, gender, photo_profile, role } = req.body;

          await user.create({
            username,
            password,
            nama,
            tanggalLahir,
            email,
            domisili,
            gender,
            photo_profile,
            role,
        });

        res.redirect('/'); 

    } catch(err){
        res.status(500).send(err.message);
    }
})

sequelize.authenticate()
.then(() => console.log('Dbnya connect'))
.catch(err => console.error('ga konek konek', err));

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
