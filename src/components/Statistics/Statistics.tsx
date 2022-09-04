import React, { useEffect, useState } from 'react';
import Statistic from '../../utils/Statistic/Statistic';
import Users from '../../utils/Users/User';
import GameStatistics from '../GameStatistics/GameStatistics';
import User from '../User/User';

function Statistics() {
  const currentDate = Statistic.getDate();
  const [stat, setStat] = useState({
    learnedWords: 0,
    optional: {
      gameStatistics: {
        audio: {
          right: 0,
          wrong: 0,
          learnedWords: 0,
          lastChanged: '-',
          longestSeries: 0,
        },
        sprint: {
          right: 0,
          wrong: 0,
          learnedWords: 0,
          lastChanged: '-',
          longestSeries: 0,
        },
      },
      wordStatistics: {
        [currentDate]: 0,
      },
    },
  });
  const [learnedWords, setLearnedWords] = useState(0);
  const [wordStatistics, setWordStatistics] = useState({ [Statistic.getDate()]: 0 });

  const [audioStat, setAudioStat] = useState({
    right: 0,
    wrong: 0,
    learnedWords: 0,
    lastChanged: '-',
    longestSeries: 0,
  });

  const [sprintStat, setSprintStat] = useState({
    right: 0,
    wrong: 0,
    learnedWords: 0,
    lastChanged: '-',
    longestSeries: 0,
  });

  const [learnedToday, setLearnedToday] = useState(0);

  useEffect(() => {
    if (!Users.isAuthorized()) return;
    Statistic.getStatistic().then((data) => {
      setStat(data);
    });
  }, []);

  useEffect(() => {
    if (!Users.isAuthorized()) return;
    setLearnedWords(stat.learnedWords);
    setWordStatistics(stat.optional.wordStatistics);
    if (stat.optional.wordStatistics[currentDate])
      setLearnedToday(stat.optional.wordStatistics[currentDate]);
    if (stat.optional.gameStatistics.audio.lastChanged === currentDate) {
      setAudioStat(stat.optional.gameStatistics.audio);
    }
    if (stat.optional.gameStatistics.sprint.lastChanged === currentDate) {
      setSprintStat(stat.optional.gameStatistics.sprint);
    }
  }, [stat]);

  return (
    <div>
      <h3>я статистика!</h3>
      <p>всего выучено слов: {learnedWords}</p>
      <p>Сегодня изучено слов: {learnedToday}</p>

      <GameStatistics
        gameName="Аудиовызов"
        learnedWords={audioStat.learnedWords}
        right={audioStat.right}
        wrong={audioStat.wrong}
        longestSeries={audioStat.longestSeries}
      />
      <GameStatistics
        gameName="Спринт"
        learnedWords={sprintStat.learnedWords}
        right={sprintStat.right}
        wrong={sprintStat.wrong}
        longestSeries={sprintStat.longestSeries}
      />
    </div>
  );
}

export default Statistics;
