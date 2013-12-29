//contains the objects building the travellable world.

var hubWorld = new Location('Hub');

hubWorld.push('School').push('Home').push('Work');
hubWorld.places.home.push('Upstairs');
hubWorld.places.school.addPeople(characterList[0]);