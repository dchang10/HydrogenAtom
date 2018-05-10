import React, { Component } from 'react';
import Butter from 'buttercms'
import { Helmet } from "react-helmet";
import Banner from '../Banner.js';
import Footer from '../Footer.js';

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
  componentDidMount(){
    var head = document.getElementsByTagName("body")[0], script;
    script = document.createElement("script");
    script.type = "text/x-mathjax-config";
    script[(window.opera ? "innerHTML" : "text")] =
      "MathJax.Hub.Config({\n" +
      "  tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']] }\n" +
      "});";
    head.appendChild(script);
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML";
    head.appendChild(script);

    // script = document.createElement("script");
    // script.type = "text/javascript";
    // script[(window.opera ? "innerHTML" : "text")] =
    //   'MathJax.Hub.Queue(["Typeset",MathJax.Hub]);\n' +
    //   'MathJax.Hub.Queue(["Typeset",MathJax.Hub]);';
    // head.appendChild(script);
    //window.MathJax.Hub.Queue(["Typeset",MathJax.Hub])
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