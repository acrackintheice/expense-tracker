# Database Setup

In order to get the database and other Hasura configurations up to date with the current structure the following migration must be executed:
TODO: Research hasura migrations

# Create an user using the information from a Google Account

In production a user is created automatically on sign up. This is not possible for the local development environment.
The current authentication service, Auth0, does have a local version for development environments.

Maybe in the future the ideal behaviour would be to pre configure some users for local development.