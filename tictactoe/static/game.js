var computer = player == "X" ? "O" : "X";

function MakeMove(sender, move) {
    if (player == current_player && winner == '') {
        if ($(sender).text().trim() == "" && $("#messages").text().trim() == "") {
            $(sender).html(player);
            SwapUser();

            $.post(create_move_url, {'move': move},
                function(data) {
                    SwapUser();
                    if(data[0] != '') {
                        $("#cell" + data[0]).html(computer);
                    }

                    if (data[1] == "Over") {
                        SetMessage("GAME OVER! It was a tie");
                    }
                    else if (data[1] == "X" || data[1] == "O") {
                        SetMessage("THE WINNER IS " + data[1]);
                    }

                }
            )
        }
    }
}

function SetMessage(message) {
    $("#messages").html(message);
    $("#messages").show();
    $("#playagain").show();
}

function SwapUser() {
    if (current_player == player) {
        current_player = computer;
    } else {
        current_player = player;
    }
}
