// *** THE SECRET FOREST TEXT ADVENTURE GAME ***

/*
 - game starts with the playerInput() method, the required input is 'start'
 - this calls the start() and the progressSteps() methods
 - the progressSteps method maintaing the whole game flow depends on the player input using the playerInput() method
 - every step has a description property which is logged to the player with the choosable choices
 - the step's keywords substitutes the story chapters description 
 - to imitate throwing dice in specific steps progressSteps() method calls dice() method
 - in the last step the finish() method determine the end of the game depending on the player's remaining time and log it to the player
*/

// game is the main object that contains functions and other objects of the game
const game = {

  
// player is a nested object that cotains only one players properties 
// time property represent the amount of time what the player has in the whole game
// fasterParameter property value represent the speed of time flowing in the game
  player:{
    time: 10,
    fasterParameter: 1,
  },


// stepsArray list contains the properties of the steps of the game inside objects
// keyword property represents the stage of the particular step
// stepCode property is the ID of stages and they are in a hierarchic order
// description property is for log the available orders for the user
// choiceOne, choiceTwo properties are the choices which are required from the user and it controls the storyline branches
// levelOfIncidents property can have 'high' or 'low' value depending on the level of the incident 
  stepsArray:[
    {keyWord: 'Start', stepCode: 0, branch: 1, descripton: '<start>'},
    {keyWord: 'First choice', stepCode: 1, branch: 1, descripton: '<write "hill" or "river">', choiceOne: 'hill', choiceTwo: 'river'},
    {keyWord: 'Hill', stepCode: 2, branch: 1, descripton: '<write "tower" or "staying on the road">', choiceOne: 'tower', choiceTwo: 'staying on the road'},
    {keyWord: 'Valley', stepCode: 2, branch: 2, descripton: '<write "trail" or "boat">', choiceOne: 'trail', choiceTwo: 'boat'},
    {keyWord: 'Tower', stepCode: 3, branch: 1, subBranch: 1, descripton: '<write "dice">', levelOfIncident: 'low', choiceOne: 'dice'},
    {keyWord: 'Tower', stepCode: 3, branch: 1, subBranch: 2, descripton: '<write "shorter path" or "known path">', choiceOne: 'shorter path', choiceTwo: 'known path'},
    {keyWord: 'Longer way on the hill', stepCode: 3, branch: 2, descripton: '<write "continue">', choiceOne: 'continue'},
    {keyWord: 'Longer way in the walley', stepCode: 3, branch: 3, descripton: '<write "dice">', levelOfIncident: 'high', choiceOne: 'dice'},
    {keyWord: 'Boat', stepCode: 3, branch: 4, descripton: '<write "dice">', levelOfIncident: 'high', choiceOne: 'dice'},
    {keyWord: 'Short way from the tower', stepCode: 4, branch: 1, descripton: '<write "dice">', levelOfIncident: 'high', choiceOne: 'dice'},
    {keyWord: 'Middle of the road on the hills', stepCode: 4, branch: 2, descripton: '<write "dice">', levelOfIncident: 'low', choiceOne: 'dice'},
    {keyWord: 'Middle of the road on the walley', stepCode: 4, branch: 3, descripton: '<write "dice">', levelOfIncident: 'low', choiceOne: 'dice'},
    {keyWord: 'Short way from the boat', stepCode: 4, branch: 4, descripton: '<write "dice">', levelOfIncident: 'high', choiceOne: 'dice'},
    {keyWord: 'Near the house of dogs', stepCode: 5, branch: 1, descripton: '<write "continue">', choiceOne: 'continue'},
    {keyWord: 'See the house from distance', stepCode: 5, branch: 2, descripton: '<write "dice">', levelOfIncident: 'low', choiceOne: 'dice'},
    {keyWord: 'Hearing the dogs barking from distance', stepCode: 5, branch: 3, descripton: '<write "dice">', levelOfIncident: 'low', choiceOne: 'dice'},
    {keyWord: 'See the storm from distance', stepCode: 6, branch: 1, descripton: '<write "dice">', levelOfIncident: 'low', choiceOne: 'dice'},
    {keyWord: 'Inside the deep forest', stepCode: 6, branch: 2, descripton: '<write "dice">', levelOfIncident: 'high', choiceOne: 'dice'},
    {keyWord: 'The meadow', stepCode: 6, branch: 3, descripton: '<write "dice">', choiceOne: 'dice'},
    {keyWord: 'Middle of the road after the storm', stepCode: 7, branch: 1, descripton: '<write "continue">', choiceOne: 'continue'},
    {keyWord: 'Wind in the forest', stepCode: 7, branch: 2, descripton: '<write "dice">', levelOfIncident: 'high', choiceOne: 'dice'},
    {keyWord: 'Mud', stepCode: 7, branch: 3, descripton: '<write "dice">', levelOfIncident: 'high', choiceOne: 'dice'},
    {keyWord: 'Finish 1', stepCode: 8, branch: 1, descripton: 'finish 1'},
    {keyWord: 'Finish 2', stepCode: 8, branch: 2, descripton: 'finish 2'},
    {keyWord: 'Finish 3', stepCode: 8, branch: 3, descripton: 'finish 3'},
  ],

// global properties to follow the steps and branches
  currentStepCode:0,
  currentStepBranch:1,
  currentSubBranch:1,
  currentStepIndex:0,
  currentInput:'',


// function which returns the index of the current step   
  getStepIndex(){
    let index= -1;
    
// for loop iterates through stepsArray until stepCode and branch properties equal to the currentStepCode and currentStepBranch global variables and set the index value to the current
    for(const element of this.stepsArray){
      index++;
      if(element.stepCode === this.currentStepCode && element.branch === this.currentStepBranch){
      break;
      }
    }
    this.currentStepIndex = index;

// condition to handle that steps where the sub branch value equal to 2 (means the sub branch completed)
    if(this.currentSubBranch === 2){
      index += 1;
      this.currentStepIndex += 1;
    }
    return index;
  },


// function to get the choices of player
  playerInput(input){
    let index = this.getStepIndex();
    let inputValid = '';
    
// condtion to check the validation of input and set the inputValid variable
    if(this.stepsArray[index].choiceOne === input || this.stepsArray[index].choiceTwo === input || input === 'start'){
      inputValid = input;
      this.currentInput = inputValid;
    
    }else{
    console.log('Invalid input! Please write one of the valid options.}');
    }
    
// if the inputValid variable is true the right method is called depending on the players input 
    switch(inputValid){
      case 'start':
        this.start();
        break;
      case 'dice':
        this.dice();
        break;
      default:
        this.progressSteps();
        break;
    }
  },


// function to start the game at step 0
  start(){
    console.log(this.stepsArray[0].descripton);
    this.progressSteps();
  },

  
// function to determaning the three possible ends depending on the player's remaining time and log the result to the player
  finish(){
    console.log('You have left: ' + Math.floor(this.player.time) + ' hour in the end of the game.');
    if(this.player.time > 3){
      console.log(this.stepsArray[22].descripton); 
    }else if(0 < this.player.time && this.player.time < 3){
      console.log(this.stepsArray[23].descripton);
    }else{
      console.log(this.stepsArray[24].descripton);
    }
  },


// function to imitate throwing a dice
  dice(){
    let index = this.currentStepIndex
    let result = Math.floor(Math.random() * 4);
    if(result === 0){
      result += 1;
    }
    
// condition for continue the game flow after a dice throw and the current step has sub branches 
    if(this.stepsArray[index].subBranch && this.stepsArray[index].subBranch < 2){
      this.currentSubBranch += 1;
    }else{
      this.currentStepCode += 1;
    };

// condtion for controlling the fasterParameter of player depending on levelOfIncident's value
    if(this.stepsArray[index].levelOfIncident === 'high'){
      switch(result){
        case 1: this.player.fasterParameter *= 1.15;
        break;
        case 2: this.player.fasterParameter *= 1.75;
        break;
        case 3: this.player.fasterParameter *= 3;
        break;
      }
    }else{
      switch(result){
        case 1: this.player.fasterParameter *= 1.05;
        break;
        case 2: this.player.fasterParameter *= 1.3;
        break;
        case 3: this.player.fasterParameter *= 2;
        break;
      }
    }
    console.log(`Your throw is: ${result}. Currently your time is decrase ${this.player.fasterParameter.toFixed(2)} per turn.`)
    this.progressSteps();
  },


// function to keep in progress the storyline step by step
  progressSteps(){
   
    let index = this.currentStepIndex;
    let input = this.currentInput;

// condition to set the branch numbers at step 1
    if(this.currentStepCode === 1){
      if(input === this.stepsArray[index].choiceTwo){
        this.currentStepBranch += 1;
      }
    };

// condition to set the branch numbers after the main branch at step 2 and player choosing option 1
    if(this.currentStepCode === 2 && this.currentStepBranch === 2){
      if(input === this.stepsArray[index].choiceOne){
        this.currentStepBranch = 3;
      }else{
        this.currentStepBranch = 4;
      }
    };

// condition to set the branch numbers after the main branch at step 2 and player choosing option 2
    if(this.currentStepCode === 2 && this.currentStepBranch === 1){
      if(input === this.stepsArray[index].choiceTwo){
        this.currentStepBranch += 1;
      }
    };

// condition to switch back the step branch to 1 after step 3
    if(this.currentStepCode === 4 && this.currentStepBranch === 4){
      this.currentStepBranch = 1;
    };

// take one step after the players choice (when the input is not dice)
    if(input !== 'dice'){
      this.currentStepCode += 1;
    }

// condition to call finish() method if the current step code is 8 
    if(this.currentStepCode === 8){
      this.finish();
    };

// update the current index of step before log the step description to the player
    let indexUpdate = this.getStepIndex();
    if(this.currentStepCode < 8){
      this.player.time -= (0.5 * this.player.fasterParameter);
      console.log(this.stepsArray[indexUpdate].descripton);
    }
  },


// function to display the current main variables for inspection
  displayCurrent(){
    console.log('step code: ' + this.currentStepCode + ' ,' + 'branch: ' + this.currentStepBranch + ' index: ' + this.currentStepIndex + ' current input: ' + this.currentInput + ', subBranch : ' + this.currentSubBranch)
  },
};


// example of players inputs:
game.playerInput('start');
game.playerInput('hill');
game.playerInput('staying on the road');
game.playerInput('continue');
game.playerInput('dice');
game.playerInput('dice');
game.playerInput('dice');
game.playerInput('dice');
