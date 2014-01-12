//The advisor gives hints during breaks to help the player

var Advisor = function() {
    this.downLeft   = [
        'Don\'t let them get too excited.'
    ];
    this.downRight  = [
        'You need to cool their temper.'
        ];
    this.upLeft     = [
        'Get them excited about their prospects.'
        ];
    this.upRight    = [
        'They\'re too confident. Bring them down a notch'
        ];
};

Advisor.prototype.getSaying = function(key) {
    var lines = this[key];
    var index = Math.round( Math.random()*(lines.length-1) );
    return lines[index];
};

Advisor.prototype.getAdvice = function(rival,topic) {
    var index = '';
    if (rival.emotion[0] > topic.target[0]) {
        index += 'up';
    }
    else {
        index += 'down';
    }
    if (rival.emotion[1] > topic.target[1]) {
        index += 'Left';
    }
    else {
        index += 'Right';
    }
    return this.getSaying(index);
};