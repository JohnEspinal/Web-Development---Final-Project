const express = require("express");
const morgan = require('morgan');
const app = express();
var mongoose = require("mongoose");



// connection to db
mongoose.connect("mongodb://localhost/todoLister", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log("Conectado"));


// importing routes
const indexRoutes = require('./routes/index.js');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}))

//routes
app.use('/', indexRoutes);

//starting server


app.listen(app.get('port'), ()=>{
    console.log('Sever on port '+app.get('port'));
})