var menu = {};

menu.openMenu = function() {
    $textBox.empty();
    $buttonBox.empty();
    stage.gameMessage('Empathy helps locate your rival\'s current emotional state');
    stage.gameMessage('Discernment helps locate the emotion your rival must be to win the negotiation');
    stage.gameMessage('Reading helps determine your rival\'s personality.');
    stage.gameMessage('Money: '+player.money);
    stage.gameMessage('Experience: '+player.experience);
    
    if (player.experience >= (player.reading*1000)) {
        stage.addChoice('Reading '+player.reading+' : '+(player.reading*1000),
        'reading',function() {
            player.experience -= 1000* player.reading;
            player.reading += 1;
            menu.openMenu();
        });
    }
    if (player.experience >= (player.empathy*1000)) {
        stage.addChoice('Empathy '+player.empathy+' : '+(player.empathy*1000),
        'empathy',function() {
            player.experience -= 1000* player.empathy;
            player.empathy += 1;
            menu.openMenu();
        });
    }
    if (player.experience >= (player.discernment*1000)) {
        stage.addChoice('Discernment '+player.discernment+' : '+(player.discernment*1000),
        'discernment',function() {
            player.experience -= 1000* player.discernment;
            player.discernment += 1;
            menu.openMenu();
        });
    }
    stage.addChoice('Find work','quests',function() { makeQuests(); });
};

menu.findQuests = function() {
    stage.addChoice('Find work','quests',function() { makeQuests(); });
};

menu.buttons = function() {
    this.find
}