//this is the class for the prospective dates in the game.

var Prospect = function(name,passion,intimacy,commitment,story) {
    this.name = name;
    this.passion = passion;
    this.intimacy = intimacy;
    this.commitment = commitment;
    
    //the story method is an object which contains all the scripted story elements
    //aswell as all the conversations
    this.story = story;
    
    this.progress = {
        passion     : 0,
        intimacy    : 0,
        commitment  : 0
    };
};
    