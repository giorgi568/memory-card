import './App.css';
import Card from './components/card';
import { useEffect, useState } from 'react';
import pokemon from 'pokemontcgsdk';

const apiKey = '67ad5049-e897-4ba3-9ab3-551d28fcb6b6';
function getRandomNumber(n) {
  return Math.round(Math.random() * n);
}
function getRandomCards(arr, n) {
  console.log(arr, 555);
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
  let cardsForDisplay;

  const handleOnClick = (name) => {
    if (playedCards.includes(name)) {
      setGameLost(true);
    } else {
      setPlayedCards((prevPlayedCards) => [...prevPlayedCards, name]);
    }
  };

  useEffect(() => {
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
  }, []);

  cardsForDisplay = getRandomCards(cardInfo, 5);

  if (gameLost) {
    return (
      <div>
        <div> You Lost The Game, your score was - {playedCards.length} </div>
        <button> start new game </button>
      </div>
    );
  }

  if (cardInfo.length === 0) {
    return <div> loading ... </div>;
  }
  return (
    <>
      {/* {console.log(playedCards, 999)} */}
      <div>{playedCards.length}</div>
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
    </>
  );
}

export default App;
