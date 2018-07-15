import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import HydrogenAtom from './scenes/hydrogenAtom/components/HydrogenAtom';
import Home from './scenes/Home/components/Home';
import Login from './scenes/Login/components/Login';
import BlogPost from './scenes/Posts/components/BlogPost';
import NotFound from './scenes/Home/components/NotFound';
import './App.css';
import Footer from './components/Footer';

import blogAPI from './api/blog-api';


// -------------------------------------------------------------
class NavigationBar extends Component{
    render(){
        return(
        <Fragment>
        <div className="container-fluid">
            <nav id="navigation-bar" className="navbar navbar-expand-lg fixed-top navbar-toggleable-md navbar-dark bg-dark" style={{ boxShadow: "0 0.5em 0.8em 0 rgba(0, 0, 0, 0.1)"}}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <h4  style={{marginBottom:'0em', color:'#AC2B37' }}>Physics</h4>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" style={{padding:'1em 0em 1em 1em'}}>Home<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pages/hydrogenAtom" style={{padding:'1em 0em 1em 1em'}}>Hydrogen Atom</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pages/Login" style={{padding:'1em 0em 1em 1em'}}>Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        </Fragment>
        );
    }
}

class ScrollToTopRoute extends Component {
  componentDidUpdate(prevProps) {
      window.scrollTo(0, 0);
  }

  render() {
    const { 
        component: Component, 
        ...rest 
    } = this.props;

    return <Route {...rest} render={(props) => (
        <Component 
            authenticated={this.props.authenticated} 
            authenticate={async (username, password) => {return await this.props.authenticate(username, password)}} 
            username={this.props.username}
            password={this.props.password}
            {...props} />
        )} />;
  }
}



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            username: 'username',
            password: 'password',
        };

        this.authenticate = async (username, password) => {
            this.setState({username: username, password: password});
            let statusCode = await blogAPI.authenticate(username, password);
            if(statusCode === 200) {
                console.log('Logged in');
            this.setState({authenticated: true});
            }
            else {this.setState({authenticated: false});}
            console.log(statusCode);
            return statusCode;
        }
    }
    


    render() {

        return(
        <Fragment>
            <div style={{minHeight:'60em'}}>
                <Router>
                    <Fragment>
                        <NavigationBar/>
                        <div style={{padding:'1.5em'}}/>
                        <Switch>
                            <ScrollToTopRoute path="/p/:page" component={Home} authenticated={this.state.authenticated}/>
                            <Redirect exact from="/" to="/p/1"/>
                            <ScrollToTopRoute path="/pages/hydrogenAtom" component={HydrogenAtom} />
                            <ScrollToTopRoute path="/pages/Login" component={Login} authenticate={this.authenticate} authenticated={this.state.authenticated}/>
                            <ScrollToTopRoute path="/post/:slug" component={BlogPost} authenticated={this.state.authenticated} username={this.state.username} password={this.state.password}/>
                            <ScrollToTopRoute path ="/404" component={NotFound} />
                        </Switch>
                    </Fragment>
                </Router>
            </div>
            <footer>
                <Footer/>
            </footer>
        </Fragment>

        );
    }
}


export default App;
