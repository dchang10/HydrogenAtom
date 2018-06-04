import React, { Component } from 'react';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
const $ = require('jquery');

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={username:'admin', password:'admin'};
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    handleChangeUsername(event) {
        this.setState({username: event.target.value})
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value})
    }


        render() {
            return(
                <div>
                    <h1 style={{paddingTop:'2em'}}>
                        Login
                    </h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username"> Username:</label>
                            <input type="text" className="form-control" id="username" placeholder="enter username" value={this.state.value} onChange={this.handleChangeUsername}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"> Password:</label>
                            <input type="text" className="form-control" id="password" placeholder="enter pasword" value={this.state.value} onChange={this.handleChangePassword}/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <FroalaEditor tag='textarea'/>
                </div>
            );
    }
}
