
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('transaction_history', function (t) {
        t.specificType('id', 'UUID PRIMARY KEY DEFAULT uuid_generate_v1mc()');
        t.enum('resource', ['users', 'credits']);
        t.enum('operation', ['add', 'remove', 'retrieve']);
        t.integer('amount');
        t.uuid('user_id');
        t.timestamps(null, true);
        t.foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('NO ACTION;')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('transaction_history');
};
