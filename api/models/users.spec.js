import chai from 'chai';
import users from './users';
import mockKnex from 'mock-knex';
import db from '../../db';
const should = chai.should();

describe('Users: ', () => {
    const tracker = mockKnex.getTracker();
    before(() => {
        mockKnex.mock(db)
    });
    after(() => {
        mockKnex.unmock(db);
    });
    describe('getUsers', () => {
        before(() => {
            tracker.install();
        });
        after(() => {
            tracker.uninstall();
        });
        it('should be defined as a function', () => {
            users.getUsers.should.be.a('function');
        });
        it('should generate the appropriate query', () => {
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.method.should.equal('select');
                        query.bindings.should.deep.equal([]);
                        query.sql.should.contain('users');
                        query.response([]);
                    }
                ][step - 1]();
            });
            return users.getUsers();
        });
    });
    describe('getUser', () => {
        before(() => {
            tracker.install();
        });
        after(() => {
            tracker.uninstall();
        });
        it('should be defined as a function', () => {
            users.getUser.should.be.a('function');
        });
        it('should generate the appropriate query', () => {
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.method.should.equal('select');
                        query.bindings.should.deep.equal(['userId']);
                        query.sql.should.contain('users');
                        query.response([{id: 'userId'}]);
                    }
                ][step - 1]();
            });
            return users.getUser('userId');
        });
    });
    describe('deleteUser', () => {
        before(() => {
            tracker.install();
        });
        after(() => {
            tracker.uninstall();
        });
        it('should be defined as a function', () => {
            users.deleteUser.should.be.a('function');
        });
        it('should generate the appropriate query', () => {
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.method.should.equal('del');
                        query.bindings.should.contain('userId');
                        query.sql.should.contain('users');
                        query.response(1);
                    }
                ][step - 1]();
            });
            return users.deleteUser('userId');
        });
    });
    describe('createUser', () => {
        before(() => {
            tracker.install();
        });
        after(() => {
            tracker.uninstall();
        });
        it('should be defined as a function', () => {
            users.createUser.should.be.a('function');
        });
        it('should generate the appropriate query', () => {
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.method.should.equal('insert');
                        ['Unit', 'Test', 'unittest'].forEach(b => query.bindings.should.contain(b));
                        query.sql.should.contain('users');
                        query.response([{id: 'userId'}]);
                    }
                ][step - 1]();
            });
            return users.createUser({first_name: 'Unit', last_name: 'Test', username: 'unittest', password: 'pass'});
        });
    });
    describe('updateUser', () => {
        before(() => {
            tracker.install();
        });
        after(() => {
            tracker.uninstall();
        });
        it('should be defined as a function', () => {
            users.updateUser.should.be.a('function');
        });
        it('should generate the appropriate query', () => {
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.method.should.equal('update');
                        ['Unit', 'Test', 'unittest', 'userId'].forEach(b => query.bindings.should.contain(b));
                        query.sql.should.contain('users');
                        query.response([{id: 'userId'}]);
                    }
                ][step - 1]();
            });
            return users.updateUser('userId', {first_name: 'Unit', last_name: 'Test', username: 'unittest', password: 'pass'});
        });
    });
    describe('getTransactions', () => {
        before(() => {
            tracker.install();
        });
        after(() => {
            tracker.uninstall();
        });
        it('should be defined as a function', () => {
            users.updateUser.should.be.a('function');
        });
        it('should generate the appropriate query', () => {
            const transactions = [{id: 'transaction1', resource: 'credits', amount: 10, operation: 'remove'}];
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.method.should.equal('select');
                        query.bindings.should.contain('userId');
                        query.sql.should.contain('transaction_history');
                        query.response(transactions);
                    }
                ][step - 1]();
            });
            return users.getTransactions('userId')
            .then(result => {
                result.user_id.should.equal('userId');
                result.transaction_history.should.deep.equal(transactions);
            });
        });
    });
});
