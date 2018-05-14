import React, { Component } from 'react';
import Butter from 'buttercms'
import { Helmet } from "react-helmet";
import Banner from '../Banner.js';
import Footer from '../Footer.js';
var SystemJS = require('systemjs');
//import MathJax from 'mathjax/unpacked/MathJax.js';
//console.log(MathJax);

const butter = Butter('cc7eb55c33094b691f4f9454c0b3e19c354c214a');
    window.MathJax = {
      tex2jax: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true
      }
    };
class BlogPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }
  
  componentWillMount() {
    let slug = this.props.match.params.slug;

    butter.post.retrieve(slug).then((resp) => {
      this.setState({
        loaded: true,
        post: resp.data.data
      })
    });
}
  componentWillUpdate(){
    var head = document.getElementsByTagName("head")[0], script;
    if (document.getElementById("script")) {
    	head.removeChild(document.getElementById("script"));
    	head.removeChild(document.getElementById("script2"));
    }
    var script = document.createElement("script");
    script.id = 'script';
    script.type = "text/x-mathjax-config";
    script[(window.opera ? "innerHTML" : "text")] =
      "MathJax.Hub.Config({\n" +
      "  tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']] }\n" +
      "});";
    script.async = true;
    head.appendChild(script);

    script = document.createElement("script");
    script.id = 'script2';
    script.type = "text/javascript";
    script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
    var inlineScript = document.createTextNode("alert('Hello World!');Window.A = MathJax;console.log(MathJax);MathJax.Hub.Queue(['Typeset',MathJax.Hub]);MathJax.Hub.Queue(['Typeset',MathJax.Hub]);"+ Date.now());
    script.appendChild(inlineScript ); 
    script.async = true;
    script.onreadystatechange= function () {
      if (this.readyState === 'complete') {
        alert("Script!");
      }
   }
    script.onload = function(){
        alert("Script is ready!");
        console.log(Date.now())
    };
    //Window.A.Hub.Queue(['Typeset',MathJax.Hub])
    head.appendChild(script);


    var evt = document.createEvent('Event');  
    evt.initEvent('load', false, false);  
    window.dispatchEvent(evt);
    }

  render() {
    if (this.state.loaded) {
      const post = this.state.post;

      return (
        <div>
          <Helmet>
            <title>{post.seo_title}</title>
            <meta name="description" content={post.meta_description} />
            <meta name="og:image" content={post.featured_image} />
          </Helmet>
          <Banner style={{backgroundSize:'100em', backgroundRepeat:'repeat', textAlign:'center',opacity:'0.9'}} image={post.featured_image}>{post.title}</Banner>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: post.body}} />
          <Footer/>
        </div>
      );
    } else {
      return (
        <div>
          Loading...
          <Footer/>
        </div>
      );
    }
  }
}

export default BlogPost;