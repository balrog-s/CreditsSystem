import express from 'express';
import users from './models/users';
import credits from './models/credits';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
     res.send('Welcome to my Platform: Version 1.0.0');
});

app.get('/users', function (req, res) {
    return users.getUsers()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.send(err);
        });
});

app.post('/users', function (req, res) {
    return users.createUser(req.body)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.send(err);
        });
});

app.put('/users/:user_id', function (req, res) {
    return users.updateUser(req.params.user_id, req.body)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.send(err);
        });
});

app.get('/users/:user_id', function (req, res) {
    return users.getUser(req.params.user_id)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.send(err);
        });
});

app.post('/credits', function (req, res) {
    return credits.addCredits(req.body.user_id, req.body.credit_amount)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.send(err);
        });
});

app.delete('/credits', function (req, res) {
    return credits.deleteCredits(req.body.user_id, req.body.credit_amount)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.send(err);
        });
});

app.get('/users/:user_id/transactions', function (req, res) {
    return users.getTransactions(req.params.user_id)
        .then(transactions => {
            res.send(transactions);
        })
        .catch(err => {
            res.send(err);
        });
});

app.listen(3000, () => {
     console.log('LISTENING ON 3000');
});
