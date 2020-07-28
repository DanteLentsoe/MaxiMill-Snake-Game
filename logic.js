document.addEventListener('DOMContentLoaded', () => //A call back function
{
const pixelSpaces = document.querySelectorAll('.gameDimensions div'); //Selecting all the divs 

const scoreCount = document.querySelector('span'); // We do not use All since it is only calling one component

                                                   // Span is called since changes want to be logged seperately

const startButton = document.querySelector('.intiateGame'); // You class the class


const widthMap = 15;

let intialMapPoint = 0; // This will refer to the intial index or grid within the map

let objectMapPoint = 0; // This will allow for the object to be at o index



//#################
// Snake Formation
//#################
let characterNew =  [2,1,0]; // Divs containing the value of 2 will be the heads and all cotaining 0 Will be the tails
                             // Whislt The 1 = body parts






//###########################
// Snake Directional Movement
//###########################
let directionMovement = 1; // this means it moves one div on the array, is set to > 1 is will skip pixels



//##################
// Game Score count
//##################
let scoreGame = 0;





//#############################
// Movement Speed Of the Snake
//#############################
let speedCharacter = 0.9;

let timeLapseMovement = 0;

let timeLapse = 0;






//##################################
//Starting and Finishing of The Game
//##################################

function gameStart()
{
    characterNew.forEach(index => pixelSpaces[index].classList.remove('character'))  // Arrow fucntion will ensure that every component of the array is taken into consideration

    pixelSpaces[objectMapPoint].classList.remove('object');

    clearInterval(timeLapse); //Resetting EveryThing

    scoreGame = 0;
    randomizeObjectLocation();


    // Randomly Generate An Apple
    directionMovement = 1;
    scoreCount.innerText = scoreGame;
    timeLapseMovement = 1000; // Occurance When Game is Intiated
    characterNew =  [2,1,0];
    intialMapPoint = 0;
    characterNew.forEach(index => pixelSpaces[index].classList.add('character'));  //Giving The Character A start Position
   
    //Fucntion For Movement OutComes
    timeLapse = setInterval(motionVariations, timeLapseMovement) 
}

// Function for Motion Varations

function motionVariations()
{
    if (
        (characterNew[0] + widthMap >= (widthMap * widthMap) && directionMovement === widthMap) || // When Snake Hits the Map
        (characterNew[0] % widthMap === widthMap -1 && directionMovement === 1) || // Hitting The Right Wall
        (characterNew[0] % widthMap === 0 && directionMovement === -1) || //Cordinates for the left side of the map
        (characterNew[0] - widthMap < 0 && directionMovement === -widthMap) || //When Snake hits wall top
        pixelSpaces[characterNew[0] + directionMovement].classList.contains('character') //Snake Going Into Itself
    )
    {
        return clearInterval(timeLapse);
    }
}


/*###########################
Tail Being Set and Described
############################*/
const characterTail = characterNew.pop(); // Removal of the last array
pixelSpaces[characterTail].classList.remove('character'); // Removal of snake tail
characterNew.unshift(characterNew[0] + directionMovement) //Allows sequential following of the array

if(pixelSpaces[characterNew[0]].classList.contains('object'))
{
    pixelSpaces[characterNew[0]].classList.remove('object')
    pixelSpaces[characterTail].classList.add('character')
    characterNew.push(characterTail) // adding to the snake
    
    // Function to randomize the position of the object
 randomizeObjectLocation();
    scoreGame = scoreGame + 5;
    scoreCount.textContent = scoreGame;
    clearInterval(timeLapse);
    timeLapseMovement = timeLapseMovement * speedCharacter;
    timeLapse = setInterval(motionVariations, timeLapseMovement)

}
pixelSpaces[characterNew[0]].classList.add('character');

/*####################
Snake Randomization
#####################*/

randomizeObjectLocation()
{
    do{
        objectIndex = Math.floor(Math.random() * pixelSpaces.length)
    }

    while (pixelSpaces[objectIndex].classList.contains('character')) // While is used to ensure that object does not appear on any class with the div
    pixelSpaces[objectIndex].classList.add('object')

}







//######################
// Fucntion For Controls
//######################
function directionalChange(mov)
{
    pixelSpaces[intialMapPoint].classList.remove('character')

    if (mov.keyCode === 39) //Numerical for right arrow
    {
        directionMovement = 1; // Movement Going Down The Array
    } 
    else if (mov.keyCode === 38)
    {
        directionMovement = -widthMap; // This is will allow for the down Movement
    }
    else if (mov.keyCode === 37) //Movement to the left
    {   
        directionMovement = -1; 
    }
    else if (mov.keyCode === 40) 
    {
directionMovement = +widthMap;  // Head set to follow the div going down
    }
}

//##################################################
// Execution of Function for when a key is pressed
//##################################################
document.addEventListener('keyup', directionalChange); // Instruction of when key is pressed to execute a function control
startButton.addEventListener('click', gameStart);


})