import React from 'react';
import Words from '../../utils/Words/Words';

import { CurrentWords, PropsWords } from '../interface/interfaces';
import WordInfo from './WordsInfo';

function RenderWords({ hard, numberPage }: PropsWords) {
  const [currentWords, setWords] = React.useState<CurrentWords[]>([]);
  React.useEffect(() => {
    Words.getWords(hard, numberPage)
      .then((res) => res)
      .then((data) => setWords(data));
  }, [hard, numberPage]);
  return (
    <>
      {currentWords.map((e) => (
        <WordInfo key={e.id} objectWord={e} />
      ))}
    </>
  );
}

export default RenderWords;
