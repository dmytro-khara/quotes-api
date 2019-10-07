const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRoutes');

const port = process.env.PORT || '3333';

const app = express();

app.get('/status', (req, res) => {
    res.sendStatus(200);
});

app.use(morgan('combined', {
    skip: function(req, res) {
        return res.statusCode < 400;
    },
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', apiRouter);


app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});

module.exports = app;
