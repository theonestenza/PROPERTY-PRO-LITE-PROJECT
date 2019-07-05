import express from 'express';
import bodyParser from 'body-parser';
import User from './controllers/usercontrollers';
import Property from  './controllers/propertycontrollers';
import Flag from './controllers/flagcontrollers';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// users
app.post('/api/v1/users', User.create);
app.get('/api/v1/users', User.getAll);
app.get('/api/v1/users/:id', User.getOne);
app.put('/api/v1/users/:id', User.update);
app.delete('/api/v1/users/:id',User.delete);
// property
app.post('/api/v1/properties', Property.create);
app.get('/api/v1/properties', Property.getAll);
app.get('/api/v1/properties/:id', Property.getOne);
app.put('/api/v1/properties/:id', Property.update);
app.delete('/api/v1/properties/:id',Property.delete);
// flag
app.post('/api/v1/flags', Flag.create);
app.get('/api/v1/flags', Flag.getAll);
app.get('/api/v1/flags/:id', Flag.getOne);
app.put('/api/v1/flags/:id', Flag.update);
app.delete('/api/v1/flags/:id',Flag.delete);
app.get('/', (req, res) => {
    return res.status(200).send({'message': 'welcome to property pro lite,we are happy to here from you'});
  })
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));