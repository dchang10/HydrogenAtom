import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Butter from 'buttercms';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../css/blog.css';
import FeynmanDiagram from '../images/Feynmandiagram.svg';
import Banner from './Banner.js';
import Footer from './Footer.js';

const butter = Butter('cc7eb55c33094b691f4f9454c0b3e19c354c214a');


class BlogCard extends Component {
    constructor(props){
        super(props);
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
        this.date = this.props.published.split("-");
        this.date[2] = this.date[2].slice(0,2);
        this.date[1] = months[this.date[1]]

    }
    render(){
        return(
            <div className='card'>
                <Link to={`/post/${this.props.slug}`} >
                    <div style={{height:'20em',backgroundSize:'70em',backgroundPosition:'50% 50%', backgroundRepeat:'no-repeat', textAlign:'center', backgroundImage:`url(${this.props.image})`}}>
                    </div>
                    <h2 style={{paddingTop:'0.5em', textAlign:'center'}}>
                        {this.props.title}
                    </h2>
                    <hr/>
                    <h3>
                        {this.props.summary}
                    </h3>
                    <p style={{textAlign:"right"}}>{this.date[1] + ' ' + this.date[2] + ', ' + this.date[0]}</p>
                </Link>
            </div>
        );
    }
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            page: this.props.match.params.page,
            status: 200
        };
        this.page = this.props.match.params.page;
        console.log(this.page);
    }
    fetchPosts(page) {
        console.log(typeof page)
        //console.log(page.match(/[^0-9]+/))
        butter.post.list({page: page, page_size: 1}).then((resp) => {
            console.log(resp);
            this.setState({
                loaded: true,
                resp: resp.data
            })
        }).catch((resp) => {
            console.log(resp);
            switch(resp.status) {
                case 404:
                    this.setState({status:404});
                    console.log(this.props)
                    this.props.history.replace('/404');
                    break;
            }
        });

        

    }
    componentWillMount() {
        //console.log('start: ' + this.props.match.params.page);
        if(isNaN(this.props.match.params.page)){
            this.props.history.replace('/p/1');
        } else {
        let page = this.props.match.params.page || 1;    
            this.fetchPosts(page);
        }
            }

    componentWillReceiveProps(nextProps) {
        this.setState({loaded: false, page:this.page});
        if(isNaN(this.page)){
            this.fetchPosts(1);
        } else {
            this.fetchPosts(this.page);
        }
    }

    render() {

        if (this.state.loaded) {
            const { next_page, previous_page } = this.state.resp.meta;
            let n_page = <span style={{padding:'2em', color:'grey'}}>{previous_page?<Link onClick={()=>{this.page=previous_page}} to={"/p/" + previous_page} style={{color:'blue'}}>← Newer Posts</Link>:"← Newer Posts"}</span>;
            let p_page = <span style={{padding:'2em', color:'grey'}}>{next_page?<Link onClick={()=>{this.page=next_page}}to={"/p/" + next_page} style={{color:'blue'}}>Older Posts →</Link>:"Older Posts →"}</span>;

            return(
            <Fragment>
                <div className="container-fluid" >
                    <Banner image={FeynmanDiagram}>Physics Blog</Banner>
                    <div className="row" style={{boxShadow:'0px 0px 10em 10em rgba(0,0,0,0.4)',zIndex:'2', minHeight:'50em'}}>
                        <div className='col-sm-3' style={{backgroundColor:'#eeeeee'}}/>
                        <div className='col-sm-6' style={{backgroundColor:'#eeeeee'}}>
                            {this.state.resp.data.map((post) => {
                                return(<div key={post.slug}>
                                    <BlogCard title={post.title} summary={post.summary} image={post.featured_image} slug={post.slug} published={post.published}/>
                                </div>);
                            })}
                        </div>
                        <div className='col-sm-3' style={{backgroundColor:'#eeeeee'}}/>
                        <div className="col-sm-12" style={{backgroundColor:'#eeeeee', textAlign:'center'}}>
                            {n_page}
                            {p_page}
                        </div>
                    </div>
                </div>
                <Footer/>
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
