import React, { Component} from 'react';

 export default class Image extends Component {
 	constructor(props) {
 		super(props);
 		const contentState = this.props.contentState;
 		const entity = this.props.block.getEntityAt(0)
 		this.state = {
 			editMode: false,
 			src: contentState.getEntity(entity).getData()['content'],
      caption: contentState.getEntity(entity).getData()['caption'],
 		};

 		this._onClick = () => {
 			if (this.state.editMode) {
 				return;
 			}

 			this.setState({
 				editMode:true,
 			}, () => {
 				this._startEdit();
 			})
 		};

 		this._onValueChangeSrc = (evt) => {
			let value = evt.target.value;
			this.setState({src: value});
 		};
    this._onValueChangeCaption = (evt) => {
      let value = evt.target.value;
      this.setState({caption: value});
    }

    this._save = () => {
      var entityKey = this.props.block.getEntityAt(0);
      var newContentState = this.props.contentState.mergeEntityData(
        entityKey,
        {
          content: this.state.src,
          caption: this.state.caption,         
        },
      );
      this.setState({
        editMode: false,
        src: this.state.src,
      },	this._finishEdit.bind(this, newContentState));
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
  	this._getValue = () => {
    	return this.props.contentState
      	.getEntity(this.props.block.getEntityAt(0))
      	.getData()['content'];
  	};

 	}
 	render() {
 	  let src = null;
    if (this.state.editMode) {
      if (this.state.src) {
        src = '';
      } else {
        src = this.state.src;
      }
    } else {
      src = this._getValue();
    }

    let className = 'Image';
    if (this.state.editMode) {
      className += ' Image-activeTeX';
    }

    var editPanel = null;
    if (this.state.editMode) {
      var buttonClass = 'Image-saveButton';
      if (this.state.invalidTeX) {
        buttonClass += ' Imaged-invalidButton';
      }	
      editPanel =
        <div className="Image-panel">
          <textarea
            className="Image-src"
            onChange={this._onValueChangeSrc}
            ref="src"
            value={this.state.src}
          />
          <textarea
            className="image-caption"
            onChange={this._onValueChangeCaption}
            ref="caption"
            value={this.state.caption}
          />
          <div className="Image-buttons">
            <button
              className={buttonClass}
              onClick={this._save}>
              Done
            </button>
            <button className="Image-removeButton" onClick={this._remove}>
              Remove
            </button>
          </div>
        </div>;
    }

 		return(
 			<div>
        <figure>
 				 <img src={this.state.src} onClick={this._onClick} style={{maxWidth: '900px'}}/>
          <figcaption>{this.state.caption}</figcaption>
         </figure>
 				{editPanel}	
      </div>
 			);
 	}	
 }