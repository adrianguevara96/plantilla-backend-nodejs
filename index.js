const express = require('express');
const routerApi = require('./routes');

//Middleware
const { logError, errorHandler, boomErrorHandler, sequelizeErrorHandler } = require('./middlewares/error.handler');

//Cors
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//middleware JSON
app.use(express.json());

//cors - all domains
app.use(cors());

//cors - uniques domains
// var whitelist = ['http://www.localhost:8080', 'https://myapp.com'];
// var corsOptions = {
//   origin : (origin, callback) => {
//     if(whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     }else{
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }
//app.use(cors(corsOptions));

//Routers
routerApi(app);

//Middleware
app.use(logError);
//sequelizeErrorHandler
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello, my server in express');
})

app.listen(port, () => {
  console.log("Port: " + port);
})

// app.listen(3000);