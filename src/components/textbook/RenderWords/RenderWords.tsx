import React from 'react';
import Words from '../../../utils/Words/Words';

import { CurrentWords, PropsWords } from '../../interface/interfaces';
import WordInfo from '../WordInfo/WordsInfo';

function WordsTextBook({ hard, numberPage }: PropsWords) {
  const [currentWords, setWords] = React.useState<CurrentWords[]>([]);
  const [currentDisabled, setDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    Words.getWords(hard, numberPage)
      .then((res) => res)
      .then((data) => setWords(data));
  }, [hard, numberPage]);
  return (
    <>
      {currentWords.map((e) => (
        <WordInfo
          key={e.id}
          objectWord={e}
          currentDisabled={currentDisabled}
          setDisabled={setDisabled}
        />
      ))}
    </>
  );
}

export default WordsTextBook;
