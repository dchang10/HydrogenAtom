import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import HydrogenAtom from './scenes/HydrogenAtom/components/HydrogenAtom';
import './App.css';
import Footer from './components/Footer';


// -------------------------------------------------------------
class NavigationBar extends Component{
    render(){
        return(
        <Fragment>
        <div className="container-fluid">
            <nav id="navigation-bar" className="navbar navbar-expand-lg fixed-top navbar-toggleable-md navbar-dark bg-dark" style={{ boxShadow: "0 0.5em 0.8em 0 rgba(0, 0, 0, 0.1)"}}>
                <a className="navbar-toggler" type="a" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </a>

                <h4  style={{marginBottom:'0em', color:'#AC2B37' }}>Physics</h4>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="https://dchang10.github.io" style={{padding:'1em 0em 1em 1em'}}>Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://dchang10.github.io/projects" style={{padding:'1em 0em 1em 1em'}}>Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://dchang10.github.io/blog/" style={{padding:'1em 0em 1em 1em'}}>Blog</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        </Fragment>
        );
    }
}


class App extends Component {


    render() {

        return(
        <Fragment>
            <div style={{minHeight:'60em'}}>
                        <NavigationBar/>
                        <div style={{padding:'1.5em'}}/>
                        <HydrogenAtom/>
            </div>
            <footer>
                <Footer/>
            </footer>
        </Fragment>

        );
    }
}


export default App;
