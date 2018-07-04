import React from 'react';
import MathJax from 'react-mathjax2';

class TexContainer extends React.Component {

  render() {
    return (<div onClick={this.props.onClick}>{this.props.tex}</div>)
  }
}

class MathJaxOutput extends React.Component {
  constructor(props) {
    super(props);
    this._timer = null;
    this.texRender = 
        <MathJax.Context input={'tex'} options={{
          "CommonHTML": { scale: 100,linebreaks: { automatic: true, width: "90%container" } }, 
          "SVG": { scale: 100,linebreaks: { automatic: true, width: "90% container" } } 
        }}>
          <MathJax.Node>{this.props.content}</MathJax.Node>
        </MathJax.Context>;
  }

  _update() {
    if (this._timer) {
      clearTimeout(this._timer);
    }

    this._timer = setTimeout(() => {
      this.texRender =               
        <MathJax.Context input={'tex'} options={{
          "CommonHTML": { scale: 100,linebreaks: { automatic: true, width: "90%container" } }, 
          "SVG": { scale: 100,linebreaks: { automatic: true, width: "90% container" } } 
        }}>
          <MathJax.Node>{this.props.content}</MathJax.Node>
        </MathJax.Context>}, 0);
  }

  componentDidMount() {
    this._update();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this._update();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
    this._timer = null;
  }

  render() {
    return <TexContainer ref="container" onClick={this.props.onClick} tex={this.texRender}/>;
  }
}

export default class TeXBlock extends React.Component {
  constructor(props) {
    super(props);
    const contentState = this.props.contentState;
    const entity = this.props.block.getEntityAt(0);
    this.state = {
      editMode: false,
      caption:contentState.getEntity(entity).getData()['caption']
    };

    this._onClick = () => {
      if (this.state.editMode) {
        return;
      }

      this.setState({
        editMode: true,
        texValue: this._getValue(),
        caption: contentState.getEntity(entity).getData()['caption'], 
      }, () => {
        this._startEdit();
      });
    };

    this._onValueChangeTex = evt => {
      let value = evt.target.value;
      var invalid = false;
      this.setState({
        invalidTeX: invalid,
        texValue: value,
      });
    };

    this._onValueChangeCaption = evt => {
      let value = evt.target.value;
      this.setState({caption: value,});
    }

    this._save = () => {
      var entityKey = this.props.block.getEntityAt(0);
      var newContentState = this.props.contentState.mergeEntityData(
        entityKey,
        {
          content: this.state.texValue,
          caption: this.state.caption,
        },
      );
      this.setState({
        invalidTeX: false,
        editMode: false,
        texValue: null,
      }, this._finishEdit.bind(this, newContentState));
    };

    this._remove = () => {
      this.props.blockProps.onRemove(this.props.block.getKey());
    };
    this._startEdit = () => {
      this.props.blockProps.onStartEdit(this.props.block.getKey());
    };
    this._finishEdit = (newContentState) => {
      this.props.blockProps.onFinishEdit(
        this.props.block.getKey(),
        newContentState,
      );
    };
  }

  _getValue() {
    return this.props.contentState
      .getEntity(this.props.block.getEntityAt(0))
      .getData()['content'];
  }

  render() {
    var texContent = null;
    if (this.state.editMode) {
      if (this.state.invalidTeX) {
        texContent = '';
      } else {
        texContent = this.state.texValue;
      }
    } else {
      texContent = this._getValue();
    }

    var className = 'TeXEditor-tex';
    if (this.state.editMode) {
      className += ' TeXEditor-activeTeX';
    }

    var editPanel = null;
    if (this.state.editMode) {
      var buttonClass = 'TeXEditor-saveButton';
      if (this.state.invalidTeX) {
        buttonClass += ' TeXEditor-invalidButton';
      }

      editPanel =
        <div className="TeXEditor-panel">
          <textarea
            className="TeXEditor-texValue"
            onChange={this._onValueChangeTex}
            ref="TeX"
            value={this.state.texValue}
          />
          <textarea
            className="TeXEditor-caption"
            onChange={this._onValueChangeCaption}
            ref="caption"
            value={this.state.caption}
          />
          <div className="TeXEditor-buttons">
            <button
              className={buttonClass}
              disabled={this.state.invalidTeX}
              onClick={this._save}>
              {this.state.invalidTeX ? 'Invalid TeX' : 'Done'}
            </button>
            <button className="TeXEditor-removeButton" onClick={this._remove}>
              Remove
            </button>
          </div>
        </div>;
    }

    return (
      <div className={className}>
        <figure>
          <MathJaxOutput content={texContent} onClick={this._onClick} />
          <figcaption>{this.state.caption}</figcaption>
        </figure>
        {editPanel}
      </div>
    );
  }
}
