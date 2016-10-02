var game = {
    options : [
        {
            name: "stone",
            wins_against: [
               1,
               2,
               3
            ]
        },
       {
            name: "paper",
           wins_against: [
               0,
               4
            ]
        },
        {
            name: "scissors",
            wins_against: [
               3
            ]
        },
        {
            name: "lizard",
           wins_against: [
                1,
                4
            ]
        },
        {
            name: "spock",
           wins_against: [
               0,
               2
            ]
        },
    ],
    play:{
        score_player: 0,
        score_machine: 0,
        playerOption: 0,
        machineOption: 0
    },
    init:function() {
        var game_buttons = document.getElementsByClassName('game_button');
        var option_id = 0;
        var scorer_player_img = document.getElementById('scorer_player_img');
        var scorer_machine_img = document.getElementById('scorer_machine_img');
        var scorer_player = document.getElementById('scorer_player');
        var scorer_machine = document.getElementById('scorer_machine');
        var result_win_score = document.getElementById('result_win_score');
        var result_lost_score = document.getElementById('result_lost_score');



        for (var i = 0, x = game_buttons.length; i<x; i++) {
            game_buttons[i].addEventListener('click', function(e) {



                option_id = e.target.parentNode.dataset.buttonId;

                game.play.playerOption = parseInt(option_id);
                game.play.machineOption = game.machinePlay();

                scorer_player_img.src = "./images/"+game.options[game.play.playerOption].name+".png";

                setTimeout(function() {


                    scorer_machine_img.src = "./images/"+game.options[game.play.machineOption].name+".png";


                    if (game.play.playerOption === game.play.machineOption ) {
                        game.tieScreen();
                       return;
                    }

                    if (game.checkWinner() === true) {
                        game.play.score_player += 1;
                         game.updateScorer(game.play.score_player,scorer_player);

                    } else {
                        game.play.score_machine += 1;
                        game.updateScorer(game.play.score_machine,scorer_machine);

                    }

                     if (game.play.score_player > 2) {
                        result_win_score.innerHTML = game.play.score_player + " - "+ game.play.score_machine;
                        game.resultScreen(true);
                        game.resetGame();
                     } else if (game.play.score_machine > 2) {
                        result_lost_score.innerHTML = game.play.score_player + " - "+ game.play.score_machine;
                        game.resultScreen(false);
                        game.resetGame();

                    }


                },1000);
            });
        }
    },
    checkWinner : function() {
        // Si la opción que ha elegido la máquina está entre los elementos que pierden contra la elección del usuario, el usuario gana.
        var a = game.options[game.play.playerOption].wins_against.indexOf(game.play.machineOption);
        var length = game.options[game.play.playerOption].wins_against.length;

        var winner = false;

        for (var a = 0; a < length;a++ ) {

            if ( game.options[game.play.playerOption].wins_against[a] === game.play.machineOption) {
                winner = true;

                break;
            }
        }

        return winner;
    },
    machinePlay:function(){
        play =  Math.floor( Math.random() * (4 - 0 + 1) + 0 );
        return play;
    },
    resultScreen:function(action) {
        var winScreen = document.getElementById('win_screen');
        var lostScreen = document.getElementById('lost_screen');

        if (action) {
            //Show
            winScreen.style.display = 'block';

        } else {
            //Hide
             lostScreen.style.display = 'block';
        }


        setTimeout( function(){
            winScreen.style.display = 'none';
            lostScreen.style.display = 'none';
        },5000);
    },
    tieScreen:(function(){
        var tieScreen = document.getElementById('tie_screen');
        tieScreen.style.display = 'block';

        setTimeout( function(){
            tieScreen.style.display = 'none';
        },1000);
    }),
    updateScorer:function(score,scorer) {
        console.dir(scorer);
        scorer.innerHTML = score;
    },
    resetGame:function() {
        game.play.score_player = 0;
        game.play.score_machine = 0;
        game.play.playerOption = 0;
        game.play.machineOption = 0;

        var scorer_player = document.getElementById('scorer_player');
        var scorer_machine = document.getElementById('scorer_machine');
        scorer_machine.innerHTML = "0";
        scorer_player.innerHTML = "0";

        scorer_machine_img.src = "./images/blank.png";
        scorer_player_img.src = "./images/blank.png";
    }
};
