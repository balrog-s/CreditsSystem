import db from '../../db';
import hash from 'password-hash';

const getUser = userId =>
    db('users')
        .select('*')
        .where({id: userId});

const getUsers = () =>
    db('users')
        .select('*');

const createUser = userProps =>
    db('users')
        .insert({
            first_name: userProps.first_name,
            last_name: userProps.last_name,
            username: userProps.username,
            password: hash.generate(userProps.password)
        })
        .returning('*');

const deleteUser = userId =>
    db('users')
        .del()
        .where({id: userId});

const updateUser = (userId, userProps) =>
    db('users')
        .update({
            first_name: userProps.first_name,
            last_name: userProps.last_name,
            username: userProps.username,
            password: hash.generate(userProps.password)
        })
        .where({id: userId})
        .returning('*');

const getTransactions = userId =>
    db('transaction_history')
        .select(['id', 'resource', 'operation', 'amount', 'created_at', 'updated_at'])
        .where({user_id: userId})
        .then(transactions => {
            return {
                user_id: userId,
                transaction_history: transactions
            }
        });

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    getTransactions
};
