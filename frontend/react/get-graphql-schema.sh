rm "$(pwd)"/schema.json && apollo schema:download --endpoint http://hasura.acrackintheice.com/v1/graphql --header 'X-Hasura-Admin-Secret: mypassword'
