import Draft,{ Editor, } from 'draft-js';
import React from 'react';
import { Map } from 'immutable';
import './wysiwyg.css';


export default class TitleBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.props.editorState,
    }
    this._onChange = this.props.onChange;
    this.myBlockStyleFn = (contentBlock) => {
      const type = contentBlock.getType();
      if (type === 'unstyled') {
        return 'align-center';
      }
    }
  }

  render() {
    const wrapper = <div 
    style={{
      maxWidth:'900px', 
      margin:'auto', 
    }} {...this.props}/>;

  const blockRenderMap = Map({
      'unstyled': {
        element: 'h1',
        wrapper: wrapper },                 
    });


    // keep support for other draft default block types and add our myCustomBlock type
    const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);
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
    return (
      <Editor 
        editorState={this.state.editorState} 
        onChange={this._onChange}
        style={{fontSize:'1rem'}}{...this.props}
        customStyleMap={styleMap}
        blockRenderMap={extendedBlockRenderMap}
        blockStyleFn={this.myBlockStyleFn}
        placeholder="Title"
        readOnly={this.props.readOnly}
        />
    );
  }
}

