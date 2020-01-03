import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import blogAPI from '../../../api/blog-api';
import TexEditor from '../../../tex-wysiwyg/TeXEditor';

export default class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug:props.match.params.slug,
      authenticated:props.authenticated,
      username:props.username,
      password:props.password,
    };
  }
  deletePost(slug, username, password){
    return blogAPI.deletePost(slug, username, password);
  }

  render() {
    let delete_post = null;
    if(this.props.authenticated) {
      delete_post = 
        <Link
          style={{bottom:'12em', position:'fixed', padding:'1em 0em 1em 1em', }} 
          onClick={
            ()=>this.deletePost(this.props.match.params.slug, this.state.username, this.state.password)
          } 
          className="nav-link" 
          to="/"
          >
            Delete Post<span className="sr-only">(current)</span>
        </Link>

    }
    return(
      <div style={{maxWidth:'120em', margin:'auto'}}>
        <div style={{marginBottom:'2em'}}/>
        <div style={{minHeight:'35em', zIndex:'1'}}>
          <TexEditor readOnly={!this.state.authenticated} slug={this.state.slug} username={this.state.username} password={this.state.password}/>
        </div> 
        {delete_post}
      </div>
    );
  }
}
