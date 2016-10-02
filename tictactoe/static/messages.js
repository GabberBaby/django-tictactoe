if ($("#messages").text().trim() == "") {
    $("#messages").hide();
}

if ($("#notifications").text().trim() == "") {
    $("#notifications").hide();
}

socket = io.connect();

socket.on('connect', function () {
    socket.emit('join', nickname);
});

socket.on('announcement', function (msg) {
    $('#lines').empty();
    $('#lines').append($('<p>').append($('<em>').text(msg)));
});

socket.on('reconnect', function () {
    $('#lines').remove();
});


socket.on('nicknames', function (nicknames) {
    $('#nicknames').empty();
    for (var i in nicknames) {
	    $('#nicknames').append($('<li>').text(nicknames[i]));
        $('#nicknames').append($('<br>'))
    }
});

function message (from, msg) {
    $('#lines').append($('<p>').append($('<b>').text(from), msg));
}

socket.on("message", function(obj){
    if (obj.message.type == "message") {

        var data = eval(obj.message.data);

        if (data[0] == "new_invite") {
            SetNotificationMessageInvite(data, "You have a new game invite from " + data[1] + "<a href='" + data[2] + "'>Accept?</a>");
        }
        else if (data[0] == "game_started") {
            SetNotificationMessageGameStart(data, "A new game has started <a href='/games/" + data[1] + "/'>here</a>");
        }
        else if (data[0] == "game_over") {
            if (data[1] == game_id) {
                winner = data[2];
                game_over = true;

                if (data[2] == "") {
                    SetMessage("Its a tie!");
                }
                else {
                    SetMessage("The winner is: " + data[2]);
                }
            }
            else {
                SetMessage("A game has finished <a href='/games/" + data[1] + "/'>here</a>");
            }
        }
        else if (data[0] == "opponent_moved") {
            if (data[1] == game_id) {
                $('#cell' + data[3]).html(data[2]);
                SwapUser();
            }
            else {
                SetMessage("Your opponent has played <a href='/games/" + game_id + "/'>here</a>");
            }
        }
    }
});

function MakeMove(sender, move) {
    if (player == current_player && game_over == false) {
        if ($(sender).text().trim() == "") {
            $(sender).html(player);
            SwapUser();

            $.post(create_move_url, {'move': move},
                function(data) {
                    // successfully made a move
                }
            )
        }
    }
}

function SwapUser() {
    var computer = player == "X" ? "O" : "X";

    if (current_player == player) {
        current_player = computer;
        SetMessage("Your opponents turn!");
    } else {
        current_player = player;
        SetMessage("Your turn!");
    }
}



socket.send("subscribe:" + user_id );

function SetNotificationMessageInvite(data, message) {
    $('#notifications').empty();
    $("#notifications").html("<div>" + message + "</div>");
    $("#notifications").show();
    $("#games").prepend($('<li>').append("<a href='"+data[2]+"'>" + nickname + " vs " + data[1] + " (Receive Invite)" +"</a>"));
}

function SetNotificationMessageGameStart(data, message) {
    $('#notifications').empty();
    $("#notifications").html("<div>" + message + "</div>");
    $("#notifications").show();
    $("#games").prepend($('<li>').append("<a href='/games/" + data[1] + "/'>" + nickname + " vs " + data[2] + " (Invite Accepted)" +  "</a>"));
}

function SetMessage(message) {
    $('#messages').empty();
    $("#messages").html("<div>" + message + "</div>");
    $("#messages").show();
}

