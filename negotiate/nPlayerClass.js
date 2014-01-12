//negotiating player class

var Negotiator = function() {
    this.warRep = 0;
    this.peaceRep = 0;
    this.dateRep = 0;
    this.sexRep = 0;
    this.advisor = new Advisor();
    
    this.money = 0;
    this.experience = 0;
    
    this.empathy     = 2;
    this.reading     = 2;
    this.discernment = 2;
    
    this.socialMoves = {
        flatter     : [25,25],
        compliment  : [10,10],
        placate     : [25,-25],
        calm        : [10,-10],
        insult      : [-25,25],
        criticise   : [-10,10],
        depress     : [-25,-25],
        demoralize  : [-10,-10]
    };
    this.socialSpecials = {
        reason : function (n) {
            var a = Math.abs(n.rival.emotion[0] - (-50));
            var b = Math.abs(n.rival.emotion[1] - (-50));
            var c = Math.round(Math.sqrt( (a*a)+(b*b) ));
            var mod = (1 - Math.round( c)/100)/2;
            if (mod > 0) {
                stage.gameMessage('The '+n.rival.name+' is seeing reason.');
            }
            else {
                stage.gameMessage('Your argument has backfired on the '+n.rival.name+'.');
            }
            console.log(mod);
            n.rival.amicability += mod*n.rival.amicability;
            if(n.rival.amicability < 1) { n.rival.amicability=1;}
        },
        emotionalPlea : function (n) {
            var a = Math.abs(n.rival.emotion[0] - 50);
            var b = Math.abs(n.rival.emotion[1] - 50);
            var c = Math.round(Math.sqrt( (a*a)+(b*b) ));
            var mod = (1 - Math.round(c)/100)/2;
            if (mod > 0) {
                stage.gameMessage('The '+n.rival.name+' is swayed by your plea.');
            }
            else {
                stage.gameMessage('The '+n.rival.name+' has reacted negatively.');
            }
            console.log(mod);
            n.rival.amicability += mod*n.rival.amicability;
            if(n.rival.amicability < 1) { n.rival.amicability=1;}
        },
    };
};

Negotiator.prototype.speak = function(move) {
    return this.socialMoves[move];
};

Negotiator.prototype.inspect = function(rival,dispute) {
    
    /*var lowRes = function (value,skill) {
        var mod = 200/skill;
        var output = Math.floor( (value+100)/mod )*mod;
        return output < 100 ? output : output-mod;
    };*/
    
    lowRes = function(n,skill) {
        var output = n - (n%(200/skill));
        return output < 100 ? output : output-(200/skill);
    }
    
    var output = {};
    var pXOffset = lowRes(rival.personality[0]*10+100,this.reading);
    var pYOffset = lowRes(rival.personality[1]*10+100,this.reading);
    var pSize    = Math.floor(200/this.reading);
    
    var eXOffset = lowRes(rival.emotion[0]+100,this.empathy);
    var eYOffset = lowRes(rival.emotion[1]+100,this.empathy);
    var eSize    = Math.floor(200/this.empathy);
    
    var tXOffset = lowRes(dispute.target[0]+100,this.discernment);
    var tYOffset = lowRes(dispute.target[1]+100,this.discernment);
    var tSize    = Math.floor(200/this.discernment);
    
    output.personality = { 
        width  : pSize+'px',
        height : pSize+'px',
        left   : pXOffset+'px',
        bottom    : (pYOffset)+'px'
    };
    output.emotion = { 
        width  : eSize+'px',
        height : eSize+'px',
        left   : eXOffset+'px',
        bottom    : (eYOffset)+'px'
    };
    output.target = { 
        width  : tSize+'px',
        height : tSize+'px',
        left   : tXOffset+'px',
        bottom    : (tYOffset)+'px'
    };
    
    return output;
};

Negotiator.prototype.reward = function(reward) {
    for (var i in reward) {
        this[i] += reward[i];
        stage.gameMessage(reward[i]+' '+i+' earned!');
    }
};
Negotiator.prototype.max = function() {
    this.empathy = 10;
    this.reading = 10;
    this.discernment=10;
}