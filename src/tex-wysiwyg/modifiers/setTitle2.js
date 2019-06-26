import { Modifier, EditorState } from 'draft-js';

export function setTitle2(editorState) {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();

  var newContentState = null;
  if(! contentState.getBlockForKey(startKey).getInlineStyleAt(0).has('title2')) {
      newContentState = Modifier.applyInlineStyle(
      contentState,
      selection,
      'title2',
    );
  } else {
    newContentState = Modifier.removeInlineStyle(
      contentState,
      selection,
      'title2',
    );
  }
  const newEditorState = EditorState.set(
    editorState,
    {currentContent: newContentState},
  );
  return newEditorState;
}

