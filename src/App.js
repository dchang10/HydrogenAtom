import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import HydrogenAtom from './scenes/hydrogenAtom/components/HydrogenAtom';
import Home from './scenes/Home/components/Home';
import Login from './scenes/Login/components/Login';
import BlogPost from './scenes/Home/components/Posts/BlogPost';
import NotFound from './scenes/Home/components/NotFound';
import './App.css';


// ------------------------------------TODO incorporate this later
const routes = [
    {
        path:"/",
        exact:true,
        main: () => <Home/>,
        key: "/p/1"

    },
    {
        path: "/pages/hydrogenAtom",
        main: () => <HydrogenAtom/>,
        key: "/pages//hydrogenAtom"
    },
    {
        path: "/login",
        main: () => <Login/>,
        key: "/login"
    },
    {
        path: "/post/:slug",

    }
];
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
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} render={props => (<Component {...props} />)} />;
  }
}



class App extends Component {

    render() {

        return(
            <Router>
                <Fragment>
                    <NavigationBar/>
                    <div style={{padding:'1.5em'}}/>
                    <Switch>
                        <ScrollToTopRoute path="/p/:page" component={Home} />
                        <Redirect exact from="/" to="/p/1"/>
                        <ScrollToTopRoute path="/pages/hydrogenAtom" component={HydrogenAtom} />
                        <ScrollToTopRoute path="/pages/Login" component={Login} />
                        <ScrollToTopRoute path="/post/:slug" component={BlogPost} />
                        <ScrollToTopRoute path ="/404" component={NotFound} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}


export default App;
