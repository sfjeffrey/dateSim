//script for controlling the stage in the negotiation game.

var $textBox;
var $buttonBox;
var $hoverBox;
var stage = {};

var player;
var rival;
var dispute;
var joe = { 
    name:'joe',
    valence     : 10,
    energy      : 10,
    composure   : 10,
    amicability : 10
};


var go = function() {
    player.reading = 10;
    player.discernment = 10;
    player.empathy = 10;
};

stage.gameMessage = function (string) {
    $textBox.prepend(string+'<br>');
};

stage.setChoices = function(choices,values,func) {
    $buttonBox.empty();
    for (var i in choices) {
        $buttonBox.append('<div id="choice'+i+'" class="talkButton">'+choices[i]+'</div>');
        $('#choice'+i).data('score',values[i]).click(func);
    }
};

stage.addChoice = function(choices,values,func) {
    var i = values;
    $buttonBox.append('<div id="choice'+i+'" class="talkButton">'+choices+'</div>');
    $('#choice'+i).data('score',values).click(func);
        
};

stage.readDispute = function(dispute) {
    var string = 'The dispute is as follows:<br>';
    for (var i in dispute.topics) {
        var topic = dispute.topics[i];
        string += 'In the matter of the '+topic.name+' you must negotiate a deal\
        that is at least '+(topic.objective*100)+'% favorable.<br>';
    }
    string += "If all conditions are met you will be paid $"+dispute.reward.money;
    return string;
};

////////////////////////////////////////////////////////////////////////////////
//                            DOCUMENT READY FUNCTION
////////////////////////////////////////////////////////////////////////////////
$(document).ready( function() {
    $textBox   = $('.textBox');
    $buttonBox = $('.buttonBox');
    
    player = new Negotiator();
    
    makeQuests();
    
});