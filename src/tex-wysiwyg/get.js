const https = require('https');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GetCode(slug) {
  // Set up the request
  let wait = true;
  let get_req = "";
  https.get(
    'https://vs259jn8d5.execute-api.us-east-2.amazonaws.com/latest/posts/' + slug, 
    function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        get_req= chunk;
        console.log('Response: ' + chunk);
        wait = false;
      });

  });
  while( wait ) {
    await sleep(200);
  }
  // get the data
  console.log('----------------------------------------------')
  return get_req;
}

