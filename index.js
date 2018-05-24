var $ = require('jquery');
import 'popper.js'
import 'bootstrap'

var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function urlType(t, name) {
    return 'https://wind-bow.gomix.me/twitch-api/' + t + '/' + name + '?callback=?';
}

function queryTheStatus() {
    streamers.forEach(function (channel) {
        $.getJSON(urlType("streams", channel), function (data) {
            let game, status;
            if (data.stream === null) {
                game = "Offline";
                status = "offline";
            } else if (data.stream === undefined) {
                game = "Account Closed";
                status = "offline";
            } else {
                game = data.stream.game;
                status = "online";
            }
            $.getJSON(urlType("channels", channel), function (data) {
                let logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
                    name = data.display_name != null ? data.display_name : channel,
                    description = status === "online" ? ': ' + data.status : "";
                let html = '<div class="row ' +
                    status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' +
                    logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' +
                    data.url + '" target="_blank">' +
                    name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">' +
                    game + '<span class="hidden-xs">' +
                    description + '</span></div></div>';
                status === "online" ? $("#display").prepend(html) : $("#display").append(html);
            });
        });
    });
}

$(document).ready(function () {
    queryTheStatus();
    $(".selector").click(function () {
        $(".selector").removeClass("active");
        $(this).addClass("active");
        let status = $(this).attr('id');
        if (status === "all") {
            $(".online, .offline").removeClass("d-none");
        } else if (status === "online") {
            $(".online").removeClass("d-none");
            $(".offline").addClass("d-none");
        } else {
            $(".offline").removeClass("d-none");
            $(".online").addClass("d-none");
        }
    })
});

