var express = require('express');
var app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todoRoutes = require('./api/routes/todo');

mongoose.connect(
    `mongodb+srv://anshumantls:anshumantls@cluster0.qnhiq.mongodb.net/Cluster0?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

//routes which handels requests
app.use('/todo', todoRoutes);
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

{
    // app.use((req, res, next) => {
    //     res.status(200).json({
    //         message: 'It works'
    //     });
    // });
}

module.exports = app;




























//set up template engine
// app.set('view engine', 'ejs');


// //static files
// app.use(express.static('./public'));

// //listen to port
// app.listen(3000);
// console.log('You are listining to port 3000');

