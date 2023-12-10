const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes.js')
const productRoutes = require('./routes/products.routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())

app.use(productRoutes);

app.use('/api',authRoutes);

app.listen(4000)
console.log('Server on port', 4000)