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
    let index = getRandomNumber(curArr.length-1);
    arrOfCards.push(curArr[index]);
    curArr.splice(index, 1);
  }
  return arrOfCards;
}
function App() {
  // let cardInfo = [];
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
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
  let cardsForDisplay = getRandomCards(cardInfo, 5);
  if (cardInfo.length === 0) {
    return <div> loading ... </div>;
  }
  return (
    <>
      {console.log(cardsForDisplay, 11111)}
      {/* <Card imageUrl={cardsForDisplay[0].image}></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card> */}
      {cardsForDisplay &&
        cardsForDisplay.map((card, index) => {
          return <Card key={index} imageUrl={card.image}></Card>;
        })}
    </>
  );
}

export default App;
