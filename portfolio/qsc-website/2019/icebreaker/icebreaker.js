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
		title: "Rescue Mission!",
		header: "Choose a Planet:",
		story: "Your team sees 3 potential planets where the exploration crew may have crashed. You only have enough fuel to visit one...(scroll down on mobile)",
		img: "img/2019/space.gif",
		options: [{txt:"Fly to Gas Giant", link: 'end'},
				  {txt:"Fly to Dwarf Planet", link: 'a1'},
				  {txt:"Fly to Terrestrial Planet", link: 'b1'}],
		endText: "Oh no! As you travel into the atmosphere you pass through lightning storm and the ship's electronics go haywire! Without "+ 
		"control, you fly towards the center and the ship is crushed under the intense pressure. You and you're crew suffocate and die. :("

	},
	//test node
	{
		key: "test",
		title: "test",
		header: "Test",
		story: ("You survived " + getlvlCount() + " levels" + "\n" + loseString),
		img: "img/explosion.gif",
		options: [{txt:"a1", link: 'a1'}]

	},
	//Lose
	{
		key: "end",
		title: "Mission Failed!",
		header: "Oh No! :(",
		story: ("You survived " + getlvlCount() + " levels" + "\n" + loseString),
		img: "img/2019/gameover.gif",
		options: [{txt:"Restart", link: 'start'}]

	},
	//Win
	{
		key: "win",
		title: "Victory!!! Mission Complete",
		header: "Space Conference Champions!",
		story: "You take off in your ship and return the stranded exploration crew back to "
			+ "Earth. You and your crew  receive endless praise and are awarded medals for your daring heroism in the face of danger. Good Job Captain!",
		img: "img/win.gif",
		options: [{txt:"Restart", link: 'start'}]

	},
//Dwarf planet::
	{
		key: "a1",
		title: "Dwarf Planet",
		header: "You land on the dwarf planet",
		story: "Your ship has landed between a lush Jungle and a huge neon blue ocean. The gravity is weaker than Earth's and you feel as light as a feather. What next?",
		img: "img/2019/dwarf_planet.gif",
		options: [{txt:"Search the ocean", link: 'end'},
				  {txt:"Search the jungle", link: 'a2'},
				  {txt:"Set up a radio to send a long range communication", link: 'b2'}],
		endText: "You swim out into the ocean and encounter a giant, terrifying squid-like alien. It grabs you with its tentacles and swallows you whole"
	},
	{//Dwarf planet (return to ship)
		key: "a11",
		title: "Dwarf Planet",
		header: "You return to your ship",
		story: "Your ship has landed between a lush Jungle and a huge neon blue ocean. The gravity is weaker than Earth's and you feel as light as a feather. What next?",
		img: "img/2019/dwarf_planet.gif",
		options: [{txt:"Search the ocean", link: 'end'},
				  {txt:"Search the jungle", link: 'a2'},
				  {txt:"Set up a radio to send a long range communication", link: 'b2'}],
		endText: "You swim out into the ocean and encounter a giant, terrifying squid-like alien. It grabs you with its tentacles and swallows you whole"
	},
	{//search jungle
		key: "a2",
		title: "Rumble in the Jungle",
		header: "I hope its not too humid",
		story: "You and your team walk into the dense jungle, hoping to find a trace of the exploration crew. You come across a purple, ape-like alien! He turns around and looks at you curiously.",
		img: "img/2019/gorilla.gif",
		options: [{txt:"You're not taking any chances, attack!", link: 'end'},
				  {txt:"Attempt to communicate", link: 'a3'},
				  {txt:"Run Away", link: 'b3'}],
		endText: "You pull out your space blaster and fire at the alien. Unfortunately you're not a very good shot and alien gorillas are surprisingly strong. You miss and he roars then rips your"+
		" arm clean off. You think to yourself in retrospect that maybe this wasn't the best course of action for the first alien encounter in history, then you bleed out and die. "
	},
	{//talk to gorilla
		key: "a3",
		title: "Monkey Business",
		header: "Maybe he'll lead us to the crew",
		story: "You attempt to communicate with the ape alien. It seems scared and confused. He throws an alien banana at you then runs away while screaming.",
		img: "img/2019/jungle.gif",
		options: [{txt:"Keep searching in the jungle", link: 'a4'},
				  {txt:"Follow him", link: 'end'},
				  {txt:"Return to your ship", link: 'a11'}],
		endText: "You follow after him into the forest. He's much faster that you and you trip on a banana peel as you try to keep up. You hit your head on a rock and die immediately."
	},
	{//keep searching jungle
		key: "a4",
		title: "Keep searching",
		header: "Alien mushroom plant thingy",
		story: "You keep looking around the jungle for signs of the exploration crew. You find a strange looking, bright red alien mushroom. You decide to...",
		img: "img/2019/mushroom.gif",
		options: [{txt:"Eat it", link: 'end'},
				  {txt:"Study it", link: 'end'},
				  {txt:"Return to your ship", link: 'a11'}],
		endText: "You approach the plant and reach down to touch it. It sprays out poisonous green gas. Like a proper scientist you waft it under your nose instead of smelling it directly. It kills you anyways. "
	},
	{//Run away
		key: "b3",
		title: "Run Away",
		header: "Skedaddle outta there",
		story: "You book it away from the alien ape as fast as you can. In your hurry, You and your crew become separated and you find yourself alone in the jungle.",
		img: "img/2019/forest_light.gif",
		options: [{txt:"Use your GPS to return to your ship", link: 'b4'},
				  {txt:"Make a campfire", link: 'end'},
				  {txt:"Give up", link: 'g1'}],
		endText: "You gather some leaves and sticks on the ground into a pile then light them. The planet's oxygen rich atmosphere causes the fire to grow out of control and burn down the jungle with you in it."
	},
	//Special nodes:
	{//Give up
		key: "g1",
		title: "Give Up",
		header: "You decide to give up",
		story: "Doing things is overrated, you decide to lie down in the jungle and do nothing. You contemplate your mission and the meaning of life and the universe for a while. Then a space bear sees you lying down and eats you.",
		img: "img/2019/bear.gif",
		options: [{txt:"Continue", link: 'end'}],
		endText: "You go down in history as Earth's laziest astronaut. You're ridiculed for centuries at universities and space conferences around the world. Mission failed!"
	},
	{//Use GPS
		key: "b4",
		title: "Use GPS",
		header: "GPS to the rescue!",
		story: "You use your intergallactic space GPS to navigate back to your ship. Turns out the rest of your crew had the same idea and they're waiting for you. You decide to set up a radio to help with future communication and improve your odds of finding the explorers.",
		img: "img/2019/radio.gif",
		options: [{txt:"Set up a radio", link: 'b2'}],
		endText: ""
	},
	{//set up radio
		key: "b2",
		title: "Radio set up",
		header: "This may take a while...",
		story: "You decide to set up some radio communication equipment to improve your odds of finding the exploration crew. This is gonna take a while, in the meantime you decide to... ",
		img: "img/2019/radio.gif",
		options: [{txt:"Look around", link: 'c2'},
				  {txt:"Wait and do nothing", link: 'c1'},
				  {txt:"Search the ocean", link: 'end'}],
		endText: "You swim out into the ocean and encounter a giant, terrifying squid-like alien. It grabs you with its tentacles and swallows you whole."
	},
	//special nodes
	{//wait and do nothing
		key: "c1",
		title: "Wait around",
		header: "Oh no! Wrong Planet!",
		story: "After a couple hours, your team finish setting up and you send out a message. You receive a reply! but not from this planet! The exploration crew are still alive, but they're on the terrestrial planet!",
		img: "img/2019/planet.gif",
		options: [{txt:"Continue", link: 'end'}],
		endText: "Despite your excellent judgement and bravery, it looks like you chose the wrong planet! Oh well, you'll do better next time!"
	},
	{//Look around
		key: "c2",
		title: "Radio set up",
		header: "Look around",
		story: "You stop for a moment and take in the beauty of the alien planet and reflect on the progress of your mission.",
		img: "img/2019/prettyjungle.gif",
		options: [{txt:"Cool", link: 'b2'}],
		endText: ""
	},
//Dwarf Planet end::
	
//Terrestrial Plant::
	
	
	{//terrestrial
		key: "b1",
		title: "Terrestrial Planet",
		header: "You land on the terrestrial planet",
		story: "You land on the terrestrial planet in a desert and immediately see the crashed spaceship from the exploration crew, Success! This must be the right planet." 
		+" You don't see any of the crew and decide to...  ",
		img: "img/2019/terrestrial_planet.gif",
		options: [{txt:"Head towards the ocean", link: 'd1'},
				  {txt:"Head towards the mountains", link: 'e1'},
				  {txt:"Head towards a nearby cave", link: 'end'}],
		endText: "You enter the cave and walk around. Cave in! It collapses around you, crushing and killing you."
	},
	
	{//Beach
		key: "d1",
		title: "Sandy Beaches",
		header: "Reminds you of back home on Earth...",
		story: "You walk to the edge of the ocean and see 2 sets of footprints leading to a burnt out campfire. They must have been here...",
		img: "img/2019/beach.gif",
		options: [{txt:"Send out a communication signal and hope they hear it", link: 'd2'},
				  {txt:"Investigate the campfire", link: 'd3'},
				  {txt:"Swim out into the ocean", link: 'end'}],
		endText: "You swim out into the ocean and start to realize how heavy your space suit is. The current drags you out and you drown as you try to swim back. :( "
	},
	{//communication rescue message
		key: "d2",
		title: "Send out a rescue message",
		header: "Uh Oh...",
		story: "Yikes, looks like someone heard your signal, but its not the crew! A spooky looking UFO teleports in front "
		+"of you and floats around then flies off into a forest, it looks like it hadn't seen you...",
		img: "img/2019/ufo.gif",
		options: [{txt:"Attack it!", link: 'end'},
					{txt:"Run away", link: 'end'},
				  {txt:"Follow it", link: 'h1'}],
		endText: "The UFO detects you and aims its space blaster. It shoots you and you're instantly vaporized."
	},
	{//campfire
		key: "d3",
		title: "Campfire",
		header: "You walk to the campfire and investigate",
		story: "It looks like it was poorly made. Off in the distance in a nearby forest, you see a glowing metallic structure.",
		img: "img/2019/trees.gif",
		options: [{txt:"Walk towards it", link: 'h1'},
					{txt:"Go back to the beach", link: 'd1'},
				  {txt:"Swim out into the ocean", link: 'end'}],
		endText: "You swim out into the ocean and start to realize how heavy your space suit is. The current drags you out and you drown as you try to swim back. :( "
	},
	{//mountains
		key: "e1",
		title: "Mountain Man",
		header: "Hope you brought some climbing chalk",
		story: "You reach the base of the mountains and start climbing. As you climb the mountains, you get a better view of the surrounding landscape and see a strange looking metallic structure in a forest near the ocean.",
		img: "img/2019/mountain.gif",
		options: [{txt:"Go to the structure", link: 'h1'},
					{txt:"Appreciate the view", link: 'z1'},
				  {txt:"Keep climbing", link: 'end'}],
		endText: "While climbing you cause a rock slide and get crushed under a rock. You die instantly... the next day"
	},
	//special node
	{//pretty view
		key: "z1",
		title: "Breathtaking...",
		header: "You take a moment to appreciate the view",
		story: "It's very pretty.",
		img: "img/2019/mountain_view.gif",
		options: [{txt:"alright", link: 'e1'}],
		endText: ""
	},
	
	//Found alien building ::
	{
		key: "h1",
		title: "Alien strucutre",
		header: "Found them!",
		story: "You arrive at a large metallic alien structure and go inside. You see the exploration crew! "
		+"They're being held captive inside an advanced alien jail cell. A big, spooky alien outside the cell appears to be guarding them...",
		img: "img/2019/alien_base.gif",
		options: [{txt:"Ask him politely to let them go", link: 'i1'},
					{txt:"Challenge him to a dance off", link: 'h3'},
				  {txt:"Try to sneak by and save your friends", link: 'h4'}],
		endText: ""
	},
	{//space trivia 1
		key: "i1",
		title: "Space Trivia Time!",
		header: "No google allowed!",
		story: "The Alien agrees to let them go, but only if you can answer a few space trivia questions! \n\n"
		+"Question 1: \"How many stars are there in the milky way?\"",
		img: "img/2019/milkyway.gif",
		options: [{txt:"~250 billion", link: 'i2'},
					{txt:"~250 million", link: 'end'},
				  {txt:"At least 12", link: 'i2'}],
		endText: "INCORRECT! \nThe alien let's out a furious yell then disintegrates you with his space gun."
	},
	{//space trivia 2
		key: "i2",
		title: "Space Trivia!",
		header: "Correct! The Alien nods approvingly.",
		story: "Question 2: \"How much time does sun rays take to reach Earth?\"",
		img: "img/2019/sun.gif",
		options: [{txt:"8 seconds", link: 'end'},
					{txt:"8 minutes", link: 'i3'},
				  {txt:"8 hours", link: 'end'}],
		endText: "INCORRECT! \nThe alien let's out a furious yell then disintegrates you with his space gun."
	},
	{//space trivia 3
		key: "i3",
		title: "Space Trivia!",
		header: "Correct! The Alien nods approvingly.",
		story: "Question 3: \"What shape is the Earth?\"",
		img: "img/2019/earth.gif",
		options: [{txt:"Perfect sphere", link: 'end'},
					{txt:"Oblate spheroid", link: 'i4'},
				  {txt:"Flat, lol", link: 'end'}],
		endText: "INCORRECT! \nThe alien let's out a furious yell then disintegrates you with his space gun."
	},
	{//space trivia 4
		key: "i4",
		title: "Space Trivia!",
		header: "Correcto! The Alien nods approvingly.",
		story: "Last Question: \"What is the best space conference in the universe?\"",
		img: "img/2019/trivia.gif",
		options: [{txt:"Queen's Space Conference", link: 'i5'},
					{txt:"QSC", link: 'i5'},
				  {txt:"Some other conference", link: 'end'}],
		endText: "INCORRECT! \nThe alien let's out a furious yell then disintegrates you with his space gun."
	},
	//special node
	{//space trivia 5
		key: "i5",
		title: "Trivia Master!",
		header: "Correcto-mundo! Good job!",
		story: "The alien praises your space knowledge and gives you a totally sweet high five. "
			+"He let's the captive crew go and together you all run out of the structure and back to your ship. You prepare for takeoff...",
		img: "img/2019/takeoff.gif",
		options: [{txt:"Continue (mission complete)", link: 'win'}],
		endText: ""
	},
	//special node
	{//dance off
		key: "h3",
		title: "Dance Off!",
		header: "Bust a move...",
		story: "You bust out some super tight intergalactic dance moves. The alien is amazed at your skillz. He tries to break dance "
		+"in retaliation, but fails miserably. Defeated and embarrassed, he begins to cry then runs off in shame. It's no wonder you were #1 in dance class back at space academy.",
		img: "img/2019/alien_dance.gif",
		options: [{txt:"Nice!", link: 'h5'}],
		endText: ""
	},
	{//Nice
		key: "h5",
		title: "Hack master",
		header: "Time to test your computer skills",
		story: "You approach the jail cell and wave to the captive crew. The cell door has a glowing screen that prompts you for a password...",
		img: "img/2019/hacking.gif",
		options: [{txt:"'Spaceman123'", link: 'h6'},
					{txt:"'password'", link: 'h6'},
				  {txt:"'passw0rd'", link: 'h7'}],
		endText: "The ground opens up from underneath you and you fall into the monster pit ahhhhhhhh!!!"
	},
	//special node
	{//incorrect password
		key: "h6",
		title: "Yikes",
		header: "PASSWORD INCORRECT",
		story: "Whoops",
		img: "img/2019/hackingred.gif",
		options: [{txt:"Try again", link: 'h5'}],
		endText: ""
	},
	//special node
	{//correct password
		key: "h7",
		title: "Prison Break!",
		header: "PASSWORD ACCEPTED",
		story: "Success! The door opens and you free the captive crew. Together you all run out of the structure and back to your ship and get ready to take off...",
		img: "img/2019/takeoff.gif",
		options: [{txt:"Continue (mission complete)", link: 'win'}],
		endText: ""
	},
	{//sneak around guard
		key: "h4",
		title: "Stealthy, sneaky, tiptoe time",
		header: "You try to sneak by the alien",
		story: "Success! You approach the jail cell without the alien noticing you",
		img: "img/2019/sneak.gif",
		options: [{txt:"Nice!", link: 'h5'}],
		endText: ""
	},
	
];

function killCover(){
	var cover = document.body.querySelector("#cover");
	document.body.removeChild(cover);
}

function getlvlCount(){
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

function nextSlide(){
	var letterSelected = getSelection();
	//Scroll story into view
	var target = document.body.querySelector("#slideStory");
	target.parentNode.scrollTop = target.offsetTop;
	//Initiaite new slide
	initSlide(letterSelected);
}

function getSelection(){
	var radios = document.body.querySelectorAll("input");
	var selected = null;
	for(var i = 0; i < radios.length; i++){
		if(radios[i].checked == true)
			selected = radios[i].value;
	}
	// console.log(selected + " selected");
	return selected;
}

function showEndText(currentObject){
	if(currentObject.endText){
		loseString = currentObject.endText;
	}else{
		loseString = "Better luck next time!"
	}
}

function updateScore(){
	if(lvlCount > topScore){
		topScore = lvlCount;
		var score = document.body.querySelector("#topScore").textContent = "High Score: "+(topScore + 1).toString();
	}
}
function initSlide(letter){
	//input help checker
	var inputHelp = document.body.querySelector("#input-help");
	inputHelp.style.visibility = "hidden";
	if(!letter){
		inputHelp.style.visibility = "visible";
		console.log("no letter selected.. returning");
		return;
	}
	//find gameObject
	var keys = Object.keys(game);
	var currentObject = null;
	for(var i = 0; i < keys.length; i++){
		if(letter === game[keys[i]].key){

			currentObject = game[keys[i]];
		}
	}

	//reset lvl count if starting
	if(currentObject.key == "start"){
		lvlCount = 0;
	}
	
	//Update title
	var title =  document.body.querySelector("#title");
	title.textContent = currentObject.title;
	//Update Header
	document.body.querySelector("#storyHeader").textContent = currentObject.header;
	//Update Story
	document.body.querySelector("#storyText").innerHTML = currentObject.story;
	//Update Image
	document.body.querySelector("#slideImage").style.backgroundImage = 'url('+currentObject.img+')';


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
	if(currentObject.key=="test"||currentObject.key=="g1"||currentObject.key=="b4"||currentObject.key=="c1"||currentObject.key=="c2"||currentObject.key=="z1"||currentObject.key=="h3"||currentObject.key=="h4"||currentObject.key=="h6"||currentObject.key=="h7"||currentObject.key=="i5"){
		for(var i = 0; i < inputs.length - 1; i++){
			//inputs[i].parentNode.parentNode.removeChild(inputs[i].parentNode);
			inputs[i].parentNode.style.visibility = "hidden";
		}
		var inputs = document.body.querySelectorAll("input");
		for(var i = 0; i < inputs.length; i++){
			if(inputs[i].parentNode.style.visibility == "visible")
				var input = inputs[i];
		}
		
		input.label.innerHTML = currentObject.options[0].txt;
		input.value = currentObject.options[0].link;
		var endString = "Levels passed: " + getlvlCount() + "<br><br>" + loseString;
		
		updateScore();
		return;
	}
	
	//end game condition -- special
	if(currentObject.key == "end" || currentObject.key == "win"){/////////added lvlCount != 0!!!!
		for(var i = 0; i < inputs.length - 1; i++){
			//inputs[i].parentNode.parentNode.removeChild(inputs[i].parentNode);
			inputs[i].parentNode.style.visibility = "hidden";
		}
		var inputs = document.body.querySelectorAll("input");
		for(var i = 0; i < inputs.length; i++){
			if(inputs[i].parentNode.style.visibility == "visible")
				var input = inputs[i];
		}

		input.label.innerHTML = currentObject.options[0].txt;
		input.value = currentObject.options[0].link;
		//custom story update
		var endString = "Levels Passed: " + getlvlCount() + "<br><br>" + loseString;
		if(currentObject.key != "win"){
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
	
	if(!visited.includes(currentObject.key)){
			lvlCount++;
	}
	visited.push(currentObject.key);
	//Update end text link
	showEndText(currentObject);

	for(var i = 0; i < inputs.length; i++){
		inputs[i].parentNode.style.visibility = "visible";
		//uncheck all buttons
		inputs[i].checked = false;
		inputs[i].label.innerHTML = currentObject.options[i].txt;// + " -> " + currentObject.options[i].link ;
		inputs[i].value = currentObject.options[i].link;
		//options[i].childNode.innerHTML = "weeo";
	}


}
