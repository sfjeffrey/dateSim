//contains the world and all the things within it

var Location = function (name,parent) {
    this.name = name;
    this.places = {};
    this.people = [];
    this.parent = parent || false;
};

Location.prototype.enter = function() {
    var x = 5;
    var y = 5;
    $('.textBox').empty();
    
    var clickFunction = function(local) {
        var func = function() {
            local.enter();
        };
        return func;
    };
    
    for ( var i in this.places) {
        var local = this.places[i];
        stage.addButtons(local.name,clickFunction(local),i,x,y);
        if ( y <= 400) {
            y += 35;
        }
        else {
            y = 5;
            x += 50;
        }
    }
    if (this.parent) {
        stage.addButtons(this.parent.name, clickFunction(this.parent),'back', 250, 450);
    }
    player.location = this;
};

//Function takes the name of a new location and adds it to the current location's
//list of places. Returns the new location.
Location.prototype.push = function(name) {
    var index = name.toLowerCase().replace(/ /g,'');
    this.places[index] = new Location(name,this);
    return this;
};

//Function adds a person to 
Location.prototype.addPeople = function(person) {
    if (person.constructor === Array) {
        for (var i in person) {
            this.people.push(person[i]);
        }
    }
    else if (person.constructor === Character) {
        this.people.push(person);
    }
    return this;
};

//function displays the available characters for interaction
Location.prototype.getPeople = function() {
    $('.buttonBox').empty();
    $('.textBox').empty();
    for (var i in this.people) {
        stage.addChoices(this.people[i].name, function() {
            $(this).data('value').speak();
        },this.people[i]);
    }
    stage.addChoices('Return',stage.gameModeButtons);
};





