//class for the character you're negotiating with

var Rival = function(obj) {
    this.name           = obj.name;
    this.personality    = [obj.valence,obj.energy],
    this.composure      = obj.composure;
    this.amicability    = obj.amicability > 0 ? obj.amicability : 3;
    
    this.emotion = [0,0];
    this.tolerance = 100;
    
    this.phrases = [
        'You don\'t say!',
        "Well I never",
        "When you put it like that",
        "That's an awesome opinion",
        "How strangely erotic",
        "Like no wai",
        "Yup."
        ];
};


//returns a value for the response the rival has to the proposed offer
Rival.prototype.getAgreement = function (offer,target) {
    if (isNaN(offer)) {
        offer = '1.0';
    }
    console.log('offer: '+offer);
    console.log('target: '+target);
    offer = parseFloat(offer,10);
    target[0] = parseFloat(target[0],10);
    target[1] = parseFloat(target[1],10);
//  compares the current emotional state to the target and returns a value equal
//  to the distance between them on a graph
    var x = Math.abs( target[0] - this.emotion[0] );
    var y = Math.abs( target[1] - this.emotion[1] );
    var distance = Math.round( Math.sqrt( (x*x)+(y*y) ) );
    console.log('distance: '+distance);
    console.log('amicability: '+this.amicability);
//  the percentile is the distance over the amicaility.
    var percentile = 1 - (distance/this.amicability);
    console.log('percentile: '+percentile);
//  The potential counter off to be presented on a failed attempt
    var counter = percentile + (percentile * 0.2);
    
//  If the offer is more ambitious than the relative measurement of the distance
//  the offer is rejected
    if (percentile < offer) {
        this.speak("I don't think so. How's this instead?");
        console.log('counter: '+counter);
        return counter;
    }
//  otherwise the offer is accepted
    else {
        this.speak('Very well. I accept.');
        return 0;
    }
};

Rival.prototype.react = function(valence,energy) {
    this.emotion[0] += this.personality[0] + valence;
    this.emotion[1] += this.personality[1] + energy;
    this.tolerance -= 10;
    
//  normalizing values
    this.emotion[0] = this.emotion[0] > 100 ? 100 : this.emotion[0];
    this.emotion[1] = this.emotion[1] > 100 ? 100 : this.emotion[1];
    this.emotion[0] = this.emotion[0] < -100 ? -100 : this.emotion[0];
    this.emotion[1] = this.emotion[1] < -100 ? -100 : this.emotion[1];
    
    this.speak( this.phrases[Math.round(Math.random()*this.phrases.length)]);
    
//  Checks if rival is willing to continue the negotiations.
    if (this.tolerance <= 0) {
        this.speak("I can't take this! We're done!");
        return false;
    }
    else {
        return true;
    }
    
};

Rival.prototype.speak = function(string) {
    stage.gameMessage('<rival>'+string+'</rival>')
};


