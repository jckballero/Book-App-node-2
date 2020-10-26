// require('dotenv').config();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//DECLARANDO EL SERVIDOR
const app = express();

//CONFIGURACIONES
app.set('port', process.env.PORT || 3000);
require('./database');

//MIDDLEWARES
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//RUTAS DEL SERVIDOR (Routes)
app.use('/api/books', require('./routes/books'));

//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public/')));

//INICIANDO EL SERVIDOR
app.listen(app.get('port'), () => {
    console.log('Servidor ejecutandose en el puerto', app.get('port'));
});

// https: //www.youtube.com/watch?v=NsiGIt9HVBM&list=PLo5lAe9kQrwq7n_REwpZdfggPCBW2ggnh&index=5