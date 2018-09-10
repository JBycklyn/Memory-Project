

// deck of all cards

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
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var timer = document.querySelector(".timer");
    var interval;

    timer.innerHTML = minutes + ' /mins ' + seconds + ' /secs';

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

        }, 1300);
        
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

        var endingTime = timer.innerHTML;
        var endingRating = document.querySelector(".stars").innerHTML;

        document.getElementById("overlay").style.display = "block";

        document.getElementById("endingMoves").innerHTML = moves;
        document.getElementById("endingRating").innerHTML = endingRating;
        document.getElementById("endingTime").innerHTML = endingTime;

    };

    function winBoxOff() {
        document.getElementById("overlay").style.display = "none";

        return true;
    };

    function playAgain() {

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


