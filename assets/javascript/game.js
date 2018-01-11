
//PSEUDOCODE

/*Here's how the app works:

   * There will be four crystals displayed as buttons on the page.

   These buttons will be represented by buttons in my HTML document.

   These will have their own ID and their and class that will link to
   bootstrap buttons.
    I'm thinking of looking for something that looks like a crystal from the
    CSS bootstrap website if I can find it

   These buttons will all be in the same div

   In the javascript, I have to run a function that does a set of steps:
    for each of the buttons, I want a random number to be generated and 
    assigned to each button.

    After each random number is generated and stored, I want to make sure 
    these can be used as integers, and added together.

    After this, I want to add this value to an HTML element in a row after
    the row with all the crystals.

    When this number is added, I want to make sure it's compared to a random
    number generated at the beginning of the game, that the user gets.


   * The player will be shown a random number at the start of the game.

   This will be a simple Math.random() function that will be stored in a 
   scope higher than the function calling the random number for the crystals

   This number will be between 19-120


   * When the player clicks on a crystal, it will add a specific amount of 
   points to the player's total score. 

     * Your game will hide this amount until the player clicks a crystal.
     * When they do click one, update the player's score counter.

      I will do this to see if it works but I would personally not update the
      score counter until getting the final result, which is when the user 
      knows if that returned value makes them winners or losers

      what I mean is that for the user it makes no difference if their score 
      is updated (it doesn't help me as a user to know the scores until these
      are added)

   * The player wins if their total score matches the random number from the
    beginning of the game.

      I will have an if statement that tests whether the sum of the random
      numbers (one per button) equals the random chosen number at the 
      beginning of the game
        If so, then I will assign a value to a html element and insert that
        content to the div that contains it (this will be the function that 
        keeps the score as the user plays and wins/loses)
        If not, then the same will happen but for losses

   * The player loses if their score goes above the random number.
      The steps are expressed above.
      However, this is a bit confusing since I have to press all those buttons
      to get the addition, so I would think that the player would lose if the 
      numbers do not match regardless of whether the sum of randoms is above 
      or below the random chosen number at the beginning. 


   * The game restarts whenever the player wins or loses.
      pretty self-explanatory

     * When the game begins again, the player should see a new random number. 
     Also, all the crystals will have four new hidden values. Of course, the 
     user's score (and score counter) will reset to zero.

        I have to be good about how I nest functions and create scopes through
        this entire process

   * The app should show the number of games the player wins and loses. 
   To that end, do not refresh the page as a means to restart the game.*/
      
//code starts here

//CRUCIAL STEP: ENGLOBAR DOCUMENTO EN DOCUMENT.READY(FUNCTION() {})
$(document).ready(function() {

  // make some variables global to the runtime of the application
  let gameSum; 
  let compNumber;
  let userNumber;
  let wins;
  let losses;

  //declare an array that contains each crystal
  const crystalList = [
    $("#firstCrystal"),
    $("#secondCrystal"),
    $("#thirdCrystal"),
    $("#fourthCrystal"),
  ];

    wins = 0;
    losses = 0;
  // we use a function to initialize crystalCollectors to guarantee that the app will reset

  function initializeCrystalCollectors() {
    gameSum = 0;
    compNumber = "";
    userNumber = [];
    
    // let's first empty some divs with the jQuery .empty() method
    $("#compNumber, #sum").empty();

    // we start with a function that creates a random number between 19 and 120 for the computer
    function randomizeComputer(min, max) {
      // a random number is assigned to compNumber
      compNumber = Math.floor(Math.random() * (max - min) + min);

      //we select the div with a matching name
      let computerNumber = $("#compNumber");

      //we create a div and add compNumber as html content to it
      let newGameDiv = $("<div>");
      newGameDiv.html("<p>" + compNumber + "</p>");
      // append this new div gameContainer
      computerNumber.append(newGameDiv); 
    }

    // we invoke randomizeComputer
    randomizeComputer(19, 120);

    // we now follow with a function that creates a random number between 1-12 assigned to the crystals
    
    function randomizeCrystal() {
      // for every item in crystalList...
      for (let i = 0; i < crystalList.length; i++) {
        // pass the following function
        function randomNumberUser(min, max,randomNumber) {
            // when this function runs, a randomNumber between 1-12 is generated
            randomNumber = Math.floor(Math.random() * (max - min) + min);
            // we push randomNumber into userNumber
            userNumber.push(randomNumber);
        }
        // we invoke the above function for every item...
        randomNumberUser(1,12);  
        // we the value of each userNumber to their respective crystal.
        crystalList[i].val(userNumber[i]);  
        }
      }
    
    // and we invoke randomizeCrystal!
    randomizeCrystal();

  }

  // let's show the player his/her score
    // we select relevant divs where scores will live
    let userWins = $("#wins");
    let userLosses = $("#losses");
    
    // select the class to operate on both divs at once
    let userScore = $(".score");
    
    // next we create an on-click function for when the user clicks on the crystals
    
    // when the crystals are clicked...
    $(".crystal").on("click", function() {

      // gameSum will equal itself plus the crystal's integer value
      gameSum = gameSum + Number($(this).val());
        
      // gameSum is added to #sum with the .text method  
      $("#sum").text(gameSum);

      // after showing the gameSum to the player we check on the conditions to determine wins/losses
      
      // if gameSum is greater than compNumber ...
      if (gameSum > compNumber) { 
        // we declare a function gameLost

        function gameLost() {
          // we declare a variable lost equal to lossess incremented by one
          let lost = losses++;
          // we then add content to the #losses div 
          $("#losses").text("Losses: " + lost);
        }

        // we invoke this gameLost function!
        gameLost();
        // then we initializeCrystalCollectors (restart the game)
        initializeCrystalCollectors();
      }

      // but if gameSum equals compNumber ...
      else if (gameSum === compNumber) {
        // we initializeCrystalCollectors once again
        initializeCrystalCollectors();
        // we declare a function gameWon!
        function gameWon() {
          let won = wins++;
          $("#wins").text("Wins: " + won);
        }

        // and we invoke it!
        gameWon();
      }

    });
  initializeCrystalCollectors();
});



