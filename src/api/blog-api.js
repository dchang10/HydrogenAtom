import https from 'https';

export default class blogAPI {
	static post(post, username, password){
	  // Build the post string from an object
	  let neededProps = new Set(
	  	['slug', 
	  	'published', 
	  	'status', 
	  	'title', 
	  	'body', 
	  	'summary', 
	  	'seo_title', 
	  	'author', 
	  	'featured_image', 
	  	'number']
	  );

	  let keys = new Set(Object.keys(post));

	  if(!neededProps === keys) {
	  	console.error(
	  		"The post object must have the following keys: " + neededProps)
	  	return;
	  }

	  var post_data = JSON.stringify({      
      slug : post.slug,
      published: post.published,
      status : post.status,
      title : post.title,
      body : post.body,
      summary : post.summary,
      seo_title : post.seo_title,
      author : post.author, 
      featured_image : post.featured_image,
      number : post.number
    });

    let credentials = Buffer.from(username + ":" + password).toString('base64');

	  // An object of options to indicate where to post to
	  var post_options = {
      host: 'vs259jn8d5.execute-api.us-east-2.amazonaws.com',
      
      path: '/latest/posts',
      method: 'POST',
      port: '443',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data),
          'Authorization': 'Basic ' + credentials,
      },
	  };

	  // Set up the request
	  var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });

	  });
	  // post the data
	  post_req.write(post_data);
	  post_req.end();

	}
//------------------------------------------------------------

	static sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}

	static async getPages(req) {
	  // Set up the request
	  let wait = true;
	  let get_req = {data:null};

	  var request_options = {
      host: 'vs259jn8d5.execute-api.us-east-2.amazonaws.com',
      
      path: '/latest/pages?per_page=' + req.page_size + '&page=' + req.page,
      method: 'GET',
      port: '443',
      headers: {
      		'Authorization': 'Basic RG9jaGFuZzpzY2llbnRpc3QxMg==',
      },
	  };

	  const request = https.request(
	    request_options, 
	    (res) => {
	      res.setEncoding('utf8');
	      res.on('data', function (chunk) {
	      	get_req.data = JSON.parse(chunk);
	        wait = false;
	      });
	  	}
	  );

	  request.on('error', (e) => {
	  	console.error(e);
	  })
	  request.end();
	  while( wait ) {
	    await this.sleep(200);
	  }
	  // get the data
	  return get_req;
	}
//-----------------------------------------------------------
	static async getPost(slug) {
	  // Set up the request
	  let wait = true;
	  let get_req = {};
	  https.get(
	    'https://vs259jn8d5.execute-api.us-east-2.amazonaws.com/latest/posts/' + slug, 
	    function(res) {
	      res.setEncoding('utf8');
	      res.on('data', function (chunk) {
	      	get_req = JSON.parse(chunk);
	        wait = false;
	      });

	  });
	  while( wait ) {
	    await this.sleep(500);
	  }
	  // get the data
	  return get_req;
	}
	//---------------------------------------------------------

	static deletePost(slug, username, password) {
		let credentials = Buffer.from(username + ':' + password).toString('base64');
		let delete_options = {
      host: 'vs259jn8d5.execute-api.us-east-2.amazonaws.com',
     	port: '443', 
      path: '/latest/posts/' + slug,
			method: 'DELETE',
			Authorization: 'Basic ' + credentials,
	  }; 

		let req = https.request(delete_options, (res) => {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
	  });
	  req.end();
	}
//------------------------------------------------------------

	static async authenticate(username, password) {
	  // Set up the request
	  let wait = true;
	  let get_req = {data:null};

	  let credentials = Buffer.from(username + ':' + password).toString('base64');

	  var request_options = {
      host: 'vs259jn8d5.execute-api.us-east-2.amazonaws.com',
      
      path: '/latest/Login',
      method: 'GET',
      port: '443',
      headers: {
      		'Authorization': 'Basic ' + credentials,
      },
	  };

	  let statusCode = 401;
	  const request = https.request(
	    request_options, 
	    (res) => {
	    	statusCode = res.statusCode;
	      res.setEncoding('utf8');
	      res.on('data', function (chunk) {
	      	get_req.data = JSON.parse(chunk);
	        wait = false;
	      });
	  	}
	  );

	  request.on('error', (e) => {
	  	console.error(e);
	  	wait = false;
	  })
	  request.end();
	  while( wait ) {
	    await this.sleep(200);
	  }
	  // get the data
	  return statusCode;
	}
}
