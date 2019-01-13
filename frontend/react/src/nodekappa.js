var https = require('https');

var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=ya29.GlyPBh8e47ca3mLIj7jochl6_6XN0HqDDwbQaOmXAucmi3Q-1YCMMVLvwEgNK6_dzQcy52DCWBMBlIiNYqCw9KH_KdXap0DULs1rQaThFYhjhULbq9B1c_3AUInfXQ';

var headers = 'Authentication : Bearer ya29.GlyPBh8e47ca3mLIj7jochl6_6XN0HqDDwbQaOmXAucmi3Q-1YCMMVLvwEgNK6_dzQcy52DCWBMBlIiNYqCw9KH_KdXap0DULs1rQaThFYhjhULbq9B1c_3AUInfXQ'

var options = {
    host: 'www.googleapis.com',
    path: '/oauth2/v3/tokeninfo?access_token=ya29.GlyPBh8e47ca3mLIj7jochl6_6XN0HqDDwbQaOmXAucmi3Q-1YCMMVLvwEgNK6_dzQcy52DCWBMBlIiNYqCw9KH_KdXap0DULs1rQaThFYhjhULbq9B1c_3AUInfXQ',
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

https.request(options, callback).end();