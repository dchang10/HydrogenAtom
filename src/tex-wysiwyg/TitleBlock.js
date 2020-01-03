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
        return 'title';
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
    return (
      <Editor 
        editorState={this.state.editorState} 
        onChange={this._onChange}
        style={{fontSize:'1rem'}}{...this.props}
        blockRenderMap={extendedBlockRenderMap}
        blockStyleFn={this.myBlockStyleFn}
        placeholder="Title"
        readOnly={this.props.readOnly}
        />
    );
  }
}

