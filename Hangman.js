 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
    <script type="text/javascript">
      let word = "";
      let guessedLetters = [];
      let livesLeft = 6;
      const displayText = document.getElementById("displayText");
      var c = document.getElementById("myCanvas");
      var draw = c.getContext("2d");

      function drawGallow() {
        draw.fillRect(130, 290, 250, 2);
        draw.fillRect(230, 40, 2, 250);
        draw.fillRect(230, 40, 100, 2);
        draw.fillRect(330, 40, 2, 40);
        draw.beginPath();
      }

      function getWord() {
        word = document.getElementById("Word").value.toUpperCase();
      }

      function createCensoredWord() {
        let censoredText = document.getElementById("censoredWord");
        for (let i = 0; i < word.length; ++i) {
           let char = document.createElement("span");
           char.className = "badge text-bg-primary";
           char.id = i;
           char.innerHTML = "_";
           censoredText.appendChild(char);
        }
      }

      function updateCensoredWord(letter) {
        let letterIndex = word.indexOf(letter, -1);
        while (word.indexOf(letter, letterIndex) > -1) {
            let char = document.getElementById(letterIndex);
            char.innerHTML = letter;
            letterIndex = word.indexOf(letter, letterIndex + 1);
        }
      }

      function updateHangman() {
          // Draws:
          if (livesLeft == 5) {
              draw.arc(330, 100, 20, 0, 2 * Math.PI);
          } else if (livesLeft == 4) { 
              draw.moveTo(330, 120);
              draw.lineTo(330, 210);
          } else if (livesLeft == 3) {
              draw.moveTo(330, 130);
              draw.lineTo(300, 170);
          } else if (livesLeft == 2) {
              draw.moveTo(330, 130);
              draw.lineTo(362, 170);
          } else if (livesLeft == 1) {
              draw.moveTo(330, 210);
              draw.lineTo(300, 250);
          } else if (livesLeft == 0) {
              draw.moveTo(330, 210);
              draw.lineTo(362, 250);
          }
          draw.stroke();
      }

      function checkLetter() {
        let letter = document.getElementById("lettInput").value.toUpperCase();
        if (guessedLetters.indexOf(letter) > -1) {
            displayText.innerHTML = letter + " has already been guessed";
        } else if (word.indexOf(letter) > -1) {
            guessedLetters.push(letter);
            updateGuessedLettersList(letter);
            checkGameStatus();
            updateCensoredWord(letter);
        } else {
            guessedLetters.push(letter);
            updateGuessedLettersList(letter);
            --livesLeft;
            updateHangman();
            checkGameStatus();
        }
      }

      function updateGuessedLettersList(letter) {
          let guessedLettersList = document.getElementById("guessedLetters");
          guessedLettersList.innerHTML += letter + ", ";
      }

      function checkGameStatus() {
          if (livesLeft == 0) {
            document.getElementById("list").innerHTML += `
            <div class="card text-bg-danger mb-3">
              <div class="card-body">
              <h5 class="card-title">OH NO!</h5>
              </div>
            </div>`;
              return true;
          }
          for (let i = 0; i < word.length; ++i) {
              if (guessedLetters.indexOf(word[i]) < 0) {
                  return false;
              }
          }
          document.getElementById("list").innerHTML += `
          <div class="card text-bg-success mb-3"">
            <div class="card-body">
              <h5 class="card-title">WINNER!</h5>
            </div>
          </div>`;
          return true;
      }

      function startGame() {
        drawGallow ();
        getWord();
        createCensoredWord();
        document.getElementById("lettInput").maxLength = "1";
        document.getElementById("lettInput").minLength = "1";
        document.getElementById("letters").innerHTML = "Check";
        document.getElementById("guess").hidden = false;
      }

      function restartGame() {
         location.reload();
      }
    </script>
