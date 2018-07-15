import React, { Component } from 'React';

// Basic style button
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

//Controller for inline Styles
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
      { label: "drop", 
        type: "drop-caps", 
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

