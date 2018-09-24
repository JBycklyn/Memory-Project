

// deck of all cards.

    const deck = document.querySelector('.deck');
    
    var card = document.getElementsByClassName('card');
    var cards = [...card];


    var openCards = [];
    var shuffledCards = [];
    var displayCard = '';
    var checkMatch = '';
    var matchedArray = [];
    var moves = 0;
    var idx = 4;
    var stars = document.querySelectorAll(".stars li");
    
// variables for the timer.

    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var timer = document.querySelector(".timer");
    var interval;

    timer.innerHTML = minutes + ' /mins ' + seconds + ' /secs';

// Shuffle function from http://stackoverflow.com/a/2450976.

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

    // appChild() inputs: deck, shuffledCards[i].
    // appChild() outputs: shuffled deck of cards.
    // appChild() appends each card to deck.
    // appChild() is called from startGame().
    // startGame() resets moves, timer, matched count
    // and clears the matched array.
    // startGame() outputs: produces the deck using appChild().

    function appChild(arr1, arr2){
        arr1.appendChild(arr2);
    };

    function startGame(){

        // shuffle cards and add to deck.

        shuffledCards = shuffle(cards);
    
        for (var i = 0; i < shuffledCards.length; i++) {
            appChild(deck, shuffledCards[i]);

            shuffledCards[i].classList.remove('open', 'inactivated', 'match');
          
            }

        // reset moves and matched number.

        moves = 0;
        matchedArray = [];
        document.getElementsByClassName('moves')[0].innerHTML = moves + ' /move(s)';

        // reset stars.

        stars = document.querySelectorAll(".stars li");

        idx = 4;

        for (var i = 0; i < stars.length; i++) {

            stars[i].classList.remove('fa-star-o', 'fa-star-half-o');
            stars[i].classList.add('fa-star');
        }    

        // reset timer.

            seconds = 0;
            minutes = 0; 
            hours = 0;
            timer = document.querySelector(".timer");
            timer.innerHTML = "0 /mins 0 /secs";
            clearInterval(interval);

         };


    displayCard = function() {

        // flips card open upon click (class 'open').
        // prevents card from being click again (class 'inactivated').
    
        this.classList.toggle('open');
        this.classList.toggle('inactivated');
        
    };


    checkMatch = function() {

        // adds each card to openCards array.
        // inactivate() makes all cards not clickable.
        // starts timer by calling numMoves().
        // two cards is one move.
        // starRating() tracks moves.
        // the checkMatch() process begins when openCards has two cards.
        // match() is called if the two cards equal.
        // a match occurs if the ids (without the last character) equal.
        // if the ids do not equal, notMatch() is called and all remaining cards
        // are reactivated (made clickable).

        openCards.push(this);
        var len = openCards.length;

        if (len === 2) {

            inactivate();

            moves = moves + 1;

            numMoves();
            starRating();

            var cardOne = openCards[0].id.slice(0, -1);
            var cardTwo = openCards[1].id.slice(0, -1);             

            if (cardOne === cardTwo) {

                    match();

                } else {

                    openCards[0].classList.add('noMatch');
                    openCards[1].classList.add('noMatch');                      
                    notMatch();
                };

            };

        };


    winGame = function() {

        // winBox() launches
        // timer stops

        if (matchedArray.length === 16) {

            clearTimeout(interval);
            winBoxOn();

        }

    };


    function match() {

        // called from checkMatch() if a match is found.
        // resets openCards array.
        // updates matchedArray().
        // calls reactivate() to make remaining cards clickable.

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

        // called from checkMatch() if a match is not found.
        // provides 1500 milliseconds for user concentration assistance.
        // calls reactivate() to make remaining cards clickable.

        setTimeout(function(){
            openCards[0].classList.remove('open');
            openCards[1].classList.remove('open');
            openCards[0].classList.remove('noMatch');
            openCards[1].classList.remove('noMatch');
            openCards = [];
            reactivate();            

        }, 1500);
        
    };


    function inactivate() {

        // inactivates cards to make them unclickable.
        // inactivate() is called from checkMatch().

        Array.prototype.filter.call(cards, (function (card) {

            if (card.classList.contains('inactivated')) {

                return;

            } else {

                card.classList.add('inactivated');

            }

        }));

    };


    function reactivate() {

        // reactivates cards to make them clickable.
        // reactivate() is called from match() and notMatch().

        Array.prototype.filter.call(cards, (function (card) {

            if (card.classList.contains('match')) {
                
                return;

            } else {

            card.classList.remove('inactivated');           

            }

        }));

    };


    function winBoxOn() {

        // called from winGame().

        var endingTime = timer.innerHTML;
        var endingRating = document.querySelector(".stars").innerHTML;

        document.getElementById("overlay").style.display = "block";

        document.getElementById("endingMoves").innerHTML = moves;
        document.getElementById("endingRating").innerHTML = endingRating;
        document.getElementById("endingTime").innerHTML = endingTime;

    };


    function winBoxOff() {

        // called from closeWin() when user clicks the close button.

        document.getElementById("overlay").style.display = "none";

        return true;
    };


    function playAgain() {

        // called when user clicks the play again button.
        // calls startGame().

        winBoxOff();
        startGame();

    };


     function closeWin() {

        winBoxOff();

    };


    function refresh() {
        document.location.reload();
    }


    document.getElementsByClassName('moves')[0].innerHTML = moves + " /move(s)";

    function numMoves() {

        // starts timer.
        // calls startTimer().
        // called by checkMatch().

        document.getElementsByClassName('moves')[0].innerHTML = moves + " /move(s)";

        if (moves == 1) {

            seconds = 0;
            minutes = 0;
            hours = 0;

            startTimer();
        }

    };


    function starRating() {

        // called by checkMatch().
        // 12 moves is a rating of 4 stars.
        // each move from 13 to 16 decrements by a half star.
        // 17 moves is a rating of 2 stars.
        // 18 moves decrements by one star
        // 18 or more moves is a rating of 1 star.

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


