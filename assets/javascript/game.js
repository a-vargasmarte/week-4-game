//code starts here

//CRUCIAL STEP: ENGLOBAR DOCUMENTO EN DOCUMENT.READY(FUNCTION() {})
// $(document).ready(function () {

// make some variables global to the runtime of the application
let gameSum = 0;
let wins = 0;
let losses = 0;
let randomNumber;

// create an object called crystals

// crystals have the following properties and methods:
// an empty array where random numbers will be pushed into
// an array of crystals numbered 1-4
// an empty array where crystalButtons will be pushed to
// a function that iterates over each crystal, uses jQuery to dynamically create materialize buttons, 
// pushes random numbers between 1 and 12 to randomArray, and appends each button to a container in the browser
// a function that generates a random number between 19 and 120, and uses jQuery to present it to the user

const Crystal = function (min, max) {
  // declare min and max numbers
  this.min = 1;
  this.max = 12;
  // a property randomNumber to which a random number between min and max is assigned
  this.randomNumber = Math.floor(Math.random() * (this.max - this.min) + this.min);
  // a property that holds a materialize floating button
  this.buttonIcon = $("<i>").attr("class", "material-icons").text("add");
  this.button = $("<a>").attr(
    {
      class: "btn-floating btn-large waves-effect waves-light red game-button",
      "data-number": this.randomNumber
    }).append(this.buttonIcon);
}

// create a new object constructor for Crystals
crystalArray = [1, 2, 3, 4];
const CrystalConstructor = function () {
  // declare an empty randomArray
  this.newCrystals = [];
  this.crystals = crystalArray.map(crystal => this.newCrystals.push(new Crystal(crystal)));
  // function that takes Crystal objects and displays them to the user
  this.display = function () {
    this.newCrystals.forEach(crystal => $("#buttons-div").append(crystal.button));
  }
  console.log(this.newCrystals);
  // we write a method that assigns a random computerNumber and displays it to the user between 19 and 120
  this.randomComputer = function (min, max) {
    min = 19;
    max = 120;
    randomNumber = Math.floor(Math.random() * (max - min) + min);
    // we attach this randomNumber to an html element and append to #game-div
    // let randomNumberDiv = $("<div>").append("Number to match: " + randomNumber);
    $("#computer-number").html("<h4> Number to match: " + randomNumber + "</h4>");
  }

  this.clickEvents = function () {
    $(".game-button").on("click", function () {

      // gameSum will equal itself plus the crystal's integer value
      gameSum = gameSum + Number(this.dataset.number);
      console.log(gameSum);

      // we create a gameSum div and assign the value of gameSum with the .html method
      $("#user-sum").html("<h5> Sum of crystals: " + gameSum + "</h5>");
      // after showing the gameSum to the player we check on the conditions to determine wins/losses
      // if gameSum is greater than compNumber ...
      if (gameSum > randomNumber) {
        gameLost();
        gameSum = 0;
        test = new CrystalConstructor();
        $("#buttons-div").empty();
        test.display();
        test.randomComputer();
        test.clickEvents();
      }
      // but if gameSum equals compNumber ...
      else if (gameSum === randomNumber) {
        // the game is won
        gameWon();

        gameSum = 0;
        test = new CrystalConstructor();
        $("#buttons-div").empty();
        test.display();
        test.randomComputer();
        test.clickEvents();
      }
    })
  };
}

let test = new CrystalConstructor();
test.display();
test.randomComputer();
test.clickEvents();
// console.log(test);

// we declare a function gameLost
function gameLost() {
  losses = losses++;
  $("#score-number").html("<h5> Losses: " + Number(losses++) + " Wins: " + wins + "</h5>");

}

// we declare a function gameWon!
function gameWon() {
  $("#score-number").html("<h5> Losses: " + losses + " Wins: " + Number(wins++) + "</h5>");
}




