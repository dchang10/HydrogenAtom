const https = require('https');

export function PostCode(body) {
  // Build the post string from an object
  var post_data = JSON.stringify({      
        slug : 'test-slug-3',
        published: 'test-time-3',
        status : 'draft',
        title : 'test-title',
        body : body,
        summary : 'test-summary',
        seo_title : 'test-seo-title',
        author : 'test-author', 
        featured_image : 'test-image',
        number : '2'
      });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'vs259jn8d5.execute-api.us-east-2.amazonaws.com',
      
      path: '/latest/posts',
      method: 'POST',
      port: '443',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      },
  };

  // Set up the request
   console.log(post_data)
  var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });

  });
  // post the data
  post_req.write(post_data);
  post_req.end();
  console.log('----------------------------------------------')

}
