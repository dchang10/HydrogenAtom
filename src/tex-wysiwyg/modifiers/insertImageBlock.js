import { AtomicBlockUtils, EditorState } from 'draft-js';
import logo from '../logo.svg';

export function insertImageBlock(editorState) {
  const contentState = editorState
  	.getCurrentContent()
  	.createEntity(
    	'PHOTO',
	    'IMMUTABLE',
	    {content: logo, type: 'Image', caption:'caption'},
  );
  const entityKey = contentState.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState,
    {currentContent: contentState},
  );
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}
