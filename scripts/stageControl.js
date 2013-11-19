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
        if (WorldList.base[choices[i]] instanceof BasicItem) {
            $('#'+choices[i]).html( WorldList.base[choices[i]].name);
        }
        if (characters[choices[i]] instanceof Character) {
            $('#'+choices[i]).html( characters[choices[i]].name);
        }
    }
};

//Like setChoices, but does not empty the buttonBox first. Can be used to add
//multiple buttons with the same function, or buttons with different functions
//one at a time.
stage.addChoices = function (choices, func, value){
    value = value || choices;
    var name = choices;
    choices = choices.toString();
    while ( typeof name === 'string' && name.contains(' ')) {
        name = name.replace(' ','_');
    }
    $('.buttonBox').append('<div class="button" id="'+name+'">'+choices+'</div>');
    $('#'+name).data('value', value);
    $('#'+name).click(func);
    if (WorldList.base[choices] instanceof BasicItem) {
        $('#'+choices).html( WorldList.base[choices].name);
    }
    if (characters[choices] instanceof Character) {
        $('#'+choices).html( characters[choices].name);
    }
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
    gameState.setState('mapState');
    $('.buttonBox').empty();
    mapList.worldMap.printMap();
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
    value = value || choices;
    var name = choices;
    choices = choices.toString().replace(/ /g,'_');
    
    $('.textBox').append('<div class="button" id="'+name+'">'+choices+'</div>').css('left',x).css('top',y);
    $('#'+name).data('value', value);
    $('#'+name).click(func);
    if (WorldList.base[choices] instanceof BasicItem) {
        $('#'+choices).html( WorldList.base[choices].name);
    }
    if (characters[choices] instanceof Character) {
        $('#'+choices).html( characters[choices].name);
    }
};


stage.getObjectives = function () {
    gameState.checkObjectives();
};

stage.waitButton = function () {
    gameState.doAnything = true;
    gameState.forwardTime();
    stage.gameModeButtons();
};

stage.sleepButton = function () {
    for (var i=0; i < 8; ++i ){

        gameState.doAnything = true;
        gameState.forwardTime();
        if (gameState.hour === 0) { break;}
    }
    stage.gameModeButtons();
};

stage.setClock = function (hour) {
    var minute = (Math.floor((hour - Math.floor(hour)) * 60)).toString();
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    var time = (Math.floor(hour) + ':' + minute);
    $('#clock').html(time);
    $('#calender').html(' Day '+gameState.day);
};

stage.gameOver = function() {
    stage.setChoices();
    $('.textBox').empty();
    alert('Game Over');
    
};
//****************************************************************************
//document ready function
//****************************************************************************
$(document).ready(function(){
    stage.gameModeButtons();
    $('#backpack').click(stage.backpack);
    $('#objectives').click(stage.getObjectives);
    $('#wait').click(stage.waitButton);
    $('#sleep').click(stage.sleepButton);
        
});s