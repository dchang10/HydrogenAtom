import Draft from 'draft-js';
import { Map } from 'immutable';
import React, { Component } from 'react';

import TeXBlock from './TeXBlock';
import {insertTeXBlock} from './modifiers/insertTeXBlock';
import {removeTeXBlock} from './modifiers/removeTeXBlock';
import {insertImageBlock} from './modifiers/insertImageBlock';
import {removeImageBlock} from './modifiers/removeImageBlock';
import {setTitle2}  from './modifiers/setTitle2';
import CenterBlock from './CenterBlock'
import Image from './Image';
import { PostCode } from './post';
import { GetCode } from './get';
import blogAPI from '../api/blog-api';

var {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } = Draft;

class StyleButton extends Component {
  constructor() {
    super();
    
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.className);
    };
  }
  
  render() {
    let className = "styleButton";
    
    if (this.props.active) {
      className += " active"; 
    }
    
    if (this.props.style)
      return (
        <span className={className + ' editor-control'} onMouseDown={this.onToggle} style={this.props.style}>{this.props.label}</span>
      );
    else
      return(
        <span className={className + ' editor-control'} onMouseDown={this.onToggle}>{this.props.label}</span>
      );      
  }
}


class InlineStyleControls extends Component{
  constructor(props){
    super(props);
    this.currentStyle = props.editorState.getCurrentInlineStyle()

    this.INLINE_STYLES = [
      {label: 'Bold', 
        type: 'BOLD', 
        style: {width:'3em', left:'0em', top:'10em', position:'fixed'}
      },
      {label: 'Italic', 
        type: 'ITALIC', 
        style: {width:'3em', left:'3em', top:'10em', position:'fixed'}
      },
      {label: 'Underline', 
        type: 'UNDERLINE', 
        style: {width:'5em', left:'6em', top:'10em', position:'fixed'}
      },
      {label: 'Monospace', 
        type: 'CODE', 
        style: {width:'6em', left:'11em', top:'10em', position:'fixed'}
      },
    ]; 
  }
  render(){
  return (
    <div className="RichEditor-controls">
      {this.INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={this.currentStyle.has(type.type)}
          label={type.label}
          onToggle={this.props.onToggle}
          className={type.type}
          style={type.style}
        />
      )}
    </div>
  );
}}

class BlockStyleControls extends Component {
  constructor (props) {
    super(props);
    let { editorState} = props;
    this.selection = editorState.getSelection();
    this.blockType = editorState.getCurrentContent()
                          .getBlockForKey(this.selection.getStartKey())
                          .getType();
    this.block_types = [
		  { label: "h1", 
        type: "header-one", 
        style:{width:'2.5em', top:'8em', left:'0', position:'fixed'}
      },
		  { label: "h2", 
        type: "header-two", 
        style:{width:'2.5em', top:'8em', left:'2em', position:'fixed'}
      },
		  { label: "h3", 
        type: "header-three", 
        style:{width:'2.5em', top:'8em', left:'4em', position:'fixed'} 
      },
		  { label: '""', 
        type: "blockquote", 
        style:{width:'2.5em', top:'8em', left:'6em', position:'fixed'}
      },
		  { label: "ul", 
        type: "unordered-list-item", 
        style:{width:'2.5em', top:'8em', left:'8em', position:'fixed'}
      },
		  { label: "ol", 
        type: "ordered-list-item", 
        style:{width:'2.5em', top:'8em', left:'10em', position:'fixed'}
      },
		  { label: "</>", 
        type: "code-block", 
        style:{width:'2.5em', top:'8em', 
        left:'12em', position:'fixed'}
      },
      { label: "custom", 
        type: "center", 
        style:{width:'2.5em', top:'8em', left:'14em', position:'fixed'}
      }
		];
  }
  render(){
    return (
      <div className="block controls">
        {
          this.block_types.map((type) => (
            <StyleButton
              key={type.label}
              active={type.type === this.blockType}
              label={type.label}
              onToggle={this.props.onToggle}
              className={type.type}
              style={type.style}
            />
          ))  
        }
      </div>
    );
  }
};

export default class TeXEditor extends Component {
  constructor(props) {

    super(props);
    this.state = {
      save:false,
      editorState: EditorState.createEmpty(),
      liveEdits: Map(),
      post:{
        slug:'slug', 
        published:new Date(), 
        status: 'draft', 
        title:'title', 
        body:'body', 
        summary:'summary', 
        seo_title:'seo-title', 
        author:'author', 
        featured_image:'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 
        number:'number',
      },
    };
    if (this.props.hasOwnProperty('slug')) {
      blogAPI.getPost(this.props.slug).then((val)=>{
        let body = val[0].body;
        let content = convertFromRaw(JSON.parse(body));
        this.setState(
          {editorState:EditorState.createWithContent(content)}
        );
      });
    }


    this._blockRenderer = (block) => {
    	var contentState = this.state.editorState.getCurrentContent();
    	var entityKey = block.getEntityAt(0);
      if (block.getType() === 'atomic' ) {
      	switch(contentState.getEntity(entityKey).getData()['type']) {
        case 'TeX':
	        return {
	          component: TeXBlock,
	          editable: false,
	          props: {
	            onStartEdit: (blockKey) => {
	              var {liveEdits} = this.state;
	              this.setState({liveEdits: liveEdits.set(blockKey, true)});
	            },
	            onFinishEdit: (blockKey, newContentState) => {
	              var {liveEdits} = this.state;
	              this.setState({
	                liveEdits: liveEdits.remove(blockKey),
	                editorState:EditorState.createWithContent(newContentState),
	              });
	            },
	            onRemove: (blockKey) => this._removeTeX(blockKey),
	          },
	        };
        case 'Image':
          return {
            component: Image,
            editable: false,
            props: {
              onStartEdit: (blockKey) => {
                var {liveEdits} = this.state;
                this.setState({liveEdits: liveEdits.set(blockKey, true)});
              },
              onFinishEdit: (blockKey, newContentState) => {
                var {liveEdits} = this.state;
                this.setState({
                  liveEdits: liveEdits.remove(blockKey),
                  editorState:EditorState.createWithContent(newContentState),
                });
              },
              onRemove: (blockKey) => this._removeImage(blockKey),
            }, 
          }
        default:
          return null;
	      } 
      } else if (block.getType() === 'title'){
          return {
            component: CenterBlock,
          }
      }
      return null;
    };

    this._focus = () => this.refs.editor.focus();
    this._onChange = (editorState) => this.setState({editorState});

    this._handleKeyCommand = (command, editorState) => {
      var newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this._onChange(newState);
        return true;
      }
      return false;
    };

    this._removeTeX = (blockKey) => {
      var {editorState, liveEdits} = this.state;
      this.setState({
        liveEdits: liveEdits.remove(blockKey),
        editorState: removeTeXBlock(editorState, blockKey),
      });
    };

    this._insertTeX = () => {
      this.setState({
        liveEdits: Map(),
        editorState: insertTeXBlock(this.state.editorState),
      });
    };

    this._removeImage = (blockKey) => {
      var {editorState, liveEdits} = this.state;
      this.setState({
        liveEdits: liveEdits.remove(blockKey),
        editorState: removeImageBlock(editorState, blockKey),
      });
    }; 
    this._insertImage = () => {
      this.setState({
        editorState: insertImageBlock(this.state.editorState),
      })
    }

    this._setTitle2= () => {
    	this.setState({
    		editorState: setTitle2(this.state.editorState),
    	});
    };
  

    this._toggleBlockType = (type) => {
      const {editorState} = this.state;
      
      this._onChange(RichUtils.toggleBlockType(editorState, type));
    }
    this._toggleInlineStyle = (inlineStyle) => {
      this._onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }
    this._openSavePanel = () => {
      this.setState({save:true});

    }
    this._closeSavePanel = () => {
      this.setState({save:false});
    }
    this._saveState = () => {
      let newBody = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
      let newPost ={
        body:newBody,
        title:this.refs.title.value,
        summary:this.refs.summary.value,
        seo_title:this.refs.seo_title.value,
        featured_image:this.refs.featured_image.value,
        slug:this.refs.slug.value,
        published:this.refs.published.value,
        status:this.refs.status.value,
        number:'number',
      } ;
      this.setState({newPost:newPost});
      console.log(newPost); 
      blogAPI.post(newPost);
      console.log("state saved");      
    }
		this._getBlockStyle = (block) => {
	  	switch (block.getType()) {
	      case 'left':
	          return 'align-left';
	      case 'center':
	          return 'align-center';
	      case 'right':
	          return 'align-right';
	      default:
	          return null;
	  	}   
		}

  }

  componentDidMount() {
    this.setState({newPost:this.state.post})
  }
  /**
   * While editing TeX, set the Draft editor to read-only. This allows us to
   * have a textarea within the DOM.
   */
  render() {
 		const wrapper = <div style={{maxWidth:'900px', margin:'auto'}} {...this.props}/>;

		const centerWrapper = <div style={{maxWidth:'900px', margin:'auto', textAlign:'center'}} {...this.props}/>;
 		const unorderedListWrapper = <ul style={{maxWidth:'900px', margin:'auto'}} />
 		const orderedListWrapper = <ol style={{maxWidth:'900px', margin:'auto'}} />
  	const blockRenderMap = Map({
      'center': {
        element: 'div',
        wrapper: wrapper},
		  'header-one': {
		    element: 'h1',
		    wrapper: wrapper },

			'header-two': {
		    element: 'h2',
		    wrapper: wrapper },

			'header-three': {
		    element: 'h3',
		    wrapper: wrapper },

			'header-four': {
		    element: '4',
		    wrapper: wrapper },	    

			'header-five': {
		    element: 'h5',
		    wrapper: wrapper },

			'header-six': {
		    element: 'h6',
		    wrapper: wrapper },	    	    

			'blockquote': {
		    element: 'blockquote',
		    wrapper: wrapper },

			'code-block': {
		    element: 'pre',
		    wrapper: wrapper },	    	    

			'unordered-list-item': {
		    element: 'li',
		    wrapper: unorderedListWrapper },	    	    

			'ordered-list-item': {
		    element: 'li',
		    wrapper: orderedListWrapper },

			'unstyled': {
		    element: 'div',
		    wrapper: wrapper },	    	    	    

		  'atomic': {
		  	element: 'atomic',
		  	wrapper: centerWrapper
		  }
		});


		// keep support for other draft default block types and add our myCustomBlock type
		const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

    let modalStyle = {
        display: this.state.save?'block':'none',
        position: 'fixed', /* Stay in place */
        zIndex: '1', /* Sit on top */
        paddingTop: '100px', /* Location of the box */
        left: '0',
        top: '0',
        width: '100%', /* Full width */
        height: '100%', /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        backgroundColor: 'rgb(0,0,0)', /* Fallback color */
        backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
      }
    let savepanel = 
      <div ref="myModal" className="modal" style={modalStyle}>
        <div className="modal-content" style={{
          backgroundColor:'#fefefe', 
          margin:'auto', 
          padding:'20px', 
          border:'1px solid #888', 
          width:'80%',
        }}>
          <span onClick={this._closeSavePanel} className="close">&times;</span>
          <form>
            slug:<br/>
            <input style={{width:'100%'}} type="text" ref="slug" value={this.state.post.slug} onChange={
              (evt) =>{
                let post = this.state.post;
                post.slug = evt.target.value;
                this.setState({post:post});
              }
            }/>
            <br/>
            published: <br/> 
            <input style={{width:'100%'}} type="text" ref="published" value={this.state.post.published} onChange={
              (evt) =>{
                let post = this.state.post;
                post.publihed = evt.target.value;
                this.setState({post:post});
              }
            }/>
            <br/> 
            status:<br/>
            <input style={{width:'100%'}} type="text" ref="status" value={this.state.post.status} onChange={
              (evt) =>{
                let post = this.state.post;
                post.status = evt.target.value;
                this.setState({post:post});
              }
            }/> 
            <br/>
            title:<br/>
            <input style={{width:'100%'}} type="text" ref="title" value={this.state.post.title} onChange={
              (evt) =>{
                let post = this.state.post;
                post.title= evt.target.value;
                this.setState({post:post});
              }
            }/>
            <br/>
            summary: <br/> 
            <input style={{width:'100%'}} type="text" ref="summary" value={this.state.post.summary} onChange={
              (evt) =>{
                let post = this.state.post;
                post.summary = evt.target.value;
                this.setState({post:post});
              }
            }/>
            <br/> 
            seo title:<br/>
            <input style={{width:'100%'}} type="text" ref="seo_title" value={this.state.post.seo_title} onChange={
              (evt) =>{
                let post = this.state.post;
                post.sseo_title = evt.target.value;
                this.setState({post:post});
              }
            }/> 
            <br/>     
            featured image: <br/> 
            <input style={{width:'100%'}} type="text" ref="featured_image" value={this.state.post.featured_image} onChange={
              (evt) =>{
                let post = this.state.post;
                post.featured_image = evt.target.value;
                this.setState({post:post});
              }
            }/>
            <br/>                    
          </form>
          <br/>
          <figure style={{textAlign:'center'}}>
            <img style={{border:'3em',borderColor:'black'}} src={this.state.post.featured_image}/>
          </figure>
          <button onClick={this._saveState}>Save</button>
        </div>

      </div>

    let controlpanel = null
    if(this.props.readOnly == false) {
      controlpanel = 
        <div>
          <BlockStyleControls
            className="block"
            editorState={this.state.editorState}
            onToggle={this._toggleBlockType}
          />
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={this._toggleInlineStyle}
           />
          <StyleButton
            className="TexButton"
            label="Insert Tex"
            onToggle={this._insertTeX}
            style={{left:'0', top:'12em', width:'6em', position:'fixed'}}
          /> 
          <StyleButton
            label="Make Title"
            onToggle={this._setTitle2}
            style={{left:'6em', top:'12em', width:'10em', position:'fixed'}}
          />
          <StyleButton
            className="Image"
            label="Image"
            onToggle={this._insertImage}
            style={{left:'12em', top:'12em', width:'6em', position:'fixed'}}
          /> 
          <StyleButton
            className="save"
            label="save state"
            onToggle={this._openSavePanel}
            style={{top:'8em', right:'0em', width:'6em', position:'fixed'}}/>
        </div>
    }
    return (
      <div>
        <div className="TeXEditor-editor" onClick={this._focus} >
          <Editor
          	blockStyleFn={this._getBlockStyle}
          	blockRenderMap={extendedBlockRenderMap}
            blockRendererFn={this._blockRenderer}
            editorState={this.state.editorState}
            handleKeyCommand={this._handleKeyCommand}
            onChange={this._onChange}
            placeholder="Start a document..."
            readOnly={this.state.liveEdits.count() | this.props.readOnly}
            ref="editor"
            spellCheck={true}
          />

        </div>
        {controlpanel}
        {savepanel}
      </div>
    );
  }

}
