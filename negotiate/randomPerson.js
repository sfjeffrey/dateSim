var people = [
"acquaintance","admirer","adolescent","adult","adversary","ally","amigo","ancestor",
"angel","antagonist","anybody","anyone","apparition","associate","baby","backer",
"beau","benefactor","best friend","boy","boyfriend","bride","bridegroom","brother",
"bud","buddy","champion","character","cherub","child","children","chum","citizen",
"clan","classmate","cohort","collaborator","colleague","combatant","compadre",
"companion","comrade","confederate","confidant","contact","C cont.","coworker",
"crew","crony","customer","descendant","doppelganger","dude","employee","enemy",
"everybody","everyone","family","fellow","fiance","fiancee","flatmate","foe","folks",
"freshman","friend","gent","gentleman","girl","girlfriend","groom","grown-up",
"guy","house-mate","human","human being","individual","infant","inhabitant","in-law",
"junior","kid","kin","kith","lad","laddie","lady","lass","lassie","lover","man",
"mate","men","minor","mortal","neighbor","newborn","nobody","no one","occupant",
"opponent","pal","partner","patron","people","person","populace","population","preteen",
"rank and file","relations","relative","resident","retiree","rival","roommate",
"schoolboy","schoolgirl","schoolmate","senior","sidekick","sister","socialite",
"somebody","someone","sophomore","soul","sponsor","spouse","steady","stranger",
"supporter","sweetheart","teammate","teen","teenager","toddler","tot","tribe","tween",
"tyke","urchin","well-wisher","woman","women","workmate","youngster","youth"
];

var adjectives = [
"broad","crooked","curved","deep","even","flat","hilly",
"jagged","round","shallow","square","steep","straight","thick","thin","triangular",
"uneven","bitter","bland","delicious","different","fresh","greasy","hot","juicy",
"repulsive","revolting","ripe","rotten","salty","sour","spicy","stale","strong","sweet",
"tasteless","tasty","terrible","wonderful","blunt","boiling","breakable","breezy","broken",
"bumpy","chilly","clean","cold","cool","crooked","cuddly","curly","damaged","damp",
"different","dirty","dry","dusty","filthy","flaky","fluffy","fuzzy","greasy","grubby","hard",
"icy","loose","plastic","prickly","ripe","rough","rubbery","scratchy","shaky","shaggy",
"sharp","silky","slimy","slippery","smooth","soft","solid","steady","sticky","tight",
"uneven","unusual","unripe","warm","weak","wet","wooden","wooly","adorable","alert",
"average","beautiful","blonde","bloody","blushing","bright","clean","clear","cloudy",
"colourful","concerned","crowded","curious","cute","dark","dirty","drab","distinct","dull",
"elegant","fancy","filthy","glamorous","gleaming","graceful","grotesque","homely",
"light","misty","motionless","muddy","plain","poised","quaint","scary","shiny",
"smoggy","sparkling","spotless","stormy","strange","ugly","unsightly","unusual",
];

var objects = [
"attic","basement","bath tub","bathroom","bed",
"bedroom","blanket","bookcase","carpet","ceiling","chair","closet","couch","curtain",
"desk","dining room","door","fan","floor","furniture","garage","hall","hallway",
"key","kitchen","lamp","living room","lock","mirror","picture","porch","roof",
"room","rug","shelf","sink","sofa","stairs","table","toilet","wall","window",
"airplane","bicycle","boat","bus","car","helicopter","horse","jet","motorcycle","ship",
"subway","taxi","train","truck","airplane","bicycle","boat","bus","car","helicopter",
"horse","jet","motorcycle","ship","subway","taxi","train","truck","beach","desert",
"forest","hill","mountain","ocean","pond","river","lake","sea","stream","valley",
"waterfall","woods","account","bills","borrow","alarm","cash","cashier","check","coins",
"credit","credit card","currency","customer","deposit","interest","lend","loan",
"manager","money","mortgage","pay","save","savings","guard","teller","vault","withdraw"
];

var makeName = function() {
    var adj = Math.round(Math.random()*adjectives.length);
    var noun = Math.round(Math.random()*people.length);
    return (adjectives[adj]+' '+people[noun]);
};

var makeTitle = function() {
    var adj = Math.round(Math.random()*adjectives.length);
    var noun = Math.round(Math.random()*objects.length);
    return (adjectives[adj]+' '+objects[noun]);
};


var makeRival = function() {
    var output = {};
    output.name = makeName();
    output.valence = Math.round( Math.random()*10 );
    output.energy = Math.round( Math.random()*10 );
    output.composure = Math.round( Math.random()*25 );
    output.amicability = Math.round( Math.random()*125 )+25;
    return output;
};

var makeTopic = function() {
    var name = makeTitle();
    var tValence  = Math.round( Math.random()*200 )-100;
    var tEnergy   = Math.round( Math.random()*200 )-100;
    var objective = (Math.round( Math.random()*100 )/100);
    var reward    = { experience : Math.round( Math.random()*100 ) + 100*objective };
    
    return new DisputeTopics(name,tValence,tEnergy,reward,objective);
};

var makeDispute = function() {
    var rival = makeRival();
    var nTopics = Math.round(Math.random()*5)+1;
    var topics = [];
    var sumReward = 0;
    for (var i = 0;i <= nTopics; ++i) {
        topics.push( makeTopic() );
        sumReward += topics[i].reward.experience;
    }
    var iValence = Math.round( Math.random()*200 )-100;
    var iEnergy  = Math.round( Math.random()*200 )-100;
    var reward = Math.round((sumReward/2) + (1000 / rival.amicability));
    reward = reward === Infinity ? 1000 : reward;
    reward = {money : reward, experience : reward};
    
    return { rival : rival, dispute : new Dispute(iValence,iEnergy,reward,topics)};
};

var makeQuests = function() {
    $buttonBox.empty();
    for ( var i = 1; i <= 3; ++i) {

        var dispute = makeDispute();
        stage.addChoice(dispute.rival.name+' : $'+dispute.dispute.reward.money,i,function() {
            var dispute = $(this).data('score');
            stage.gameMessage( stage.readDispute(dispute.dispute) );
            negotiationGame.initiate(player,dispute.rival,dispute.dispute);
        })
        $('#choice'+i).data('score',dispute);
    }
    stage.addChoice('Keep looking','quests',function() { makeQuests(); });
    stage.addChoice('Level Up','level',function() { menu.openMenu(); });
}