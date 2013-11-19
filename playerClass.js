//stores the stats, inventory object, and other pertinant information related
//to the player.

var Player = function(name,passion,intimacy,commitment) {
    this.name       = name;
    
    //these are the personality stats
    this.passion    = passion;
    this.intimacy   = intimacy;
    this.commitment = commitment;
    
    //these are the attribute stats
    this.sexuality = 5;
    this.empathy = 5;
    this.maturity = 5;
    
    //these are the bonuses and penalties awarded for extreme starting stats
    //passion
    if (passion < 12) {
        this.sexuality -= 1;
        if (passion === 0) {
            this.sexuality -= 1;
        }
    } 
    else if (passion > 88) {
        this.sexuality += 1;
        if (passion === 100) {
            this.sexuality += 1;
        }
    }
    //intimacy
    if (intimacy < 12) {
        this.empathy -= 1;
        if (intimacy === 0) {
            this.empathy -= 1;
        }
    } 
    else if (intimacy > 88) {
        this.empathy += 1;
        if (intimacy === 100) {
            this.empathy += 1;
        }
    }
    //commitment
    if (commitment < 12) {
        this.maturity -= 1;
        if (commitment === 0) {
            this.maturity -= 1;
        }
    } 
    else if (commitment > 88) {
        this.maturity += 1;
        if (commitment === 100) {
            this.maturity += 1;
        }
    }
    
};