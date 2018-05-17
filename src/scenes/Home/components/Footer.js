import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../css/blog.css';
import butterlogo from '../images/butter-light.6b4ab5bd4625.svg';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

export default function Footer(){
    return(
        <footer id="my-footer" className="container-fluid " style={{backgroundColor:'#212529', color:'white', borderStyle:'hidden'}}>
            <div className="row card-footer justify-content-between" style={{height:'10em'}}>
                <div className="col-sm-2" >
                        <FontAwesomeIcon id="git" icon={brands.faGithub}  style={{height:"2em",width:"3.5em"}}/>
                        <FontAwesomeIcon id="linkedIn" icon={brands.faLinkedinIn} style={{height:"2em",width:"3.5em"}}/>
                </div>
                <div className="col-sm-2" >
                    <a href="https://buttercms.com/">
                        <img style={{align:'right',paddingTop:'0.2em'}} className="logo" src={`${butterlogo}`} height="25" alt='Link to ButterCMS'/>
                    </a>
                </div>
            </div>
        </footer>
        )
}