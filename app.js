const express = require('express');
const app = express();
const db = require('./koneksi')
const path = require('path')
const port = 3000;

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/',(req,res)=>{
        res.render('index',{title :'home page'})

})
db.authenticate()
  .then(() => console.log('Dbnya connect'))
  .catch(err => console.error('ga konek konek', err));

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
