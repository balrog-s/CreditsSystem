import db from '../../db';

const recordTransaction = trx => row =>
    db('transaction_history')
    .transacting(trx)
    .insert(row)
    .returning('*');

const getUserCredits = trx => userId =>
    db('users')
    .transacting(trx)
    .first('credits')
    .where({id: userId});

const updateUserCredits = trx => (userId, credits) =>
    db('users')
    .transacting(trx)
    .update({credits: credits})
    .where({id: userId})
    .returning('*');

const addCredits = (userId, creditAmount) => {
    return db.transaction(trx =>
        recordTransaction(trx)({
            resource: 'credits',
            operation: 'add',
            amount: creditAmount,
            user_id: userId
        })
        .then(transaction =>
            getUserCredits(trx)(userId)
                .then(user => {
                    const newCreditsBalance = user.credits + creditAmount;
                    return updateUserCredits(trx)(userId, newCreditsBalance);
                })
        )
        .catch(err => {
            trx.rollback(err);
            throw err;
        })
        .then(trx.commit)
    );
};

const deleteCredits = (userId, creditAmount) => {
    return db.transaction(trx =>
        recordTransaction(trx)({
            resource: 'credits',
            operation: 'remove',
            amount: creditAmount,
            user_id: userId
        })
        .then(transaction =>
            getUserCredits(trx)(userId)
                .then(user => {
                    const newCreditsBalance = user.credits - creditAmount;
                    return updateUserCredits(trx)(userId, newCreditsBalance);
                })
        )
        .catch(err => {
            trx.rollback(err);
            throw err;
        })
        .then(trx.commit)
    );
}

module.exports = {
    addCredits,
    deleteCredits
};
