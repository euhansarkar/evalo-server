const express = require(`express`);
const app = express();
const morgan = require(`morgan`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`);
dotenv.config();

const Auth = require(`./middlewires/auth`);

const signupRoutes = require(`./routes/signup.js`);
const signinRoutes = require(`./routes/signin.js`);
const uploadRoutes = require(`./routes/upload.js`);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

// app middlewires
app.use(cors());
app.use(morgan(`dev`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`/api/videos`, express.static(`media/uploads/`));

// routes
app.use(`/api/signup`, signupRoutes);
app.use(`/api/signin`, signinRoutes);
app.use(`/api/upload`, uploadRoutes);

app.use(`/`, (req, res) => {
  res.send(`hello world`);
});

module.exports = app;
