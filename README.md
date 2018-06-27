# CreditsSystem
A platform for allowing users to add, remove and retrieve the credits.

## Notes
- Node 9.0.0+ is recommended
- You can use a local instance of postgres or the dockerized version provided; however you will need to have docker-compose.
- Database connections need to be specified in the knexfile and config.env (config.env is a WIP)

## Getting Started
- Ensure the node modules are installed `npm install` should be all you need to do.
- Run `docker-compose up` to get the database running unless you already have a local instance up
- Make sure the knexfile and config.env are pointed at the correct database
- Run `npm run serve` and you should be good to go
- To run unit tests ensure your NODE_ENV is set to test and run `npm run test`

## Future Work
- Bring a testing framework for integration tests in
- Expand system for authentication and authorization
- Expand transaction history to account for purchases, and types of rewards (referral vs completed tasks)
