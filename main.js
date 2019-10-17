// card array filled with 12 objects each with two properties. Name set to a string and an img set to a url of the image
//to access the array we'd name the array, chose the location and use dot notation to chose which property you want
//eg. cardsArray[0].name; will return css
//     cardsArray[5].img; will return the image for photoshop

var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];

// need to duplicate cardsArray to create a match
// the concat here works by taking the cardsArray and adding what we want to it. in this case cardsArray again
    const gameGrid = cardsArray.concat(cardsArray)
// need to add randomisation for the game
    gameGrid.sort(function(){
        return 0.5 - Math.random();
})

// targets the div with the id of game-board and assign to a variable game
    const game = document.getElementById('game-board');
// create a section element and assign to grid variable
    const grid = document.createElement('section')
// give section element a class of grid
        grid.setAttribute('class', 'grid');
// append the grid section to the game board div
        game.appendChild(grid);
// to display images use a for loop to go through each item of array
    for(i = 0; i < gameGrid.length; i++){
//create a div element and assign it to variable card
        const card = document.createElement('div')
//apply a card class to that div
        card.classList.add('card');
// set the data-name attribute of the div to the cardsArray name
        card.dataset.name = gameGrid[i].name;
// create front of card
    const front = document.createElement('div');
    front.classList.add('front')
// create back of card
    const back = document.createElement('div');
    back.classList.add('back')
    back.style.backgroundImage = `url(${gameGrid[i].img})`
// append to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    }

    let firstGuess = '';
    let secondGuess = '';
    let count = 0;
    let previousTarget = null;
    let delay = 1200;

    // add match css
    const match = function(){
        let selected = document.querySelectorAll('.selected')
// seleved is an array like object containing `seleced` class   
        for (i = 0; i < selected.length; i++){
            selected[i].classList.add('match');
        }
    };

// reset guesses after two attempts

    const resetGuesses = function(){
        firstGuess = '';
        secondGuess = '';
        count = 0;
        previousTarget = null;
    
    const selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++){
        selected[i].classList.remove('selected');

    } 
    }

// adding event listener to grid
    grid.addEventListener('click', function(event){
    // declare variable to target clicked item
    const clicked = event.target;
//don't allow grid section to be selected only divs inside grid
// Re - SECTION being capitalised  This is just specific to the API. nodeName will be looking for a tag in all caps. I’m not sure the origins of this decision as it is a bit counter intuitive as our section tag in the HTML isn’t in caps. Just one of those things we have to work with :)
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }
// we only want to add to the seleceted class if current count is less that two
    if (count < 2){
        count++;
        
        if (count === 1) {
            // Assign first guess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
          } else {
            // Assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
          }
    // if both guesses are not empty
    if (firstGuess !== '' && secondGuess !== ''){
        if (firstGuess === secondGuess){
// run the match or resetGuesses from above as callback functions.
            setTimeout(match, delay);
            setTimeout(resetGuesses, delay);
        }else {
            setTimeout(resetGuesses, delay);
        } 
    }
    previousTarget = clicked;
    }
    });


    


// // add selected class
// clicked.classList.add('selected');
