const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const emailRoutes = require('./routes/email.routes')

const authRoutes = require('./routes/auth.routes.js')
const productRoutes = require('./routes/products.routes');

const auditRoutes = require('./routes/audit.routes.js');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())

app.use('/api',productRoutes);
app.use('/api', auditRoutes);

app.use('/api',authRoutes);
app.use('/api/', emailRoutes)

app.listen(4000)
console.log('Server on port', 4000)