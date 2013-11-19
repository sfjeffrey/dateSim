//contains methods related to all characters such as dialogue and schedule

var Character = function(name,schedule,dialogue,prospect,story) {
    this. name = name;
    this.schedule = schedule;
    this.dialogue = dialogue;
    this.prospect = prospect || null;
    this.story = story || null;
};

Character.prototype.getLocation = function(day) {
    day = day || 'weekDay';
    var time = gameState.getTime();
    return this.schedule[day][time];
};