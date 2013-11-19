//contains the world and all the things within it
var Here = function() {
    this.previous = {};
    this.current = {};
};

var Location = function (name) {
    this.name = name;
    this.places = {};
    this.people = [];
};

Location.prototype.enter = function(traveller) {
    traveller = traveller || player;
    var x = 5;
    var y = 5;
    var current = traveller.location.current;
    for ( var i in this.places) {
        var local = this.places[i];
        stage.addButtons(local.name,local.enter,x,y);
        if ( y <= 400) {
            y += 25;
        }
        else {
            y = 5;
            x += 50;
        }
        stage.addButtons('Back->'+current.name, current.enter, 250, 450);
    }
    
};