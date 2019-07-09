import express from 'express';
import bodyParser from 'body-parser';
import userroutes from './routes/userroutes';
import propertyroutes from  './routes/propertyroutes';
import flagroutes from './routes/flagroutes';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// users
app.use('/api/v1/users', userroutes);

// property
app.use('/api/v1/properties', propertyroutes);

// flag
app.use('/api/v1/flags', flagroutes);

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'welcome to property pro lite,we are happy to here from you'});
  })
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));