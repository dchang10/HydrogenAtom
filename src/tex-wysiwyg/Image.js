import React, { Component} from 'react';

 export default class Image extends Component {
 	constructor(props) {
 		super(props);
 		let contentState = this.props.contentState;
 		let entity = this.props.block.getEntityAt(0)
    let data =  contentState.getEntity(entity).getData();
 		this.state = {
 			editMode: false,
 			src: data['content'],
      caption: data['caption'],
      width: data['width'],
      height: data['height'],
      keepAspectRatio: data['keepAspectRatio']
 		};

 		this._onDoubleClick = () => {
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
    this._onValueChangeWidth = (evt) => {
      let value = evt.target.value;
      this.setState({width: value});
    }
    this._onValueChangeHeight = (evt) => {
      let value = evt.target.value;
      this.setState({height: value});
    }
    this._onAspectRatioChange = () => {
      if ( this.refs.aspectRatio.checked === true ){
        this.setState({keepAspectRatio: true});
      } else {
        this.setState({keepAspectRatio: false});
      }
    }

    this._save = () => {
      var entityKey = this.props.block.getEntityAt(0);
      var newContentState = this.props.contentState.mergeEntityData(
        entityKey,
        {
          content: this.state.src,
          caption: this.state.caption,         
          width: this.state.width,
          height: this.state.height,
          keepAspectRation: this.state.keepAspectRatio,
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
    var editPanel = null;
    if (this.state.editMode && !this.props.blockProps.readOnly) {
      var buttonClass = 'Image-saveButton';
      if (this.state.invalidTeX) {
        buttonClass += ' Imaged-invalidButton';
      }	
      editPanel =
      <div>
        <table className="Image-panel" align='center' style={{boxShadow: "0.5em 1em 1em 0 rgba(0, 0, 0, 0.5)", backgroundColor:'rgb(33, 37, 41)', width:'30em', height:'10em'}}>
          <thead>
            <tr>
              <td colSpan="2"><span style={{color:'white'}}>Keep Aspect Ratio?</span></td>
            </tr>
            <tr>
                <td colSpan="2">
                <input 
                  ref="aspectRatio" 
                  type="checkbox" 
                  name="aspectRatio" 
                  onChange={this._onAspectRatioChange}
                  checked={this.state.keepAspectRatio}
                  /></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={{color:'white'}}>Width</th>
              <th style={{color:'white'}}>Height</th>
            </tr>
            <tr>
              <th>
                <input 
                  onChange={this._onValueChangeWidth}
                  ref="width"
                  value={this.state.width}
                />
              </th>
              <th>
                <input 
                  onChange={this._onValueChangeHeight}
                  ref="height"
                  value={this.state.height}
                />
              </th>
            </tr>
            <tr>
              <th style={{color:'white'}}>Source</th>
              <th style={{color:'white'}}>Caption</th>
            </tr>
            <tr>
              <th>
                <input
                  className="Image-src"
                  onChange={this._onValueChangeSrc}
                  ref="src"
                  value={this.state.src}
                />
              </th>
              <th>
                <input
                  className="image-caption"
                  onChange={this._onValueChangeCaption}
                  ref="caption"
                  value={this.state.caption}
                />
              </th>
            </tr>
          </tbody>
          <tfoot className="Image-buttons"style={{textAlign:'center'}}>
            <tr>
              <td colSpan="2">
                <button
                  style={{borderLeft:'none', borderBottom:'none', backgroundColor:'rgb(33, 37, 41)', color:'white', width:'50%'}}
                  className={buttonClass}
                  onClick={this._save}>
                  Done
                </button>
                <button 
                  style={{borderRight:'none', borderBottom:'none', backgroundColor:'rgb(33, 37, 41)', color:'white', width:'50%'}}
                  className="Image-removeButton" 
                  onClick={this._remove}>
                  Remove
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    }

    let width = this.state.width + (this.state.keepAspectRatio?"%":"em");
    let height = this.state.height + (this.state.keepAspectRatio?"%":"em");
 		return(
 			<div style={{maxWidth: '900px'}}>
        <figure style={{border:this.state.border}}>
 				 <img 
          src={this.state.src}
          onDoubleClick={this._onDoubleClick} 
          style={{
            width:width, 
            height:height,
          }}
          alt={this.state.caption}
        />
          <figcaption>{this.state.caption}</figcaption>
         </figure>
 				{editPanel}	
      </div>
 			);
 	}	
 }