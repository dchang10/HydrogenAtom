import React, { Component} from 'react';
import TexEditor from '../../../tex-wysiwyg/TeXEditor';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated,
      username: "username",
      password: "password",
    };

    this._login = async() => {
      let status_code = await this.props.authenticate(this.state.username, this.state.password);

      if(status_code === 200) {
        this.setState({authenticated:true});
      }
    }; 
  }

  render() {
    let modalStyle = {
      display: !this.state.authenticated?'inline':'none',
      position: 'fixed', /* Stay in place */
      zIndex: '2', /* Sit on top */
      paddingTop: '100px', /* Location of the box */
      left: '0',
      top: '0',
      width: '100%', /* Full width */
      height: '100%', /* Full height */
      overflow: 'auto', /* Enable scroll if needed */
      backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
    }
   let login_panel =  
    <div ref="myModal" className="modal" style={modalStyle}>
     <div className="modal-content" style={{
          backgroundColor:'#fefefe', 
          margin:'auto', 
          padding:'20px', 
          border:'1px solid #888', 
          maxWidth:'400px',
          width:'80%',
        }}>
          <h1>Login</h1>
          <form>
            Username:<br/>
            <input style={{width:'100%'}} type="text" ref="slug" value={this.state.username} onChange={
              (evt) =>{
                let username = evt.target.value;
                this.setState({username:username});
              }
            }/>
            <br/>
            Password:<br/>
            <input style={{width:'100%'}} type="password" ref="status" value={this.state.password} onChange={
              (evt) =>{
                let password = evt.target.value;
                this.setState({password:password});
              }
            }/> 
            <br/>
          </form>
          <br/>
          <button onClick={this._login}>Login</button>
        </div>

    </div>
    return(
      <div>
        <div style={{marginBottom:'2em'}}/>
        <div style={{minHeight:'35em'}}>
          {login_panel}
          <TexEditor readOnly={!this.state.authenticated} username={this.state.username} password={this.state.password}/>
        </div>
      </div>
    );
  }
}
