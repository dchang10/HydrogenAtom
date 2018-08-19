import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../css/blog.css';
import FeynmanDiagram from '../images/Feynmandiagram.svg';
import Banner from './Banner.js';

import blogAPI from '../../../api/blog-api.js';

class BlogCard extends Component {
    constructor(props) {
        super(props);
        this.date = this.props.published;
    }
    render() {
        let image = this.props.image;
        return (
            <div className='card' style={{ height: '32em' }}>
                <Link to={`/post/${this.props.slug}`} >
                    <div style={{
                        height: '10em',
                        width: '100%',
                        backgroundSize: image.width/2 + 'em ' + image.height/2 +'em',
                        backgroundPosition: image.horizontal + '% ' + image.vertical + '%',
                        backgroundRepeat: image.backgroundRepeat, textAlign: 'center',
                        backgroundImage: `url(${image.source})`
                    }}>
                    </div>
                    <h3 style={{ color: 'black', paddingTop: '0.5em', textAlign: 'center', height: '4em' }}>
                        {this.props.title}
                    </h3>
                    <hr />
                    <p style={{ height: '9em', color: 'grey' }}>
                        {this.props.summary}
                    </p>
                    <p style={{ textAlign: "right", color: 'black' }}>{this.date.substring(0, 15)}</p>
                </Link>
            </div>
        );
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        let page = this.props.match.params.page;

        this.state = {
            loaded: false,
            page: page < 1000000 ? (page > 0 ? page : 1) : 1000000,
            status: 200
        };
        this.page = this.state.page;

    }
    fetchPosts(page) {
        blogAPI.getPages({ page: page, page_size: 6 }).then(
            (resp) => {
                this.setState({
                    loaded: true,
                    resp: resp,
                })
            });
    }
    componentWillMount() {
        if (isNaN(this.props.match.params.page)) {
            this.props.history.replace('/p/1');
        } else {
            this.fetchPosts(this.page || 1);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loaded: false, page: this.page });
        if (isNaN(this.page)) {
            this.fetchPosts(1);
        } else {
            this.fetchPosts(this.page);
        }
    }

    render() {

        if (this.state.loaded) {
            const { next_page, previous_page } = this.state.resp.data;
            let n_page = <span style={{ padding: '2em', color: 'grey' }}>{previous_page ? <Link onClick={() => { this.page = previous_page }} to={"/p/" + previous_page} style={{ color: 'blue' }}>← Newer Posts</Link> : "← Newer Posts"}</span>;
            let p_page = <span style={{ padding: '2em', color: 'grey' }}>{next_page ? <Link onClick={() => { this.page = next_page }} to={"/p/" + next_page} style={{ color: 'blue' }}>Older Posts →</Link> : "Older Posts →"}</span>;

            return (
                <Fragment>
                    <div className="container-fluid" >
                        <Banner image={FeynmanDiagram}>Physics Blog</Banner>
                        <div className="row" style={{ zIndex: '2', height: '40em' }}>
                            <div className='col-lg-2' style={{ backgroundColor: '#eeeeee' }} />
                            <div className='col-lg-8' style={{ backgroundColor: '#eeeeee' }}>
                                <div className='row'>
                                    {this.state.resp.data.Items.map((post) => {
                                        return (<div className='col-lg-4' key={post.slug} style={{ minHeight: '30em' }}>
                                            <BlogCard title={post.title} summary={post.summary} image={post.featured_image} slug={post.slug} published={post.published} />
                                        </div>);
                                    })}
                                </div>
                            </div>
                            <div className='col-lg-2' style={{ backgroundColor: '#eeeeee' }} />
                            <div className="col-lg-12" style={{ backgroundColor: '#eeeeee', textAlign: 'center' }}>
                                {n_page}
                                {p_page}
                            </div>


                        </div>
                    </div>
                </Fragment>
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

export default Home;
