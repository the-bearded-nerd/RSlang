import React from 'react';
import Words from '../../../utils/Words/Words';

import { CurrentWords, PropsWords } from '../../interface/interfaces';
import WordInfo from '../WordInfo/WordsInfo';

function WordsTextBook({
  hard,
  numberPage,
  setPaginationDisabled,
  isPaginationDisabled,
}: PropsWords) {
  const [currentWords, setWords] = React.useState<CurrentWords[]>([]);

  const [currentDisabled, setDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    Words.getWords(hard, numberPage)
      .then((res) => res)
      .then((data) =>
        setTimeout(() => {
          setWords(data);
          setPaginationDisabled(false);
        }, 500)
      );
  }, [hard, numberPage]);

  return (
    <>
      {currentWords.map((e) => (
        <WordInfo
          key={e.id}
          objectWord={e}
          currentDisabled={currentDisabled}
          setDisabled={setDisabled}
          isPaginationDisabled={isPaginationDisabled}
        />
      ))}
    </>
  );
}

export default WordsTextBook;
