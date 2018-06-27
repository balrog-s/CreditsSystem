import chai from 'chai';
import credits from './credits';
import mockKnex from 'mock-knex';
import db from '../../db';
const should = chai.should();

describe('Credits: ', () => {
    const tracker = mockKnex.getTracker();
    before(() => {
        mockKnex.mock(db)
    });
    after(() => {
        mockKnex.unmock(db);
    });
    describe('addCredits', () => {
        before(() => {
            tracker.install();
        });
        after(() => {
            tracker.uninstall();
        });
        it('should be defined as a function', () => {
            credits.addCredits.should.be.a('function');
        });
        it('should generate the appropriate query', () => {
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.sql.should.equal('BEGIN;');
                        query.response(1);
                    },
                    () => {
                        query.method.should.equal('insert');
                        [10, 'userId', 'credits', 'add'].forEach(binding => query.bindings.should.include(binding));
                        query.sql.should.contain('transaction_history');
                        query.response([{}]);
                    },
                    () => {
                        query.method.should.equal('first');
                        query.sql.should.contain('users');
                        query.response({credits: 0});
                    },
                    () => {
                        query.method.should.equal('update');
                        query.sql.should.contain('users');
                        query.bindings.should.contain(10);
                        query.response([{credits: 10, id: 'userId'}]);
                    },
                    () => {
                        query.sql.should.equal('COMMIT;');
                        query.response();
                    },
                    () => {} //for some reason knex does a query on information schema...
                ][step - 1]();
            });
            return credits.addCredits('userId', 10)
        });
    });
    describe('deleteCredits', () => {
        before(() => {
            tracker.install();
        });
        after(() => {
            tracker.uninstall();
        });
        it('should be defined as a function', () => {
           credits.deleteCredits.should.be.a('function');
        });
        it('should generate the appropriate query', () => {
            tracker.on('query', (query, step) => {
                [
                    () => {
                        query.sql.should.equal('BEGIN;');
                        query.response(1);
                    },
                    () => {
                        query.method.should.equal('insert');
                        [10, 'userId', 'credits', 'remove'].forEach(binding => query.bindings.should.include(binding));
                        query.sql.should.contain('transaction_history');
                        query.response([{}]);
                    },
                    () => {
                        query.method.should.equal('first');
                        query.sql.should.contain('users');
                        query.response({credits: 10});
                    },
                    () => {
                        query.method.should.equal('update');
                        query.sql.should.contain('users');
                        query.bindings.should.contain(0);
                        query.response([{credits: 0, id: 'userId'}]);
                    },
                    () => {
                        query.sql.should.equal('COMMIT;');
                        query.response(1);
                    }
                ][step - 1]();
            });
            return credits.deleteCredits('userId', 10)
        });
    });
});
