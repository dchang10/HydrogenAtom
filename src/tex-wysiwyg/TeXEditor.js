import Draft from 'draft-js';
import { Map, List, Repeat } from 'immutable';
import React, { Component } from 'react';

import TeXBlock from './TeXBlock';
import TitleBlock from './TitleBlock';
import {insertTeXBlock} from './modifiers/insertTeXBlock';
import {removeTeXBlock} from './modifiers/removeTeXBlock';
import {insertImageBlock} from './modifiers/insertImageBlock';
import {removeImageBlock} from './modifiers/removeImageBlock';
import {setTitle2}  from './modifiers/setTitle2';
import Image from './Image';
import blogAPI from '../api/blog-api';
import './wysiwyg.css';

var { Entity, CharacterMetadata, genKey, ContentBlock, ContentState, Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } = Draft;

class StyleButton extends Component {
  constructor() {
    super();
    
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.type);
    };
  }
  
  render() {
    let className = this.props.className;
    if (this.props.active) {
      className += " active"; 
    }
    
    let style = {
            border:'solid', 
            borderColor:'#aaa', 
            borderWidth:'0.05em', 
            height:'2em', width:'3em'
            };
            
    if (this.props.className)
      return (
        <div>
          <button style={style} className={className} onMouseDown={this.onToggle}></button>
        </div>
      );
    else
      return(
        <div>
          <button style={style} onMouseDown={this.onToggle}><b>{this.props.label}</b></button>
        </div>
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
        className: 'fas fa-bold',
      },
      {label: 'Italic', 
        type: 'ITALIC', 
        className: 'fas fa-italic',
      },
      {label: 'Underline', 
        type: 'UNDERLINE', 
        className: 'fas fa-underline',
      },
      {label: 'Monospace', 
        type: 'CODE', 
        className: 'fas fa-code',
      },
    ]; 
  }
  render(){
  return (
    <div className="Inline-controls">
      {this.INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={this.currentStyle.has(type.type)}
          label={type.label}
          onToggle={this.props.onToggle}
          className={type.className}
        />
      )}
      <StyleButton
        label="| T |"
        onToggle={this.props.setTitle}
      />
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
		  { label: "H1", 
        type: "header-one", 
      },
		  { label: "H2", 
        type: "header-two", 
      },
		  { label: "H3", 
        type: "header-three", 
      },
		  { label: '""', 
        type: "blockquote", 
      },
		  { label: "ul", 
        type: "unordered-list-item", 
      },
		  { label: "ol", 
        type: "ordered-list-item", 
      },
		  { label: "</>", 
        type: "code-block", 
        className: "fas fa-code",
      },
      { label: "drop", 
        type: "drop-caps", 
      }
		];
  }
  render(){
    return (
      <div className="Block-controls">
        {
          this.block_types.map((type) => (
            <StyleButton
              key={type.label}
              active={type.type === this.blockType}
              label={type.label}
              onToggle={this.props.onToggle}
              className={type.className}
              type={type.type}
            />
          )
        )  
        }
        <StyleButton
          label="Tex"
          onToggle={this.props.insertTeX}
        /> 
        <StyleButton
          label="Image"
          onToggle={this.props.insertImage}
          className={"fas fa-images"}
        /> 
      </div>
    );
  }
};

export default class TeXEditor extends Component {
  constructor(props) {
    let contentBlocksArray = ['Title'].map(word => {
      return new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        characterList: new List(Repeat(CharacterMetadata.create(), word.length)),
        text: word,
        entity: Entity.create(      
        'LINK',
        'IMMUTABLE',
      ) 
      });
    });    
    let titleContent = ContentState.createFromBlockArray(contentBlocksArray);

    super(props);
    this.state = {
      save:false,
      titleState: EditorState.createWithContent(titleContent),
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
              readOnly: this.props.readOnly,
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
              onRemove: (blockKey) => {this._removeImage(blockKey)},
              readOnly: this.props.readOnly,
            }, 
          }
        default:
          return null;
	      } 
      }
      return null;
    };

    this._focus = () => this.refs.editor.focus();
    this._onChange = (editorState) => this.setState({editorState});
    this._titleChange = (titleState) => {
      let post = this.state.post;
      post.title = titleState.getCurrentContent().getPlainText();
      this.setState(
      {
        titleState:titleState,
        post:post,
      })
    };

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
    		titleState: setTitle2(this.state.titleState),
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
        slug:this.refs.slug.value.split(' ').join('_'),
        published:this.refs.published.value,
        status:this.refs.status.value,
        number:'number',
      } ;
      this.setState({newPost:newPost});
      console.log(newPost); 
      blogAPI.post(newPost, this.props.username, this.props.password);
      console.log("state saved");      
    }
		this._getBlockStyle = (block) => {
	  	switch (block.getType()) {
	      case 'header-one':
	          return 'align-center';
        case 'drop-caps':
            return 'drop-caps';
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
      'drop-caps': {
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
        zIndex: '2', /* Sit on top */
        paddingTop: '100px', /* Location of the box */
        left: '0',
        top: '0',
        width: '100%', /* Full width */
        height: '100%', /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
      }
      const styleMap = {
        'title2': {
          paddingLeft: '0.2em',
          paddingRight: '0.2em',
          borderLeftStyle: 'solid',
          borderRightStyle: 'solid',
          borderLeftWidth: '0.1em',
          borderRightWidth: '0.1em',
        },
      };

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
            <img style={{border:'3em',borderColor:'black'}} src={this.state.post.featured_image} alt={"featured"}/>
          </figure>
          <button onClick={this._saveState}>Save</button>
        </div>

      </div>

    let controlpanel = null
    if(this.props.readOnly === false) {
      controlpanel = 
        <div>
          <BlockStyleControls
            className="block"
            editorState={this.state.editorState}
            onToggle={this._toggleBlockType}
            insertTeX={this._insertTeX}
            insertImage={this._insertImage}
          />
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={this._toggleInlineStyle}
            setTitle={this._setTitle2}
           />
          <button
            style = {{
              border:'solid', 
              borderColor:'#aaa', 
              borderWidth:'0.05em', 
              height:'2em', width:'5em'
              }}
            className="save"
            onToggle={this._openSavePanel}
            >
              {"Save"}
          </button>
        </div>
    }
    return (
      <div>
        <div style={{height:'3em'}}/>
        <TitleBlock 
          onChange={(titleState) =>{this._titleChange(titleState)}}
          editorState={this.state.titleState}
          readOnly={this.props.readOnly}
          />
        <div className="TeXEditor-editor" onClick={this._focus} >
          <Editor
          	blockStyleFn={this._getBlockStyle}
            customStyleMap={styleMap}
          	blockRenderMap={extendedBlockRenderMap}
            blockRendererFn={this._blockRenderer}
            editorState={this.state.editorState}
            handleKeyCommand={this._handleKeyCommand}
            onChange={this._onChange}
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