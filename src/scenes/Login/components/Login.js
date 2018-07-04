import React, { Component} from 'react';
import Banner from './Banner.js';
import Footer from '../../../components/Footer.js';

import TexEditor from '../../../tex-wysiwyg/TeXEditor';

export default class Login extends Component {


  render() {
    return(
      <div>
        <div style={{marginBottom:'2em'}}/>
        <div style={{minHeight:'35em'}}>
          <TexEditor readOnly={false}/>
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    );
  }
}
