const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
    "mongodb://gweek:gweek1234@ds223685.mlab.com:23685/gweek",
    {
        useNewUrlParser: true
    }
);

app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    return next();
});
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Server started on port 3000');
});