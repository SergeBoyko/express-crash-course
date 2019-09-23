const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logger');
const router = require('./routes/api/members');



// Init middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Members API routes
app.use('/api/members', router);


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//app.get('/', (req, res) => {
// res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));