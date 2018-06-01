import React, { Component} from 'react';
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
    }).catch((resp) => {
            console.log(resp);
            switch(resp.status) {
                case 404:
                    this.setState({status:404});
                    console.log(this.props)
                    this.props.history.push('/404');
                    break;
                default :
                	break;
            }
        });
}

  render() {
    if (this.state.loaded) {
      const post = this.state.post;

      //----------------------------------------Parse post for math
      let body = post.body.split(/<math>|<\/math>/g);
      let newBody = [];
      if (body.length > 1){
        // clean string segments
        
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
      } else {
        newBody = [{string:body, type:1}]
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
                <MathJax.Node>{segment.string.replace(/&amp;/gi,'&')}</MathJax.Node>
              </MathJax.Context>
              );
            key += 1;
          }
      }
      let date = [];
      //fix date
      let months = {
        '01':'January', 
        '02':'February', 
        '03':'March',
        '04':'April',
        '05':'May',
        '06':'June',
        '07':'July',
        '08':'August',
        '09':'September',
        '10':'October',
        '11':'November',
        '12':'December'
        }
      date = post.published.split("-");
      date[2] = date[2].slice(0,2);
      date[1] = months[date[1]];

      return (
        <div stye={{minHeight:'50em'}}>
          <Helmet>
            <title>{post.seo_title}</title>
            <meta name="description" content={post.meta_description} />
            <meta name="og:image" content={post.featured_image} />
          </Helmet>
          <div className="container-fluid" style={{minHeight:'50em'}} >
            <div className="row">
              <div className="col-sm-3"/>
              <div className="col-sm-6" style={{textAlign:'center', paddingTop:'7em', paddingBottom:'3em'}}>
                <h1 className="box-title-2" style={{color:'#333333', display: 'inline'}}>{post.title}</h1>
                <p style={{textAlign:'center'}}>{'Posted on ' + date[1] + ' ' + date[2] + ', ' + date[0]}</p>
              </div>
              <div className="col-sm-3"/>
            </div>
            <Banner style={{
                backgroundSize:'100%', 
                backgroundRepeat:'repeat', 
                textAlign:'center',opacity:'0.9', 
                marginBottom:'1em',height:'12em',
                borderWidth:'0em 0em 0em 0em'
              }} image={post.featured_image}
            ></Banner>
            <div className="row">
              <div className="col-sm-3"/>
              <div className="col-sm-6" >
              <h4 style={{paddingBottom:'2em',color:'#333333',textAlign:'center'}}>{post.summary}</h4>
                {elements.map((element, i)=>(element))}
              </div>
              <div className="col-sm-3"/>
            </div>
          </div>
          <Footer/>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{minHeight:'50em', textAlign:'center'}}>
            <h1 className="box-title-2" style={{color:'#333333', display: 'inline'}}>
              Loading...
            </h1>   
          </div>
          <Footer/>
        </div>
      );
    }
  }
}

export default BlogPost;