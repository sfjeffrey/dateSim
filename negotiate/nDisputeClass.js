//class for the negotiations

var Dispute = function(initVal,initEng,reward,topics ) {
    this.topics = topics;
    this.initEmotion = [initVal,initEng];
    this.reward = reward;
};

//class for the topics within each dispute.
var DisputeTopics = function(name,tValence,tEnergy,reward,objective) {
    this.name = name;
    this.target = [tValence,tEnergy];
    this.reward = reward;
    this.objective= objective;
    this.complete = 0;
};