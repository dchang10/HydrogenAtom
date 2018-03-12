import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import HydrogenAtom from './scenes/hydrogenAtom/components/HydrogenAtom';
import Home from './scenes/Home/components/Home';



const routes = [
    {
        path:"/",
        exact:true,
        main: () => <Home/>,
        key: "/"

    },
    {
        path: "/hydrogenAtom",
        main: () => <HydrogenAtom/>,
        key: "/hydrogenAtom"
    }
];

class NavigationBar extends Component{
    render(){
        return(
        <Fragment>
        <div className="container-fluid">
            <nav id="navigation-bar" className="navbar navbar-expand-lg fixed-top navbar-toggleable-md navbar-dark bg-dark" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)"}}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <h4 className="text-white">Dominic Chang</h4>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/hydrogenAtom">Hydrogen Atom</Link>
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
                {routes.map((route, index) => (
                    <ScrollToTopRoute
                        key={route.key}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                 ))}
                </Fragment>
            </Router>
        );
    }
}


export default App;
