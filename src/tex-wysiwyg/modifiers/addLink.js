import { AtomicBlockUtils, EditorState } from 'draft-js';

export function addLink(editorState) {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey(); 
  const contentStateWithLink = contentState.createEntity(
    'LINK',
	  'MUTABLE',
	   {url: 'Centered'},
  );
  const entityKey = contentState.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState,
    {currentContent: contentState},
  );
  return newEditorState;
}
