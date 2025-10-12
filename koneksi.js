const express = require('express');
const mysql = require("mysql2");
const app = express();


const db = mysql.createConnection({
        user: 'root',
        host: 'localhost',
        password: '',
        database:'mudjarap',
        port: 3310
});

db.connect(err =>{
        if(err){
                console.log("ga konek");
        }else{
                console.log("selamat db nya jalan");
        }
})


