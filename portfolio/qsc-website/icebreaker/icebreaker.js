//Jan 19
//Story technical flowchart is complete, just started on implementation
//Node order below is based on a preorder type of flowchart traversal
//finished data for all nodes

//Todo:
//need to fix level system for backtracking
//general QOL changes
//need gifs for each node
var lvlCount = 0, topScore = 0;
var loseString = '';
var visited = []//array of stages visited
//Game Object

var game = [
	//Level 0
	{
		key: "start",
		title: "Exiting the Earth's Atmosphere",
		header: "Pick your trajectory",
		story: "At the outermost layer of the Earth’s atmosphere, you must make your first decision as captain of the crew. There are three possible paths to choose from each with their own hazardous conditions. Which path do you choose?",
		img: "img/2019/space.gif",
		options: [{ txt: "The path containing a black hole ", link: 'end' },
		{ txt: "The path containing an asteroid of unknow proportions", link: 'a1' },
		{ txt: "The path containing supersonic solar winds", link: 'b1' }],
		endText: "Oh no! Your crew is sucked into the black hole by its inescapable gravitational pull. "

	},
	//test node
	{
		key: "test",
		title: "test",
		header: "Test",
		story: ("You survived " + getlvlCount() + " levels" + "\n" + loseString),
		img: "img/explosion.gif",
		options: [{ txt: "a1", link: 'a1' }]

	},
	//Lose
	{
		key: "end",
		title: "Mission Failed!",
		header: "Oh No! :(",
		story: ("You survived " + getlvlCount() + " levels" + "\n" + loseString),
		img: "img/2019/gameover.gif",
		options: [{ txt: "Restart", link: 'start' }]

	},
	//Win
	{
		key: "win",
		title: "Victory!!! Mission Complete",
		header: "Space Conference Champions!",
		story: "You have landed on Kepler-1649c! Your mission is complete! Congratulations!",
		img: "img/win.gif",
		options: [{ txt: "Restart", link: 'start' }]

	},
	//Dwarf planet::
	{
		key: "a1",
		title: "Asteroid",
		header: "Sucessfully Avoided!",
		story: "The asteroid is only about one meter in diameter and your crew avoids it. You have now exited Earth’s atmosphere. " +
			"You receive word from ground control that there was a minor fuel leak before launch, and you must now find a source of fuel in space. Choose a planet or a star where you can harness fuel.",
		img: "img/asteroid.gif",
		options: [{ txt: "The Sun", link: 'a2' },
		{ txt: "Mars", link: 'end' },
		{ txt: "Neptune", link: 'end' }],
		endText: "This planet does not contain the necessary resources to refuel your rocket"
	},
	{//Dwarf planet (return to ship)
		key: "a11",
		title: "Space trivia!",
		header: "Almost there!",
		story: " You maneuvre your way through the asteroids! " + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing! " + "How many stars are there in the milky way?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "250 billion", link: 'h1' },
		{ txt: "10 billion", link: 'end' },
		{ txt: "10 million", link: 'end' }],
		endText: "Wrong answer! "
	},
	{//search jungle
		key: "a2",
		title: "Approching the Sun",
		header: "I hope its not too hot!",
		story: "You approach the sun and are able to use the ships built in solar reactor to store thermal energy and refuel." + " Mysteriously, a space bear has entered your capsule and you must decide how to respond.",
		img: "img/solarwinds.gif",
		options: [{ txt: "You're not taking any chances, attack!", link: 'a3' },
		{ txt: "Abandon ship!", link: 'end' },
		{ txt: "Attempt to domesticate the space bear", link: 'b3' }],
		endText: " You forgot that humans can only survive a short amount of time in the vaccum that is space and your entire crew perishes! "
	},
	{//talk to gorilla
		key: "a3",
		title: "Space Bear Defeated!",
		header: "Carrying On!",
		story: "The combined forces of the crew are enough to overtake the space bear and force him out of the capsule!" + "You now have to make a decision as there are three paths ahead that lead to Kepler-1649c, each with their own dangers.",
		img: "img/2019/bear.gif",
		options: [{ txt: "A path with a massive cloud of space dust", link: 'end' },
		{ txt: "A path containing dangerous radiation.", link: 'a4' },
		{ txt: "A path with an asteroid field.", link: 'a11' }],
		endText: "Dust behaves differently space than on earth being small enough to bypass human defenses such as nose hairs. Consequentially, the space dust settles inside the crews lungs ending the mission due to health concerns."
	},
	{//keep searching jungle
		key: "a4",
		title: "Space Trivia",
		header: "Almost there!",
		story: "Your spaceship is technologically advanced and protects you from radiation! " + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing! " + " How much time do sun rays take to reach Earth?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "8 seconds", link: 'end' },
		{ txt: "8 hours", link: 'end' },
		{ txt: "8 minutes", link: 'h1' }],
		endText: "Wrong answer! "
	},
	{//Run away
		key: "b3",
		title: "Success!",
		header: "Friendly Space Bear!",
		story: " The bear is friendly when the crew attemps to befriend it, and it leaves peacefully! " + "You now have to make a decision as there are three paths ahead that lead to Kepler-1649c, each with their own dangers.",
		img: "img/2019/bear.gif",
		options: [{ txt: "A path where large Gamma Ray bursts have been emitted", link: 'i4' },
		{ txt: "A path containing a dangerous comet", link: 'end' },
		{ txt: "A path with a foreign star ", link: 'h5' }],
		endText: " The comet wrecks you space ship!"
	},
	//Special nodes:
	/*{//Give up
		key: "i5",
		title: "Space trivia!",
		header: "Almost there!",
		story: " The star in the way is of no consequence!" + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing!" + " What is the closest planet to the sun?",
		img: "img/2019/bear.gif",
		options: [{ txt: "Mercury", link: 'h1' },
		{ txt: "Earth", link: 'end' },
		{ txt: "Mars", link: 'end' }],
		endText: "Wrong answer! "
	},*/
	/*{//Use GPS
		key: "b4",
		title: "Space Trivia!",
		header: "Almost there!",
		story: "Your spaceship protects you from the Gamma Ray blasts with its cutting edge tech! " + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing!" + " What is a supernova?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "A comet", link: 'end' },
		{ txt: "A star exploding", link: 'h1' },
		{ txt: "A large collection of space dust", link: 'end' }],
		endText: "Wrong answer! "
	},*/
	/*{//set up radio
		key: "b2",
		title: "Radio set up",
		header: "This may take a while...",
		story: "You decide to set up some radio communication equipment to improve your odds of finding the exploration crew. This is gonna take a while, in the meantime you decide to... ",
		img: "img/2019/radio.gif",
		options: [{ txt: "Look around", link: 'c2' },
		{ txt: "Wait and do nothing", link: 'c1' },
		{ txt: "Search the ocean", link: 'end' }],
		endText: "You swim out into the ocean and encounter a giant, terrifying squid-like alien. It grabs you with its tentacles and swallows you whole."
	},*/
	//special nodes
	/*{//wait and do nothing
		key: "c1",
		title: "Wait around",
		header: "Oh no! Wrong Planet!",
		story: "After a couple hours, your team finish setting up and you send out a message. You receive a reply! but not from this planet! The exploration crew are still alive, but they're on the terrestrial planet!",
		img: "img/2019/planet.gif",
		options: [{ txt: "Continue", link: 'end' }],
		endText: "Despite your excellent judgement and bravery, it looks like you chose the wrong planet! Oh well, you'll do better next time!"
	},*/
	/*{//Look around
		key: "c2",
		title: "Radio set up",
		header: "Look around",
		story: "You stop for a moment and take in the beauty of the alien planet and reflect on the progress of your mission.",
		img: "img/2019/prettyjungle.gif",
		options: [{ txt: "Cool", link: 'b2' }],
		endText: ""
	},*/
	//Dwarf Planet end::

	//Terrestrial Plant::


	{//terrestrial
		key: "b1",
		title: "Solar Winds",
		header: "Protected by Earth's Magnetic Field",
		story: "The Earth’s magnetic field acts as a shield against the solar winds and you are able to navigate through and exit Earth’s atmosphere." + "You spot a UFO coming your way, and receive a radio transmission from them with the message “Come aboard and we can help you navigate through the cosmos.” What do you do?",
		img: "img/solarwinds.gif",
		options: [{ txt: "Go aboard because alien life is too fascinating to pass up on.", link: 'd1' },
		{ txt: "You accelerate using the rockets thrusters to create distance between the ships.", link: 'e1' },
		{ txt: "You decide to attack using the ships particle beams and missiles.", link: 'end' }],
		endText: "The aliens use their advanced technology to deflect the particle beams and redirect the missile towards you. Your spaceship has been skewed and your crew perishes!"
	},

	{//Beach
		key: "d1",
		title: "Boarding the UFO",
		header: "Friendly Aliens!",
		story: "You board the UFO and it turns out the aliens are peacuful humainoid intelligent creatures." + " They inform you of a safer route to Kepler-1649c but it will take an extra month to reach the planet." + " What instructions do you give your crew in order to remain healthy during a mission that will last an additional month?",
		img: "img/ufo.gif",
		options: [{ txt: "Conserve energy by minimizing workouts", link: 'end' },
		{ txt: "Continue medium to high intensity training", link: 'd2' },
		{ txt: "Risk the more dangerous path for the sake of time", link: 'd3' }],
		endText: " Without workouts in space, your crew lose their muscle and bone mass and ae unable to complete the mission."
	},
	{//communication rescue message
		key: "d2",
		title: "The Mission Continues!",
		header: "On Your Way",
		story: "Intense workouts keep the crew healthy and mentally sharp! " + "You now come accross a planet with an atmosphere that ground control can't identify, do you explore it?",
		img: "img/2019/ufo.gif",
		options: [{ txt: "Explore the planet", link: 'end' },
		{ txt: "Follow orders and complete the mission", link: 'i3' },
		{ txt: "", link: '' }
		],
		endText: "Your crew lands on the planet and a giant radioactive woodchuck appears from its burrow and eats you and your crew!"
	},
	{//campfire
		key: "d3",
		title: "Your funeral!",
		header: "Keep going!",
		story: " Choose which way to go.",
		img: "img/2019/space.gif",
		options: [{ txt: "The path with large space dust cloud", link: 'end' },
		{ txt: "The path with dangerous radiation detected", link: 'a4' },
		{ txt: "The path with an oncoming asteroid field", link: 'a11' }],
		endText: "Space dust is lethal!"
	},
	/*{//mountains
		key: "e1",
		title: "Fleeing the UFO",
		header: "Potential Conflict Avoided!",
		story: "You have successfully fled the alien UFO!" + " Suddenly, a fire breaks out near the cockpit, How do you respond?",
		img: "img/spacefire.gif",
		options: [{txt:"Contain fire until the vents rid the fire of fuel", link: 'h1'},
					{txt:"Use your fire extinguisher", link: 'z1'},
				  /*{txt:"Keep climbing", link: 'end'}],
		endText: ""
	},*/
	{//pretty view
		key: "e1",
		title: "Fleeing the UFO",
		header: "Potential Conflict Avoided!",
		story: "You have successfully fled the alien UFO!" + " Suddenly, a fire breaks out near the cockpit, How do you respond?",
		img: "img/spacefire.gif",
		options: [{ txt: "Wait it out using the cabin fan", link: 'i1' },
		{ txt: "Open the cabin door and use the vaccumm of space to snuff out the flames", link: 'i2' },
		{ txt: "Attempt to smother the fire", link: 'end' }],
		endText: "Fire in space burns differently, requiring less oxygen and smothering it is ineffective and dangerous!"
	},
	//special node
	/*{//pretty view
		key: "z1",
		title: "Breathtaking...",
		header: "You take a moment to appreciate the view",
		story: "It's very pretty.",
		img: "img/2019/mountain_view.gif",
		options: [{ txt: "alright", link: 'e1' }],
		endText: ""
	},*/

	//Found alien building ::
	{
		key: "h1",
		title: "Final Question!",
		header: "Answer Correctly!",
		story: " This is your last question to allow you to land your ship!" + " What do you call it when the moon momentarily covers the sun?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "A lunar eclipse", link: 'h1' },
		{ txt: "A blackout", link: 'h1' },
		{ txt: "A solar eclipse", link: 'win' }],
		endText: "Wrong! Try again!"
	},
	{//space trivia 1
		key: "i1",
		title: "Space Trivia Time!",
		header: "Almost there!",
		story: "The cabin fan works and put the fire out!" + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing!" + " How many moons does mars have?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "1", link: 'end' },
		{ txt: "2", link: 'h1' },
		{ txt: "5", link: 'end' }],
		endText: "INCORRECT!"
	},
	{//space trivia 2
		key: "i2",
		title: "Space Trivia!",
		header: "Almost there!",
		story: "The vaccum of space puts the fire out!" + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing!" + " Who was the fourth man to walk on the moon?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "Alan Bean", link: 'h1' },
		{ txt: "Buzz Aldrin", link: 'end' },
		{ txt: "Neil Armstrong", link: 'end' }],
		endText: "Wrong!"
	},
	{//space trivia 3
		key: "i3",
		title: "Space Trivia!",
		header: "Almost there!",
		story: " A mysterious alien guarding the planet you wish to land on asks that you answer a trivia question before you land!" + " What year did man first set foot on the moon?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "1960", link: 'i3' },
		{ txt: "1969", link: 'win' },
		{ txt: "1971", link: 'i3' }],
		endText: "Wrong! Try again!"
	},
	{//Use GPS
		key: "i4",
		title: "Space Trivia!",
		header: "Almost there!",
		story: "Your spaceship protects you from the Gamma Ray blasts with its cutting edge tech! " + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing!" + " What is a supernova?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "A comet", link: 'end' },
		{ txt: "A star exploding", link: 'h1' },
		{ txt: "A large collection of space dust", link: 'end' }],
		endText: "Wrong answer! "
	},
	/*{//space trivia 4
		key: "i4",
		title: "Space Trivia!",
		header: "Correcto! The Alien nods approvingly.",
		story: "Last Question: \"What is the best space conference in the universe?\"",
		img: "img/2019/trivia.gif",
		options: [{ txt: "Queen's Space Conference", link: 'i5' },
		{ txt: "QSC", link: 'i5' },
		{ txt: "Some other conference", link: 'end' }],
		endText: "INCORRECT! \nThe alien let's out a furious yell then disintegrates you with his space gun."
	},*/
	
	{
		key: "h5",
		title: "Space trivia!",
		header: "Almost there!",
		story: " The star in the way is of no consequence!" + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing!" + " What is the closest planet to the sun?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "Mercury", link: 'h1' },
		{ txt: "Earth", link: 'end' },
		{ txt: "Mars", link: 'end' }],
		endText: "Wrong answer! "
	},
	/*{//space trivia 5
		key: "i5",
		title: "Space Trivia",
		header: "Almost there!",
		story:  The star in the way is of no consequence!" + " You reach the outter atmosphere of Kepler-1649c, but an alien defending the planet boards your ship, you must answer two of its questions before landing!" + " What is the closest planet to the sun?",
		img: "img/2019/takeoff.gif",
		options: [{ txt: "Continue (mission complete)", link: 'win' }],
		endText: ""
	},*/
	//special node
	/*{//dance off
		key: "h3",
		title: "Dance Off!",
		header: "Bust a move...",
		story: "You bust out some super tight intergalactic dance moves. The alien is amazed at your skillz. He tries to break dance "
			+ "in retaliation, but fails miserably. Defeated and embarrassed, he begins to cry then runs off in shame. It's no wonder you were #1 in dance class back at space academy.",
		img: "img/2019/alien_dance.gif",
		options: [{ txt: "Nice!", link: 'h5' }],
		endText: ""
	},*/
	/*{//Nice
		key: "h5",
		title: "Hack master",
		header: "Time to test your computer skills",
		story: "You approach the jail cell and wave to the captive crew. The cell door has a glowing screen that prompts you for a password...",
		img: "img/2019/hacking.gif",
		options: [{ txt: "'Spaceman123'", link: 'h6' },
		{ txt: "'password'", link: 'h6' },
		{ txt: "'passw0rd'", link: 'h7' }],
		endText: "The ground opens up from underneath you and you fall into the monster pit ahhhhhhhh!!!"
	},*/
	//special node
	/*{
		key: "h6",
		title: "Alien Trivia!",
		header: "Keep going!",
		story: " A mysterious alien guarding the planet you wish to land on asks that you answer on trivia question before you land!" + " What year did man first set foot on the moon?",
		img: "img/2019/trivia.gif",
		options: [{ txt: "1960", link: 'h6' },
		{ txt: "1969", link: 'win' },
		{ txt: "1971", link: 'h6' }],
		endText: "Wrong! Try again!"
	},*/
	//special node
	/*{//correct password
		key: "h7",
		title: "Prison Break!",
		header: "PASSWORD ACCEPTED",
		story: "Success! The door opens and you free the captive crew. Together you all run out of the structure and back to your ship and get ready to take off...",
		img: "img/2019/takeoff.gif",
		options: [{ txt: "Continue (mission complete)", link: 'win' }],
		endText: ""
	},*/
	/*{//sneak around guard
		key: "h4",
		title: "Stealthy, sneaky, tiptoe time",
		header: "You try to sneak by the alien",
		story: "Success! You approach the jail cell without the alien noticing you",
		img: "img/2019/sneak.gif",
		options: [{ txt: "Nice!", link: 'h5' }],
		endText: ""
	},*/

];

function killCover() {
	var cover = document.body.querySelector("#cover");
	document.body.removeChild(cover);
}

function getlvlCount() {
	return lvlCount;
}
//element creator
function elt(name, attributes) {
	var node = document.createElement(name);
	if (attributes) {
		for (var attr in attributes)
			if (attributes.hasOwnProperty(attr))
				node.setAttribute(attr, attributes[attr]);
	}
	for (var i = 2; i < arguments.length; i++) {
		var child = arguments[i];
		if (typeof child == "string")
			child = document.createTextNode(child);
		node.appendChild(child);
	}
	return node;
}

function nextSlide() {
	var letterSelected = getSelection();
	//Scroll story into view
	var target = document.body.querySelector("#slideImage");
	target.parentNode.scrollTop = target.offsetTop;
	//Initiaite new slide
	initSlide(letterSelected);
}

function getSelection() {
	var radios = document.body.querySelectorAll("input");
	var selected = null;
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked == true)
			selected = radios[i].value;
	}
	// console.log(selected + " selected");
	return selected;
}

function showEndText(currentObject) {
	if (currentObject.endText) {
		loseString = currentObject.endText;
	} else {
		loseString = "Better luck next time!"
	}
}

function updateScore() {
	if (lvlCount > topScore) {
		topScore = lvlCount;
		var score = document.body.querySelector("#topScore").textContent = "High Score: " + (topScore + 1).toString();
	}
}
function initSlide(letter) {
	//input help checker
	var inputHelp = document.body.querySelector("#input-help");
	inputHelp.style.visibility = "hidden";
	if (!letter) {
		inputHelp.style.visibility = "visible";
		console.log("no letter selected.. returning");
		return;
	}
	//find gameObject
	var keys = Object.keys(game);
	var currentObject = null;
	for (var i = 0; i < keys.length; i++) {
		if (letter === game[keys[i]].key) {

			currentObject = game[keys[i]];
		}
	}

	//reset lvl count if starting
	if (currentObject.key == "start") {
		lvlCount = 0;
	}

	//Update title
	var title = document.body.querySelector("#title");
	title.textContent = currentObject.title;
	//Update Header
	document.body.querySelector("#storyHeader").textContent = currentObject.header;
	//Update Story
	document.body.querySelector("#storyText").innerHTML = currentObject.story;
	//Update Image
	document.body.querySelector("#slideImage").style.backgroundImage = 'url(' + currentObject.img + ')';


	//Associate Labels to their inputs
	var labels = document.getElementsByTagName('LABEL');
	for (var i = 0; i < labels.length; i++) {
		if (labels[i].htmlFor != '') {
			var elem = document.getElementById(labels[i].htmlFor);
			if (elem)
				elem.label = labels[i];
		}
	}

	//update labels
	//Update button pointers
	var inputs = document.body.querySelectorAll("input")

	//Udate special nodes with less than 3 options
	if (currentObject.key == "test" || currentObject.key == "g1" || currentObject.key == "b4" || currentObject.key == "c1" || currentObject.key == "c2" || currentObject.key == "z1" || currentObject.key == "h3" || currentObject.key == "h4" || currentObject.key == "h6" || currentObject.key == "h7" || currentObject.key == "i5") {
		for (var i = 0; i < inputs.length - 1; i++) {
			//inputs[i].parentNode.parentNode.removeChild(inputs[i].parentNode);
			inputs[i].parentNode.style.visibility = "hidden";
		}
		var inputs = document.body.querySelectorAll("input");
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].parentNode.style.visibility == "visible")
				var input = inputs[i];
		}

		input.label.innerHTML = currentObject.options[0].txt;
		input.value = currentObject.options[0].link;
		var endString = "Levels passed: " + getlvlCount() + "<br><br>" + loseString;

		updateScore();
		return;
	}

	//end game condition -- special
	if (currentObject.key == "end" || currentObject.key == "win") {/////////added lvlCount != 0!!!!
		for (var i = 0; i < inputs.length - 1; i++) {
			//inputs[i].parentNode.parentNode.removeChild(inputs[i].parentNode);
			inputs[i].parentNode.style.visibility = "hidden";
		}
		var inputs = document.body.querySelectorAll("input");
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].parentNode.style.visibility == "visible")
				var input = inputs[i];
		}

		input.label.innerHTML = currentObject.options[0].txt;
		input.value = currentObject.options[0].link;
		//custom story update
		var endString = "Levels Passed: " + getlvlCount() + "<br><br>" + loseString;
		if (currentObject.key != "win") {
			document.body.querySelector("#storyText").innerHTML = endString;
		}
		lvlCount = 0;
		updateScore();
		return;
	}
	//Haven't lost if you got here
	updateScore();
	//increment level count
	//if(currentObject.key != "start")
	//lvlCount++;



	//corrected score for backtracking
	//lvl count increases every time they visit a new stage

	if (!visited.includes(currentObject.key)) {
		lvlCount++;
	}
	visited.push(currentObject.key);
	//Update end text link
	showEndText(currentObject);

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].parentNode.style.visibility = "visible";
		//uncheck all buttons
		inputs[i].checked = false;
		inputs[i].label.innerHTML = currentObject.options[i].txt;// + " -> " + currentObject.options[i].link ;
		inputs[i].value = currentObject.options[i].link;
		//options[i].childNode.innerHTML = "weeo";
	}


}
