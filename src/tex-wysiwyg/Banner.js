import React, { Component } from 'react';

export default class Banner extends Component {
   constructor(props) {
      super(props);
      let image = this.props.featured_image;
      this.state = {
         source: image.source,
         backgroundColor: image.backgroundColor,
         backgroundRepeat: image.backgroundRepeat,
         showPanel: false,
         horizontal: image.horizontal,
         vertical: image.vertical,
         width: image.width,
         height: image.height,
      };

      this.showPanel = this.state.showPanel;
      this.open = () => {
         this.setState({ showPanel: true });
         this.props.open();
      }
      this.close = () => {
         this.setState({ showPanel: false });
         this.props.close(this.state);
      }
   }


   render() {
      let editPanel = null
      if (this.state.showPanel && !this.props.readOnly) {
         editPanel =
            <div style={{ textAlign: 'center', zIndex:'2', display:'block' }}>
               <table className="Image-panel" align='center' style={{ boxShadow: "0.5em 1em 1em 0 rgba(0, 0, 0, 0.5)", backgroundColor: 'rgb(33, 37, 41)', width: '30em', height: '10em' }}>
                  <thead>
                     <tr>
                        <td colSpan="2"><span style={{ color: 'white' }}>Repeat Image?</span></td>
                     </tr>
                     <tr>
                        <td colSpan="2">
                           <input
                              ref="Repeat"
                              type="checkbox"
                              name="repeat"
                              onChange={(evt) => {
                                 let val = evt.target.checked;
                                 console.log(val)
                                 this.setState({ backgroundRepeat: val ? 'repeat' : 'no-repeat', checked: val });
                              }}
                              checked={this.state.backgroundRepeat === 'repeat'}
                           />
                        </td>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <th style={{ color: 'white' }}>Horizontal Position</th>
                        <th style={{ color: 'white' }}>Vertical Position</th>
                     </tr>
                     <tr>
                        <th>
                           <input
                              onChange={(evt) => { this.setState({ horizontal: evt.target.value }) }}
                              ref="HorizontalPosition"
                              value={this.state.horizontal}
                           />
                        </th>
                        <th>
                           <input
                              onChange={(evt) => { this.setState({ vertical: evt.target.value }) }}
                              ref="VerticalPosition"
                              value={this.state.vertical}
                           />
                        </th>
                     </tr>
                     <tr>
                        <th style={{ color: 'white' }}>Width</th>
                        <th style={{ color: 'white' }}>Height</th>
                     </tr>
                     <tr>
                        <th>
                           <input
                              onChange={(evt) => { this.setState({ width: evt.target.value }) }}
                              ref="backgrondwidth"
                              value={this.state.width}
                           />
                        </th>
                        <th>
                           <input
                              onChange={(evt) => { this.setState({ height: evt.target.value }) }}
                              ref="backgroundheight"
                              value={this.state.height}
                           />
                        </th>
                     </tr>
                     <tr>
                        <td colSpan="2"style={{ color: 'white' }}>Background Colour</td>
                     </tr>
                     <tr>
                        <td colSpan="2">
                           <input
                              onChange={(evt) => { this.setState({ backgroundColor: evt.target.value }) }}
                              ref="backgrondColor"
                              value={this.state.backgroundColor}
                           />

                        </td>
                     </tr>
                     <tr>
                        <td colSpan="2"><span style={{color:'white'}}>Source</span></td>
                     </tr>
                     <tr>
                        <td colSpan="2">
                           <input
                              style={{width:'90%'}}
                              onChange={(evt) => { this.setState({source: evt.target.value}) }}
                              ref="source"
                              value={this.state.source}
                           />
                        </td>
                     </tr>
                  </tbody>
                  <tfoot>
                     <tr>
                        <td colSpan="2"><button style={{ margin: '2em' }} onClick={() => { this.close() }}>Save Banner</button></td>
                     </tr>
                  </tfoot>
               </table>
            </div>
      }
      return (
         <div>
            <div onClick={() => this.open()}
               style={{
                  height: '30em',
                  backgroundImage: `url(${this.state.source})`,
                  backgroundColor: this.state.backgroundColor,
                  backgroundRepeat: this.state.backgroundRepeat,
                  backgroundPosition: this.state.horizontal + '% ' + this.state.vertical + '%',
                  backgroundSize: this.state.width + 'em ' + this.state.height + 'em',
                  margin: 'auto',
                  marginTop: '5em',
                  marginBottom: '7em',
                  width: '30em',
                  borderRadius: '50%',
               }}
            />
            {editPanel}
         </div>
      )
   }
}