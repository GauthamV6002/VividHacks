$(document).ready(() => {
    var socket = io.connect('http://127.0.0.1:5000/');
    let username = null;

    let myMsg = $("#myMessage");
    let sb = $("#sendButton");

    let srry = $("#srry");
    let nice = $("#nice");

    srry.hide();
    nice.hide();

    $.ajax({
        url: "http://127.0.0.1:5000/getuser",
        success: function (response) {
            username = response.username;
        }
    });

    socket.on('connect', () => {
        socket.send(`<span class="badge username-badge bg-secondary">${username}</span> has joined the chat!`);
    });

    socket.on('message', msg => {
        $('#messages').append(`<li class="list-group-item">${msg}</li>`);
    });

    sb.click(() => {
        socket.send(`<span class="badge username-badge bg-secondary">${username}</span>${myMsg.val()}`);
        myMsg.val('');
    });

    $(document).keypress(function (e) {
        if (e.which == 13) {
            socket.send(`<span class="badge username-badge bg-secondary">${username}</span>${myMsg.val()}`);
            myMsg.val('');
        }

    });

    $("#ratebad").click(() => {
        $("#evaluate-buttons").fadeOut();
        setTimeout(() => { srry.fadeIn() }, 400);
        setTimeout(() => { srry.fadeOut() }, 7400);
    });

    $("#rategood").click(() => {
        $("#evaluate-buttons").fadeOut();
        setTimeout(() => { nice.fadeIn() }, 400);
        setTimeout(() => { nice.fadeOut() }, 1900);
    });

});