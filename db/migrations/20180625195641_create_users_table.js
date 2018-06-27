
exports.up = function(knex, Promise) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
        return knex.schema.createTableIfNotExists('users', function (t) {
            t.specificType('id', 'UUID PRIMARY KEY DEFAULT uuid_generate_v1mc()');
            t.string('first_name');
            t.string('last_name');
            t.string('username').notNull().unique();
            t.string('password').notNull();
            t.integer('credits').defaultsTo(0);
            t.timestamps(null, true);
        });
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};
