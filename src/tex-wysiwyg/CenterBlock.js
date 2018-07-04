import { Entity, CharacterMetadata, genKey, ContentBlock, EditorLeaf } from 'draft-js';
import { List, Repeat } from 'immutable';
import React from 'react';

export default function CenterBlock (props) {
  return (
      <EditorLeaf {...this.props}/>
  );
}

export const contentBlocksArray = ['foo', 'bar', 'baz'].map(word => {
  return new ContentBlock({
    key: genKey(),
    type: 'center',
    characterList: new List(Repeat(CharacterMetadata.create(), word.length)),
    text: word,
    entity: Entity.create(      
    'LINK',
    'IMMUTABLE',
    {content: 'Insert TeX', type: 'TeX'},
  ) 
  });
});