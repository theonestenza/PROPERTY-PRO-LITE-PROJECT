import express from 'express';
import bodyParser from 'body-parser';
import userroutes from './routes/userroutes';
import propertyroutes from  './routes/propertyroutes';
import flagroutes from './routes/flagroutes';
import config from 'config';

const app = express();

app.use(express.json());
// users
app.use('/api/v1/auth', userroutes);

// property
app.use('/api/v1/property', propertyroutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));