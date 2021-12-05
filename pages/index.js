import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";
import Card from "./card";
import PreScreen from './prescreen'


const uniqueElementsArray = [
  {
    type: "Pikachu",
    image: require(`../public/images/Pickachu.png`)
  },
  {
    type: "ButterFree",
    image: require(`../public/images/ButterFree.png`)
  },
  {
    type: "Charmander",
    image: require(`../public/images/Charmander.png`)
  },
  {
    type: "Squirtle",
    image: require(`../public/images/Squirtle.png`)
  },
  {
    type: "Pidgetto",
    image: require(`../public/images/Pidgetto.png`)
  },
  {
    type: "Bulbasaur",
    image: require(`../public/images/Bulbasaur.png`)
  }
];

// function shuffleCards(array) {
//   const length = array.length;
//   for (let i = length; i > 0; i--) {
//     const randomIndex = Math.floor(Math.random() * i);
//     const currentIndex = i - 1;
//     const temp = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temp;
//   }
//   return array;
// }

// const newArray = shuffleCards(uniqueElementsArray.concat(uniqueElementsArray))




export default function App() {
  // const [cards, setCards] = useState(
  //   shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
  // );
  const [cards, setCards] = useState(uniqueElementsArray.concat(uniqueElementsArray));
  const [randomNumber, setRandomNumber ] = useState(Array.from({length: 40}, () => Math.floor(Math.random() * 40)))
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    null || Number.POSITIVE_INFINITY
  );
  const [showBackgroundVideo, setShowBackgroundVideo] = useState(false);

  console.log(randomNumber)

  // JSON.parse(localStorage.getItem("bestScore"))

  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };



  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      // localStorage.setItem("bestScore", highScore);
    }
  };
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setRandomNumber(Array.from({length: 40}, () => Math.floor(Math.random() * 40)))
  };

  useEffect(() => {
    setTimeout(() => {
      setShowBackgroundVideo(true)
    }, 6000);
  }, [showBackgroundVideo])


  return (
    <div className="App">
      <header>
        <div>
          Select two cards with same content consequtively to make them vanish
        </div>
        <div className="video-container">
				<iframe className={`${showBackgroundVideo ? "show-background-video" : null}`} src="https://www.youtube.com/embed/6N7VKiDe18M?autoplay=1&mute=1" frameBorder="0"  allowFullScreen></iframe>
			  </div>	

      <style jsx>
        {`
        .video-container iframe{
          position: fixed;
          right: 0;
          bottom: 0;
          min-width: 100vw;
          min-height: 100vh;
          height: 100vh;
          transition: opacity 1s;
          opacity:0;
        }
        .video-container * {
          pointer-events: none;
        }
        
        .show-background-video{
          opacity: 1 !important;
        }
        `}
      </style>
      </header>
      <PreScreen />
      <div className="container">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
              randomOrder={{order: randomNumber[index]}}
            />
          );
        })}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Movimientos:</span> {moves}
          </div>
          {/* {localStorage.getItem("bestScore") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScore}
            </div>
          )} */}
        </div>
        <div className="restart">
          <Button onClick={handleRestart} color="primary" variant="contained">
            Volver a empezar
          </Button>
        </div>
      </footer>
      <Dialog
        open={showModal}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
              onClose(event, reason)
          }
        }}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Felicidades canijo!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Haz completado el juego en {moves} movimientos.
            {' '}
            Desafía a un colega a que te supere.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Reintentar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
