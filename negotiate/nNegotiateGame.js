//class controlling the actual negotiation game.

var negotiationGame = {
    rival    : {},
    player   : {},
    dispute  : {},
    curTopic : {},
    offer    : 0.5,
    breaks   : 0
};

//ok so we start with picking a topic

//begins the negotiation game
negotiationGame.initiate = function(player,rival,dispute) {
    this.player   = player;
    this.rival    = new Rival(rival);
    this.dispute  = dispute;
    this.topicList();
};

//sets the current offer to value or prompts for a value;
negotiationGame.setOffer = function(value) {
    value = value || prompt('Percentile offer. 0.0 - 1.0');
    value = parseFloat(value,10);
    negotiationGame.offer = value;
    $('.offerBox').html( Math.floor(value*100)+'%');
    return value;
};

//this function prepares the buttons for the different topics
negotiationGame.topicList = function() {
    var choices = [];
    var values = [];
    var gameOver = true;
    for (var i in this.dispute.topics) {
        if (this.dispute.topics[i].complete !== 0) { continue; }
        gameOver = false;
        choices.push(this.dispute.topics[i].name);
        values.push(i);
    }
    if (gameOver) {
        this.gameOver();
        return;
    }
    stage.setChoices( choices, values, this.openTopic );
};

//Opens the topic according to the JQ's data, and presents the opening offer
negotiationGame.openTopic = function() {
    var topic = $(this).data('score');
    topic = negotiationGame.dispute.topics[topic];
    negotiationGame.curTopic = topic;
    negotiationGame.makeOffer(topic);
    $('.infoBox').html( topic.name+'<br>'+topic.objective );
};

//checks if the rival accepts the latest proposal
negotiationGame.isAccepted = function(topic) {
    var output = this.rival.getAgreement(this.offer,this.curTopic.target);
    return output;
};

//Function lists the negotiating options
negotiationGame.getPlayerMoves = function(dir,topic) {
    var dir = dir || 'main';
    $buttonBox.empty();
    this.setRadar();
    if (dir === 'main') {
        stage.addChoice('Negotiate','negotiate',function() {
            negotiationGame.getPlayerMoves('negotiate');
        });
        stage.addChoice('Specials','specials',function() {
            negotiationGame.getPlayerMoves('specials');
        });
        stage.addChoice('Make Offer','offer',function() {
            negotiationGame.makeOffer();
        });
        stage.addChoice('Accept Deal','accept',function() {
            negotiationGame.endTopic();
        });
        stage.addChoice('Take a Break','break',function() {
            negotiationGame.takeBreak();
        });
    }
    else if (dir === 'negotiate') {
        for (var i in this.player.socialMoves) {
            stage.addChoice(i,i,this.negotiate).mouseover(function(e) {
                var string = player.socialMoves[$(this).data('score')].description;
                stage.floatMessage(string,e);
            });
        }
    }
    else if (dir === 'specials') {
        for (var i in this.player.socialSpecials) {
            stage.addChoice(i,i,function() {
                var i = $(this).data('score');
                negotiationGame.useSpecial(i);
            });
        }
    }
};

//function for making an offer to the rival
negotiationGame.makeOffer = function(topic) {
    this.setOffer();
    var acceptance = negotiationGame.isAccepted(topic);
    if (acceptance === 0) {
        this.endTopic();
    }
    else {
        this.setOffer(acceptance);
        this.getPlayerMoves('main',topic);
    }
    
};

negotiationGame.negotiate = function () {
    move = $(this).data('score');
    var score = negotiationGame.player.speak(move);
    var outcome = negotiationGame.rival.react(score[0],score[1]);
    if (outcome) {
        negotiationGame.getPlayerMoves();
    }
    else {
        negotiationGame.gameOver();
    }
};

//sets the radar box based on the return of the player's inspection ability
negotiationGame.setRadar = function() {
    var topic = this.curTopic;
    var css = this.player.inspect(this.rival,topic);
    $('#personality').css(css.personality);
    $('#emotion').css(css.emotion);
    $('#target').css(css.target);
    
};

negotiationGame.endTopic = function() {
    if (this.offer >= this.curTopic.objective) {
        this.curTopic.complete = 1;
    }
    else {
        this.curTopic.complete = -1;
    }
    this.topicList();
}

negotiationGame.gameOver = function(over) {
    if (over !== undefined) {
        for (var i in this.dispute.topics) {
            if (!this.dispute,topics[i].complete) {
                this.topicList();
                return;
            }
        }
    }
    $buttonBox.empty();
    $textBox.empty();
    stage.gameMessage('Negotiation Complete');
    stage.addChoice('Continue','cont',function() { makeQuests();});
    console.log('flank');
    var complete = true;
    for (var i in this.dispute.topics) {
        var t = this.dispute.topics[i];
        if (t.complete <= 0) {
            complete = false;
            break;
        }
        this.player.reward(t.reward);
        stage.gameMessage('For your success in the '+t.name+' you receive...');
        
    }
    if (complete) {
        this.player.reward(this.dispute.reward);
        stage.gameMessage('For overall success in this negotiation you receive...');
    }
    else {
        stage.gameMessage('You did not succeed in all the points.')
    }
    
};

negotiationGame.useSpecial = function(key) {
    this.player.socialSpecials[key](this);
    this.getPlayerMoves('main',this.curTopic);
};

negotiationGame.takeBreak = function() {
    this.rival.speak("Yes let's take a break.");
    var mod = 1 - (0.2 * this.breaks);
    var bonus = (100 - this.rival.tolerance) * mod;
    this.rival.tolerance += bonus;
    this.breaks += 1;
    $('.adviceBox').html( this.player.advisor.getAdvice(this.rival,this.curTopic) );
};
//Function for when the player makes a negotiation move.
/*
then you present your first offer
check if accepted
    if accepted game over
    else rival presents counter offer
chose to accept or negotiate
    if you accept, game over
    else you negotiate 
present the negotiation options (negotiation options are)
    various negotiating tactics which move rival's emotions around
    special moves with different affects and limited uses
    present a new offer
        loop to "present your first offer"
    accept current proposal
        game over
    take a break (get tips from npc, regenerate rival's tolerance)
if continuing check if rival's tolerance
    if 0 game over
    else loop to "negotiating options"

Upon game over
    check if deal meet mission minimum
        if not mission failed
        else missions success
            reward player
            if deal exceeds minimum
                reward bonus points
 */

