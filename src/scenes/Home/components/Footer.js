import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../css/blog.css';
import butterlogo from '../images/butter-light.6b4ab5bd4625.svg';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

export default function Footer(){
    return(
        <footer id="my-footer" className="page-footer col-sm-12" style={{backgroundColor:'#212529', color:'white', borderStyle:'hidden'}}>
            <div className="row card-footer" style={{height:'10em', textAlign:'center'}}>
                <div className="col-sm-3">
                        <a href='https://github.com/dchang10'>
                            <FontAwesomeIcon id="git" icon={brands.faGithub} style={{height:"2em",width:"3.5em"}} href='https://github.com/dchang10'/>
                        </a>
                        <a href='https://www.linkedin.com/in/dominic-chang-9382a1b7/'>
                            <FontAwesomeIcon id="linkedIn" icon={brands.faLinkedinIn} style={{height:"2em",width:"3.5em"}}/>
                        </a>
                        <a href='http://www.piedpiper.com/'>
                            <FontAwesomeIcon id="piedPiper" icon={brands.faPiedPiperPp} style={{height:"2em",width:"3.5em"}}/>
                        </a>
                </div>
                <div className="col-sm-6"/>
                <div className="col-sm-3">
                    <a href="https://buttercms.com/">
                        <img style={{align:'center',paddingTop:'0.2em'}} className="logo" src={`${butterlogo}`} height="25" alt='Link to ButterCMS'/>
                    </a>
                </div>
            </div>
        </footer>
        )
}