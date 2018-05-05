import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={username:'admin', password:'admin'};
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
    handleChange1(event) {
        this.setState({username: event.target.value})
    }
    handleChange2(event) {
        this.setState({password: event.target.value})
    }


        render() {
            return(
                <div>
                    <h1>
                        Login
                    </h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username"> Username:</label>
                            <input type="text" className="form-control" id="username" placeholder="enter username" value={this.state.value} onChange={this.handleChange1}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"> Password:</label>
                            <input type="text" className="form-control" id="password" placeholder="enter pasword" value={this.state.value} onChange={this.handleChange2}/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            );
    }
}
