
exports.up = function(knex, Promise) {
    return knex.raw(`
CREATE OR REPLACE FUNCTION increment_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN NEW.updated_at = now();
    RETURN NEW; END;
$$ language 'plpgsql'`)
    .then(() => knex.raw(`
CREATE TRIGGER increment_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE increment_updated_at_column();`)
    ).then(() => knex.raw(`
CREATE TRIGGER increment_transaction_history_updated_at BEFORE UPDATE ON transaction_history FOR EACH ROW EXECUTE PROCEDURE increment_updated_at_column();`)
    );
};

exports.down = function(knex, Promise) {
    return knex.raw(`
DROP TRIGGER IF EXISTS increment_users_updated_at ON users;
DROP TRIGGER IF EXISTS increment_transaction_history_updated_at ON transaction_history;
DROP FUNCTION increment_updated_at_column();
    `);
};
