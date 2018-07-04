import { AtomicBlockUtils, EditorState } from 'draft-js';

export function insertTeXBlock(editorState) {
  const contentState = editorState
  	.getCurrentContent()
  	.createEntity(
    	'TOKEN',
	    'IMMUTABLE',
	    {content: 'Insert TeX', type: 'TeX', caption:'caption'},
  );
  const entityKey = contentState.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState,
    {currentContent: contentState},
  );
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}
