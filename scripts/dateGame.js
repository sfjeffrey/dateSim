//The date game begins by selecting a set of modules. The first and last modules
//are how the date begins and ends, and are determined by the nature of your relationship
//The middle modules are less constrictive.
//The modules are selected and put in a desired order. As the date progresses through time
//the player is scored on how well they can transition through the different modules.

var dateGameObject = {
    pasDifficulty   : 0,
    intDifficulty   : 0,
    comDifficulty   : 0,
    
    pasBonus        : 0,
    intBonus        : 0,
    comBonus        : 0,
    
    date            : {},
    plan            : [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
};

dateGameObject.start = function(date) {
    
    $('.textBox').empty();
    stage.gameMessage('Starting date:');
    stage.gameMessage('How will you meet your date?');
    stage.addChoices('Meet',function() {
        var meet = prompt('Where to meet?\n(X,Y)').split(',').forEach(function(e,i,a) {
            a[i] = parseInt(e,10);
        });
        var time = prompt('when?\n(hh:mm').split(':').forEach(function(e,i,a) {
            a[i] = parseInt(e,10);
        });
        time = time[0]*2 + (time[1] < 30 ? 0 : 1);
        dateGameObject.addModule('Meet at Location',0,0,1,0,0,true,meet[0],meet[1],time);
    });
    if ( date.intimacy > 20) {
        stage.addChoices('Pick up',function() {
        
        var time = prompt('when?\n(hh:mm').split(':').forEach(function(e,i,a) {
            a[i] = parseInt(e,10);
        });
        time = time[0]*2 + (time[1] < 30 ? 0 : 1);
        dateGameObject.addModule('Meet at Location',0,0,1,0,0,true,date.home[0],date.home[1],time);
    });
    }
    
};


//this function adds date nodes to the date game;
dateGameObject.addModule = function (name,passion,intimacy,commitment,length,price,timing,x,y,time) {
    this.plan[time] = new DateModule(name,passion,intimacy,commitment,length,price,timing,x,y);
};

//this function runs the minigame based on a module
dateGameObject.playActivity = function(node) {
    var difficulty = (this.pasDifficulty + this.intDifficulty + this.comDifficulty)/3;
    var bonus = 
    
};






