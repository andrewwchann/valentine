import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import shin_sad from './photo/shin_sad.png';
import kiss from './photo/kiss.gif';
import happy_song from './audio/happy_song.mp3';
import angry_sound from './audio/angry.m4a'
import Confetti from 'react-confetti';
import dance from './photo/dancing_shin.gif';
import './App.css';

function App() {
  const [buttonPosition, setButtonPosition] = useState({
    top: 0,
    left: 0,
  });

  const [noButtonClicked, setNoButtonClicked] = useState(false);
  const [yesButtonClicked, setYesButtonClicked] = useState(false);

  // ref for the audio element allows for audio to be paused and rest -> no overlapping instances
  const happyref = useRef(new Audio(happy_song));
  const angryRef = useRef(new Audio(angry_sound));

  const handleYesButtonClick = () => {
    // showConfetti = true;
    setNoButtonClicked(false);
    setYesButtonClicked(true);
    playSound(true);
  };
  
  const handleNoButtonClick = () => {
    // showConfetti = false;
    setYesButtonClicked(false);
    setNoButtonClicked(true);
    playSound(false);
    const button = document.querySelector('.no_button');

    // Calculate the maximum allowable position
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    // Generate random positions within the boundaries
    let xPos = Math.random() * maxX;
    let yPos = Math.random() * maxY;

    // Ensure the button stays within the window boundaries
    if (xPos < 0) xPos = 0;
    if (yPos < 0) yPos = 0;

    setButtonPosition({
      top: yPos,
      left: xPos,
    });
  };

  useEffect(() => {
    // Set initial position after the component mounts
    const yesButton = document.querySelector('.yes_button');
    if (yesButton) {
      const yesButtonRect = yesButton.getBoundingClientRect();
      setButtonPosition({
        top: yesButtonRect.top + 25,
        left: yesButtonRect.right + 40,
      });
    }
  }, []);

  const playSound = (isYesClicked) => {
    const happy = happyref.current;
    const angry = angryRef.current;
    if (isYesClicked) {
      angry.pause();
      angry.currentTime = 0;
      happy.play();

    } else {
      happy.pause();
      happy.currentTime = 0;
      angry.play();
    }
  };

  return (
    <div className="App">
      {yesButtonClicked && <Confetti />}
      {/* <Confetti /> */}
      <header className="App-header">
        {noButtonClicked ? (
          <img src={shin_sad} className="App-logo" alt="logo" />
        ) : yesButtonClicked ? (
          <img src={kiss} className="App-logo" alt="logo" />
        ) : (
          <img src={dance} className="App-logo" alt="logo" />
        )}
        {noButtonClicked ? (
          <p className='question_text'>
            ARE YOU SERIOUS??? YOU WANNA DIE??? I TAKE AWAY ALL ICE CREAM. SAY YES OR DIE.
          </p>
        ) : yesButtonClicked ? (
          <p className='question_text'>
            pepepepe
          </p>
        ) : (
          <p className='question_text'>
            Will you be my valentine?
          </p>
        )}
        <div className='button_div'>
          <button 
            className='yes_button'
            onClick={handleYesButtonClick}>
            Yes
          </button>
          <button
            className='no_button'
            style={{
              top: buttonPosition.top,
              left: buttonPosition.left,
              transform: `translate(-50%, -50%)`, // Centering the button
            }}
            onClick={handleNoButtonClick}
          >
            No
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
