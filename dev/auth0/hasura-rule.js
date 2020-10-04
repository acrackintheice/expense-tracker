function (user, context, callback) {

    // As linhas a seguir implementam o envio de uma requisição de criação de usuário no Hasura após o login de um usuário pelo Auth0.
    // No entanto, isso não funcionará no ambiente de desenvolvimento pois o Auth0 não conseguirá fazer requisições para o Hasura rodando locamente.
    // https://hasura.io/learn/graphql/hasura/authentication/4-user-sync-rule/
    
    // const userId = user.user_id;
    // const nickname = user.nickname;
    // const email = user.email;

    // const admin_secret = "mypassword";
    // const url = "https://hasura.acrackintheice.com/v1/graphql";
    // const query = `mutation($userId: String!, $nickname: String, $email: String) {
    // insert_app_user(objects: [{google_id: $userId, name: $nickname, email: $email}], on_conflict: {constraint: app_user_google_id_key}) {
    //   returning {
    //     id
    //   }
    // }
    // }`;
    // const variables = { "userId": userId, "nickname": nickname };
    // request.post({
    //     url: url,
    //     headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
    //     body: JSON.stringify({
    //       query: query,
    //       variables: variables
    //     })
    // }, function(error, response, body){
    //      console.log(body);
    //      callback(null, user, context);
    // });

    const namespace = "https://hasura.io/jwt/claims";
    context.accessToken[namespace] =
    {
        'x-hasura-default-role': 'user',
        // do some custom logic to decide allowed roles
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-user-id': user.user_id
    };
    callback(null, user, context);
}