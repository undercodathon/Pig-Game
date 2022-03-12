var scores, roundScore, activePlayer, gamePlaying, gameStarted;

var winNum =100;

var prevDice;

init();


document.querySelector('.btn-confirm').addEventListener('click', function(){
   
    winNum = document.querySelector('.input-field').value;
    document.querySelector('.custom-goal-num').style.display= 'block';
})

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){

        // random number generation
        var dice  = Math.floor((Math.random() *6) + 1);
        var dice2 = Math.floor((Math.random() *6) + 1);
    
        prevDice = dice2;
        // show result
        
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOM2 = document.querySelector('.dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        if( dice === 6 && prevDice === 6)
        {
            scores[activePlayer] =0;
        
            document.querySelector('#player-'+ activePlayer +'-score-number').textContent = scores[activePlayer];   
            nextPlayer();
        }

     

        else if (dice !== 1 && dice2 !== 1){
            
            roundScore += dice;
            roundScore += dice2;
            document.getElementById('roll-dice-score-number-' + activePlayer).textContent = roundScore;

        }
        else{
            // moves to other player
            nextPlayer();
        }

        document.querySelector('.custom-goal-num').style.display= 'none'
        
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){

        scores[activePlayer] +=roundScore;
        
        document.querySelector('#player-'+ activePlayer +'-score-number').textContent = scores[activePlayer];
        
        if(scores[activePlayer] >= winNum)
        {
            document.querySelector('#player-' + activePlayer + '-text').textContent = 'Winner!';
            document.querySelector('.dice').style.display= 'none';
            document.querySelector('.dice-2').style.display= 'none';
            document.querySelector('.player-' + (1 + activePlayer) +'-box').classList.add('winner');
            document.querySelector('.player-' + (1 + activePlayer) +'-box').classList.remove('active');
            gamePlaying = false;
        }
        else{
            nextPlayer();
        }
        prevDice = 0;
    }
    
})

function nextPlayer(){
    activePlayer ===0 ? activePlayer = 1 : activePlayer =0;
    roundScore = 0;


    document.getElementById('roll-dice-score-number-0').textContent = '0';
    document.getElementById('roll-dice-score-number-1').textContent = '0';

    document.querySelector('.player-1-box').classList.toggle('active');
    document.querySelector('.player-2-box').classList.toggle('active');

    prevDice = 0;
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore= 0;
    activePlayer = 0;

    gamePlaying = true;


    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('player-0-score-number').textContent = '0';
    document.getElementById('player-1-score-number').textContent = '0';

    document.getElementById('roll-dice-score-number-0').textContent = '0';
    document.getElementById('roll-dice-score-number-1').textContent = '0';

    document.querySelector('.player-1-box').classList.remove('winner');
    document.querySelector('.player-2-box').classList.remove('winner');

    document.querySelector('.player-1-box').classList.add('active');

    document.querySelector('#player-0-text').textContent = 'Player 1';
    document.querySelector('#player-1-text').textContent = 'Player 2';
    
}