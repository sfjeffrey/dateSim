//Class for the date modules
//Passion/intimacy/commitment are the score potentials for each emotion on that
//module.
//Length is how much time in game time the module is worth.
//Price is the amount of in game money required for the date.
//Timing is a boolean value determining if the module is time sensitive.
//X and Y are cooridinates for the date on the Dating map. Used to determine distance 
//  between modules for travel time.
var DateModule = function (name,passion,intimacy,commitment,length,price,timing,x,y) {
    this.name = name;
    this.passion = passion;
    this.intimacy = intimacy;
    this.commitment = commitment;
    this.length = length;
    this.price = price;
    this.timing = timing;
    this.cooridinates = [x,y];
    this.timing = timing;
};

//Accepts 2 element array of cooridinates and returns the distance to this date module;
DateModule.prototype.distance = function(cooridinates) {
    var aX = cooridinates[0];
    var aY = cooridinates[1];
    var bX = this.cooridinates[0];
    var bY = this.cooridinates[1];
    
    var width  = Math.abs( aX - bX );
    var height = Math.abs( aY - bY );
    var distance = Math.round( Math.sqrt( (width*width) + (height*height))*10)/10;
    return distance;
};

