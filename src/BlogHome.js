import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Butter from 'buttercms'

const butter = Butter('cc7eb55c33094b691f4f9454c0b3e19c354c214a');

class BlogHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }



  fetchPosts(page) {
    butter.post.list({page: page, page_size: 10}).then((resp) => {
      this.setState({
        loaded: true,
        resp: resp.data

      })
      console.log(resp.data)
    });

  }

  componentWillMount() {
    
    let page = this.props.match.params.page || 1;

    
    this.fetchPosts(page);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({loaded: false});

    let page = nextProps.params.page || 1;

    this.fetchPosts(page)
  }

  render() {
    if (this.state.loaded) {
      const { next_page, previous_page } = this.state.resp.meta;

      return (
        <div>
          {this.state.resp.data.map((post) => {
            return (
              <div key={post.slug}>
                <Link to={`/post/${post.slug}`}>{post.title}</Link>
              </div>
            )
          })}

          <br />

          <div>
            {previous_page && <Link to={`/p/${previous_page}`}>Prev</Link>}

            {next_page && <Link to={`/p/${next_page}`}>Next</Link>}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}

export default BlogHome;