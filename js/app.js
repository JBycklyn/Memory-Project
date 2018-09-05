/*
 * Create a list that holds all of your cards
 */

// deck of all cards

    const deck = document.querySelector('.deck');
    
    let card = document.getElementsByClassName('card');
    let cards = [...card];

    var openCards = [];
    let shuffledCards = [];
    let displayCard = '';
    let checkMatch = '';
    let matchedArray = [];
    let moves = 0;
    let idx = 4;
    let stars = document.querySelectorAll(".stars li");

    // Shuffle function from http://stackoverflow.com/a/2450976

    function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

    }


    document.body.onload = startGame();

    function appChild(arr1, arr2){
        arr1.appendChild(arr2);
    };

    function startGame(){

        // shuffle cards and add to deck

        shuffledCards = shuffle(cards);
    
        for (var i = 0; i < shuffledCards.length; i++) {
            appChild(deck, shuffledCards[i]);

            shuffledCards[i].classList.remove('open', 'inactivated', 'match');
          
            }

        // reset moves and matched number

        moves = 0;
        matchedArray = [];
        document.getElementsByClassName('moves')[0].innerHTML = moves + ' /move(s)';

        // reset stars

        stars = document.querySelectorAll(".stars li");

        idx = 4;

        for (var i = 0; i < stars.length; i++) {

            stars[i].classList.remove('fa-star-o', 'fa-star-half-o');
            stars[i].classList.add('fa-star');
        }    

        // reset timer

            seconds = 0;
            minutes = 0; 
            hours = 0;
            timer = document.querySelector(".timer");
            timer.innerHTML = "0 /mins 0 /secs";
            clearInterval(interval);

         };


    displayCard = function() {
    
        this.classList.toggle('open');
        this.classList.toggle('inactivated');
    };

    checkMatch = function() {

        openCards.push(this);
        var len = openCards.length;

        if (len === 2) {

            inactivate();

            moves = moves + 1;

            numMoves();
            starRating();            

            if (openCards[0].id === openCards[1].id) {

                    match();

                } else {

                    openCards[0].classList.add('noMatch');
                    openCards[1].classList.add('noMatch');                      
                    notMatch();
                };

            };

        };

    winGame = function() {

        if (matchedArray.length === 16) {

            winBoxOn();

        }
    };


    function match() {

        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards[0].lastElementChild.classList.add('match');
        openCards[1].lastElementChild.classList.add('match');
        matchedArray.push(openCards[0]);
        matchedArray.push(openCards[1]);

        openCards = [];

        matchedNum = matchedArray.length;

        reactivate();
        
    };           

   
    function notMatch() {

        setTimeout(function(){
            openCards[0].classList.remove('open');
            openCards[1].classList.remove('open');
            openCards[0].classList.remove('noMatch');
            openCards[1].classList.remove('noMatch');
            openCards = [];
            reactivate();            

        }, 1200);
        
    };

    function inactivate() {

        Array.prototype.filter.call(cards, (function (card) {

            if (card.classList.contains('inactivated')) {

                return;

            } else {

                card.classList.add('inactivated');

            }

        }));
    };

    function reactivate() {

        Array.prototype.filter.call(cards, (function (card) {

            if (card.classList.contains('match')) {
                
                return;

            } else {

            card.classList.remove('inactivated');           

            }

        }));
    };

    function winBoxOn() {

        var endTime = timer.innerHTML;
        var endRating = document.querySelector(".stars").innerHTML;

        document.getElementById("overlay").style.display = "block";

        document.getElementById("endMove").innerHTML = moves;
        document.getElementById("endRating").innerHTML = endRating;
        document.getElementById("endTime").innerHTML = endTime;

    };

    function winBoxOff() {
        document.getElementById("overlay").style.display = "none";
    };

    function playAgain() {

        winBoxOff();
        startGame();

    };

    function refresh() {
        document.location.reload();
    } 

    document.getElementsByClassName('moves')[0].innerHTML = moves + " /move(s)";

    function numMoves() {

        document.getElementsByClassName('moves')[0].innerHTML = moves + " /move(s)";

        if (moves == 1) {

            seconds = 0;
            minutes = 0;
            hours = 0;

            startTimer();
        }

    };


    function starRating() {

        if (moves > 12 && moves < 17) {

            idx = idx - 1;

            if (idx === 3) {

                stars[idx].classList.remove('fa-star');
                stars[idx].classList.add('fa-star-half-o');


            } else if (idx === 2) {

                stars[idx + 1].classList.remove('fa-star-half-o');
                stars[idx + 1].classList.add('fa-star-o');

            } else if (idx === 1) {

                stars[idx + 1].classList.remove('fa-star');
                stars[idx + 1].classList.add('fa-star-half-o');

            } else if (idx === 0) {

                stars[idx + 2].classList.remove('fa-star-half-o');
                stars[idx + 2].classList.add('fa-star-o');
            }

            } else if (moves > 17) {

                stars[idx + 1].classList.remove('fa-star');
                stars[idx + 1].classList.add('fa-star-o');

            }

        else {

            return;
        }
        

    };

    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var timer = document.querySelector(".timer");
    var interval;

    timer.innerHTML = minutes + ' /mins ' + seconds + ' /secs';

    function startTimer() {

        interval = setInterval (function() {

            timer.innerHTML = minutes + ' /mins ' + seconds + ' /secs';
            seconds++;

            if (seconds === 60) {
                minutes++;
                seconds=0;
            }

            if (minutes === 60) {
                hours++;
                minutes = 0;
            }

        }, 1000);
    };


  // event listeners

    classname = document.getElementsByClassName('card');

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', displayCard);
        classname[i].addEventListener('click', checkMatch);
        classname[i].addEventListener('click', winGame);

    };



   

/*
 *    set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) /
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

