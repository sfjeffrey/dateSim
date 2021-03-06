var harvestGameObject   = harvestGameObject || null;
var petGameObject       = petGameObject     || null;
var shopGameObject      = shopGameObject    || null;
var storeGame           = storeGame         || null;
var player              = player            || null;
var Creature            = Creature          || null;
var gameState           = gameState         || null;
var characters          = characters        || null;
var Shop                = Shop              || null;
var WorldList           = WorldList         || null;
var BasicItem           = BasicItem         || null;
var Character           = Character         || null;
var mapList             = mapList           || null;



var stage = {};
//this function sets the buttons in the button box and gives them a click function
//first argument is an array of strings. Second is a function carried by the
//button. Each string is the ID and the DATA of that button. All buttons enact the
//same function.
stage.setChoices = function (choices, func){
    $('.buttonBox').empty();
    for (var i in choices){
        $('.buttonBox').append('<div class="button" id="'+choices[i]+'">'+choices[i]+'</div>');
        $('#'+choices[i]).data('value', choices[i]);
        $('#'+choices[i]).click(func);

    }
};

//Like setChoices, but does not empty the buttonBox first. Can be used to add
//multiple buttons with the same function, or buttons with different functions
//one at a time.
stage.addChoices = function (choices, func, value){
    value = value || choices;
    var name = choices;
    choices = choices.toString();
    name.replace(/ /g,'_');
    $('.buttonBox').append('<div class="button" id="'+name+'">'+choices+'</div>');
    $('#'+name).data('value', value);
    $('#'+name).click(func);
};

//function adds messages to the text box.
stage.gameMessage = function (string){
    if ($('.textBox').children().length > 37){
        $($('.textBox').children()[0]).remove();
    }
    $('.textBox').append('<div>'+string+'</div>');
};

//function sets the buttons to game mode buttons
stage.gameModeButtons = function(){
    $('.buttonBox').empty();
    stage.addChoices('People',function() {
        player.location.getPeople();
        stage.addChoices('Return',stage.gameModeButtons);
    });
    
};

//function sends a game message revealing the player's items and cash
stage.backpack = function(){
    stage.gameMessage('You have $'+player.money);
    stage.gameMessage('In your inventory you have:');
    var items = player.inventory.getItems();
    for (var i in items) {
        var itemName = WorldList.base[items[i][0]].name;
        stage.gameMessage(itemName+'......'+items[i][1]);
    }
};

//function adds buttons to the stage area
stage.addButtons = function (choices, func, value, x, y){
    choices = choices || 'Back';
    value = value || choices;
    var name = choices || 'Back';
    choices = choices.toString().replace(/ /g,'_');
    
    $('.textBox').append('<div class="button" id="'+name+'">'+choices+'</div>');
    
    $('#'+name).data('value', value).css('position','absolute');
    $('#'+name).data('value', value).css('left',x);
    $('#'+name).data('value', value).css('top',y);
    $('#'+name).click(func);
};



stage.waitButton = function () {
    //needs update
};


stage.setClock = function (hour) {
    //needs update
};

//****************************************************************************
//document ready function
//****************************************************************************
$(document).ready(function(){
    $('#backpack').click(stage.backpack);
    $('#objectives').click(stage.getObjectives);
    $('#wait').click(stage.waitButton);
    $('#sleep').click(stage.sleepButton);
    hubWorld.enter();
    stage.gameModeButtons();
        
});