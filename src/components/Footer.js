import React from 'react';
import '../css/blog.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

export default function Footer(){
    return(
        <footer id="my-footer" style={{width:'100%', height:'20em', backgroundColor:'rgb(33, 37, 41)', borderStyle:'hidden', textAlign:'center'}}>
                <div style={{paddingTop:'4em'}}>
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
        </footer>
        )
}