import { EditorState, Modifier, SelectionState } from 'draft-js';

export function removeImageBlock(editorState, blockKey) {
	var content = editorState.getCurrentContent();
	var block = content.getBlockForKey(blockKey);

	var targetRange = new SelectionState({
		anchorKey:blockKey,
		anchorOffset: 0,
		focusKey: blockKey,
		focusOffset: block.getLength(),
	});

	var contentWithoutImage = Modifier.removeRange(content, targetRange, 'backward'); // removes Image
	var resetBlock = Modifier.setBlockType(
		contentWithoutImage,
		contentWithoutImage.getSelectionAfter(),
		'unstyled',
		);

	var newState = EditorState.push(editorState, resetBlock, 'remove_range');
	return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
}