require('dotenv').config();

// Import required dependencies
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const signupRoutes = require('./routes/signupRoute');
const loginRoutes = require('./routes/loginRoute');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes=require('./routes/dashboardRoutes');

// Setup Handlebars.js engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.handlebars',
    partialsDir: [
      path.join(__dirname, 'views/partials'),
    ],
  });
// Import session libraries
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Create a session object
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

app.use(session(sess));

// Set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Add simple GET routes for demonstration
app.get("/", (req, res) => {
    res.render("homepage");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


app.use('/api/users', signupRoutes);
app.use('/api/users', loginRoutes);
app.use('/api/users', blogRoutes);
app.use('/api/users', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/dashboard', dashboardRoutes);
// Import the routes
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
