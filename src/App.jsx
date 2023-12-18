import './App.css';
import Card from './components/card';
import { useEffect, useState } from 'react';
import pokemon from 'pokemontcgsdk';
import ShuffleText from 'react-shuffle-text';

const apiKey = '67ad5049-e897-4ba3-9ab3-551d28fcb6b6';
function getRandomNumber(n) {
  return Math.round(Math.random() * n);
}
function getRandomCards(arr, n) {
  let curArr = [...arr];
  let arrOfCards = [];
  for (let i = 0; i < n; i++) {
    let index = getRandomNumber(curArr.length - 1);
    arrOfCards.push(curArr[index]);
    curArr.splice(index, 1);
  }
  return arrOfCards;
}
function App() {
  const [cardInfo, setCardInfo] = useState([]);
  const [playedCards, setPlayedCards] = useState([]);
  const [gameLost, setGameLost] = useState(false);
  const [restartGame, setRestartGame] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  let cardsForDisplay;

  const handleOnClick = (name) => {
    if (playedCards.includes(name)) {
      setGameLost(true);
    } else if (playedCards.length >= 4) {
      setGameWin(true);
    } else {
      setPlayedCards((prevPlayedCards) => [...prevPlayedCards, name]);
    }
    playedCards.includes(name)
  };

  useEffect(() => {
    setRestartGame(false);
    setGameLost(false);
    pokemon.configure({ apiKey: apiKey });
    pokemon.card
      .where({ pageSize: 7, page: getRandomNumber(500) })
      .then((results) => {
        const newCardInfo = results.data.map((result) => ({
          name: result.name,
          image: result.images.large,
        }));
        setCardInfo(newCardInfo);
      });
  }, [restartGame]);

  cardsForDisplay = getRandomCards(cardInfo, 5);

  if (gameLost) {
    return (
      <div>
        <h2> You Lost The Game, Your Score Was - {playedCards.length} </h2>
        <button
          onClick={() => {
            setPlayedCards([]);
            setGameLost(false);
            setRestartGame(true);
          }}
        >
          {' '}
          start new game{' '}
        </button>
      </div>
    );
  } else if (gameWin) {
    return (
      <div>
        <h2>congragulations! You Have Won</h2>
        <button
          onClick={() => {
            setPlayedCards([]);
            setGameWin(false);
            setRestartGame(true);
          }}
        >
          {' '}
          Start New Game{' '}
        </button>
      </div>
    );
  }

  if (cardInfo.length === 0) {
    return <div> loading ... </div>;
  }
  return (
    <>
      {playedCards.length < 1 ? (
        <h2>
          <ShuffleText content='Test You Memory And Do Not Click On The Same Card Twice'></ShuffleText>
        </h2>
      ) : (
        <h2>Current Score: {playedCards.length} {'/'} {cardsForDisplay.length}</h2>
      )}
      <div className='cardWrapper'>
        {cardsForDisplay &&
          cardsForDisplay.map((card, index) => {
            return (
              <Card
                key={index}
                imageUrl={card.image}
                name={card.name}
                handleOnClick={handleOnClick}
              ></Card>
            );
          })}
      </div>
    </>
  );
}

export default App;
