import React, { Component,Fragment } from 'react';
import Butter from 'buttercms'
import { Helmet } from "react-helmet";
import Banner from '../Banner.js';
import Footer from '../Footer.js';
import MathJax from 'react-mathjax2';

const butter = Butter('cc7eb55c33094b691f4f9454c0b3e19c354c214a');
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

  render() {
    if (this.state.loaded) {
      const post = this.state.post;

      //----------------------------------------Parse post for math
      let body = post.body.split(/<math>|<\/math>/g);
      // clean string segments
      let newBody = [];
      for(let str of body){

        //clean tags
        let newstr = str;
        let end = newstr.match(/^\s*<\/div>([\s\S]*)/);
        let type = 0;
        if (end != null){
          newstr = end[1];
          type = 1;
        }
        let begin = str.match(/([\s\S]*)<div>\s*$/);
        if (begin != null){
          newstr = begin[1];
          type = 1;
        }

        //add strings to newbody
        newBody.push({string:newstr,type:type});
      }
      let elements = [];
      let key = 0;
      for (let segment of newBody) {
          if (segment.type) {
            elements.push(<div key={key}dangerouslySetInnerHTML={{__html:segment.string}}/>);
            key += 1;
          } else {
            elements.push(
              <MathJax.Context key={key} input={'tex'}>
                <MathJax.Node inline>{segment.string}</MathJax.Node>
              </MathJax.Context>
              );
            key += 1;
          }
      }

      return (
        <div>
          <Helmet>
            <title>{post.seo_title}</title>
            <meta name="description" content={post.meta_description} />
            <meta name="og:image" content={post.featured_image} />
          </Helmet>
          <Banner style={{backgroundSize:'100em', backgroundRepeat:'repeat', textAlign:'center',opacity:'0.9'}} image={post.featured_image}>{post.title}</Banner>
          <h1>{post.title}</h1>
          <Fragment>

          <h3>Howdy</h3>
            {elements.map((element, i)=>(element))}
          </Fragment>
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