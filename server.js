let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./db/database');


// Conectar mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

// Configurando express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Api root
const productosRoute = require('./routes/productos.route')
app.use('/endpoint', productosRoute)

// Creación de puerto
const port = process.env.PORT || 8080;

// Conección de puerto port
const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})

// Error 404 y manejador de evento
app.use((req, res, next) => {
    next(createError(404));
});

// Index 
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

// Static build location
app.use(express.static(path.join(__dirname, 'dist')));