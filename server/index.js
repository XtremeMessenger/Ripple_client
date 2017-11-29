const express = require('express');
const path = require('path')

const port = 4000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
app.listen(port, function(){
    console.log('Ripple_client listening to port ', port)
})

