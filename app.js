const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./api/const/const')

//swagger config
const swaggerUi = require('swagger-ui-express');
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDocs));

const healthRoutes = require('./api/routes/health')
const userRoutes = require('./api/routes/user')
const logRoutes = require('./api/routes/logs')
const contactoRoutes = require('./api/routes/contacto')

const db = require('./api/connections/connections').mongoURI;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use((req, res, next) => {
  res.header(config.CORS_ORIGIN, "*");
  res.header(config.CORS_HEADERS, config.TYPES)
  if (req.method === 'OPTIONS') {
    res.header(config.CORS_METHODS, config.METHODS)
    return res.status(200).json({});
  }
  next();
})

app.use('/', healthRoutes)
app.use('/user', userRoutes)
app.use('/contacto', contactoRoutes);
app.use('/log', logRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;