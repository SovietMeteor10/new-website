import React, { useEffect, useState } from "react";
import './home.css';
import Frame from './Frame.js';
import ReactDOM from "react-dom";

function App2() {
  const [grid, setGrid] = useState([]);
  const [welcomeClicked, setWelcomeClicked] = useState(false);
  const [wordClicked, setWordClicked] = useState(null);
  const elementWidth = 8;
  const elementSpacing = 8;
  const leftMargin = 50;
  const rightMargin = 50;
  const topMargin = 100;
  const bottomMargin = 100;
  const [rowToClear, setRowToClear] = useState(-1); // Define rowToClear and setRowToClear

  useEffect(() => {
    const calculateGridDimensions = () => {
      const availableWidth = window.innerWidth - leftMargin - rightMargin;
      const availableHeight = window.innerHeight - topMargin - bottomMargin;
      const columns = Math.floor(availableWidth / (elementWidth + 2 * elementSpacing));
      const rows = Math.floor(availableHeight / (elementWidth + 2 * elementSpacing));

      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charactersLength = characters.length;
      const newGrid = [];

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          const randomChar = characters.charAt(Math.floor(Math.random() * charactersLength));
          row.push(randomChar);
        }
        newGrid.push(row);
      }

      if (welcomeClicked) {
        // Place the words on the grid with proper constraints
        const randomizeWord = (word, randomRow, randomColumn) => {
          const wordLength = word.length;
          for (let i = 0; i < wordLength; i++) {
            newGrid[randomRow][randomColumn + i] = (
              <span key={i} className={`welcome-text ${word.toLowerCase()}`}>
                {word[i]}
              </span>
            );
          }
        };

        // Calculate the thirds of the grid
        const topThird = Math.floor(rows / 3);
        const middleThird = Math.floor(rows / 3) * 2;

        randomizeWord('ABOUT', Math.floor(Math.random() * topThird), Math.floor(Math.random() * (columns - 4)));
        randomizeWord('EXPERIENCE', topThird + Math.floor(Math.random() * (middleThird - topThird)), Math.floor(Math.random() * (columns - 10)));
        randomizeWord('CONTACT', middleThird + Math.floor(Math.random() * (rows - middleThird - 2)), Math.floor(Math.random() * (columns - 6)));
      } else {
        const randomizeWord = (word, randomRow, randomColumn) => {
          const wordLength = word.length;
          for (let i = 0; i < wordLength; i++) {
            newGrid[randomRow][randomColumn + i] = (
              <span key={i} className={`welcome-text ${word.toLowerCase()}`} >
                {word[i]}
              </span>
            );
          }
        };

        // Allow "WELCOME" to be placed randomly anywhere on the grid with restrictions
        let welcomeRandomRow;
        let welcomeRandomColumn;
        do {
          welcomeRandomRow = Math.floor(Math.random() * rows);
          welcomeRandomColumn = Math.floor(Math.random() * columns);
        } while (welcomeRandomColumn < 1 || welcomeRandomColumn > columns - 12);

        randomizeWord('->WELCOME<-', welcomeRandomRow, welcomeRandomColumn);
      }

      setGrid(newGrid);
    };

    calculateGridDimensions();

    window.addEventListener('resize', calculateGridDimensions);

    return () => {
      window.removeEventListener('resize', calculateGridDimensions);
    };
  }, [welcomeClicked, leftMargin, rightMargin, topMargin, bottomMargin, elementWidth, elementSpacing]);

  const handleGridElementClick = (rowIndex, columnIndex) => {
    // Local variable to track the click event status
    let isClicking = false;
  
    // Function to reset the click event status
    const resetClickStatus = () => {
      isClicking = false;
    };
  
    if (isClicking) {
      // If a click event is already in progress, do nothing.
      return;
    }
  
    // Set isClicking to true to indicate that a click event is in progress.
    isClicking = true;
  
    // You can also use setTimeout to reset isClicking after a certain delay, just like before.
    setTimeout(resetClickStatus, 3000); // You can adjust the delay time as needed.
  
    const currentGrid = [...grid];
    if (currentGrid[rowIndex][columnIndex].props && currentGrid[rowIndex][columnIndex].props.className.includes('welcome-text ->welcome<-')) {
      setWelcomeClicked(true);
    } else if (currentGrid[rowIndex][columnIndex].props && currentGrid[rowIndex][columnIndex].props.className.includes('welcome-text')) {
      const clickedWord = currentGrid[rowIndex][columnIndex].props.className.split(' ').filter(c => c !== 'welcome-text')[0];
      if (clickedWord === 'about' || clickedWord === 'experience' || clickedWord === 'contact') {
        setWordClicked(clickedWord);
        setRowToClear(0);
      }
    }
  };

  const handleHover = (rowIndex, columnIndex) => {
    if (grid[rowIndex][columnIndex].props) {
      return;
    }

    const newChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const newGrid = [...grid];
    newGrid[rowIndex][columnIndex] = newChar;
    setGrid(newGrid);
  };

  useEffect(() => {
    if (wordClicked) {
      const clearRow = () => {
        setGrid(prevGrid => {
          if (rowToClear >= prevGrid.length) {
            if (rowToClear === prevGrid.length) {
              // Render the Frame component with the selected component
              ReactDOM.render(
                <Frame selectedComponent={wordClicked} />,
                document.getElementById('root')
              );
            }

            setRowToClear(-1);
            setWordClicked(null);
            return prevGrid;
          }

          const newGrid = prevGrid.map((row, index) => {
            if (index === rowToClear) {
              return row.map(() => '');
            }
            return row;
          });
          return newGrid;
        });

        setRowToClear(prevRow => prevRow + 1);

        if (rowToClear < grid.length) {
          setTimeout(clearRow, 1000);
        }
      };

      clearRow();
    }
  }, [wordClicked, rowToClear, grid]);

  return (
    <div className="page-borders">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((element, columnIndex) => (
              <div
                key={columnIndex}
                className="grid-element"
                onClick={() => handleGridElementClick(rowIndex, columnIndex)}
                onMouseEnter={() => handleHover(rowIndex, columnIndex)}
              >
                {element}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App2;