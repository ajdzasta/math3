const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const levelHack = document.getElementById('levelHack');
const input = document.getElementById('inputValue');
const upF1 = document.getElementById('upF1');
const dnF1 = document.getElementById('dnF1');
const upF2 = document.getElementById('upF2');
const dnF2 = document.getElementById('dnF2');
const upF3 = document.getElementById('upF3');
const dnF3 = document.getElementById('dnF3');
const symbol = document.getElementById('symbol');
const buttonConfirm = document.getElementById("buttonConfirm");
const result = document.querySelector(".result");
const resultInfo = document.getElementById("endInfo");
const resultInfo2 = document.getElementById("endInfo2");
const nickConfirm = document.getElementById("nickConfirm");
const register = document.querySelector(".register"); 
const username = document.getElementById("username");
const userid = document.getElementById("userid");
const startinfo = document.querySelector(".startinfo")

let vh = window.innerHeight;
document.documentElement.style.setProperty('--vh', `${vh}px`);

var __timePlay = 30;
var progressBarInterval;
var stageLevel = 0;
var check = false;
var unknown_index = 0;
var unknown_number = 0;
var difficulty = "normal";

const gameInit = () => {

	//const cookie = document.cookie;
	//let check2 = false;

	let check2 = true;
	//if (cookie != ""){
	//	username.innerHTML = "username: " + getCookie("username");
	//	userid.innerHTML = "userid: " + getCookie("userid");
	//	check2 = true;
	//	console.log(cookie);
	//}

	//if (cookie == ""){
	//	register.style.display = "";
	//}

	buttonConfirm.addEventListener('click', function () {
		if (check2){
			if (check) {
				if (input.value == unknown_number) {
					generateQuestion();
					levelHack.textContent = "Zadanie " + stageLevel;
					input.value = '';
					progressBarStart('game', __timePlay);
				}
				else{
					gameOver();
				}
			}
		}
	});

	nickConfirm.addEventListener('click', async function () {
		var date = new Date();
		date.setFullYear(date.getFullYear() + 10); // Ustawiamy datę na 10 lat w przyszłości

		const username_input = document.getElementById("inputNick").value;

		const response = await register_api(username_input);

		const id = response["userid"];

		if (id == undefined){
			return;
		}

		const newCookie1 = "userid=" + id + "; expires=" + date.toUTCString() + "; path=/";
		const newCookie2 = "username=" + username_input + "; expires=" + date.toUTCString() + "; path=/";
		const newCookie3 = "score=0" + "; expires=" + date.toUTCString() + "; path=/";
		console.log(newCookie1);
		console.log(newCookie2);
		console.log(newCookie3);
		document.cookie = newCookie1;
		document.cookie = newCookie2;
		document.cookie = newCookie3;
		check2 = true;
		username.innerHTML = "username: " + username_input;
		userid.innerHTML = "userid: " + id;
		register.style.display = 'none';

	});

	result.style.display = 'none';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	startinfo.style.display = '';
	//document.addEventListener('contextmenu', event => event.preventDefault());
};

const getCookie = (cname) => {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
};

const gameStart = () => {
	stageLevel = 0;
	check = false;
	levelHack.textContent = 'Zadanie 1';
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	result.style.display = 'none';
	register.style.display = 'none';
	input.value = '';
	startinfo.style.display = 'none';
	progressBarStart('start', 2);
};

const gameOver = async() => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Zadanie nieudane!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	result.style.display = 'none';
	resultInfo.innerHTML = 'Zdobyte punkty: ' + (stageLevel - 1) + " pkt";
	startinfo.style.display = 'none';

	//const highest_score = getCookie("score");

	//if ((stageLevel - 1) > highest_score){
	//	resultInfo2.innerHTML = 'Największy wynik: ' + (stageLevel - 1) + " pkt";
	//
	//	var date = new Date();
	//	date.setFullYear(date.getFullYear() + 10); // Ustawiamy datę na 10 lat w przyszłości
	//	
	//	const editCookie = "score=" + (stageLevel - 1) + "; expires=" + date.toUTCString() + "; path=/";
	//	document.cookie = editCookie;
	//	const id = getCookie("userid")
	//	const update = await updateScore(id,(stageLevel - 1));
	//	console.log(update);
	//}
	//else{
	//	resultInfo2.innerHTML = 'Największy wynik: ' + highest_score + " pkt";
	//}

	register.style.display = 'none';
	progressBarStart('end', 2);
};

function progressBarStart(type, time) {
	let start = new Date().getTime();
	var maxwidth = 1000;
	var width = maxwidth;
	progressBarId.style.width = '100%';
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';

			let now = new Date().getTime();
  			let distance = start + time*1000 - now;
			//console.log(distance);

  			// Time calculations for days, hours, minutes and seconds
  			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  			let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  			// Display the result in the element with id="demo"
			if (distance > 0){
				if (minutes > 0 && seconds == 0){
					document.getElementById("timer").innerHTML = minutes + "m "
				}
				else if (minutes > 0){
  					document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
				}
				else{
					document.getElementById("timer").innerHTML = seconds + "s ";
				}
			}

		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackFunction2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				check = true;
				generateQuestion();
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				gameOver();
				return;
			}

			if (type == 'end') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackText.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
				hackInfo.style.display = 'none';
				result.style.display = '';
				startinfo.style.display = '';
			}
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

let resaultQuestion = 0;

function generateQuestion() {
	let a1 = getRandomIntInclusive(2, 9);
	let a2 = getRandomIntInclusive(1, a1 - 1);

	let b1 = getRandomIntInclusive(2, 9);
	let b2 = getRandomIntInclusive(1, b1 - 1);


	let operation;
	if (Math.random() < 0.5){
		symbol.textContent = "+";
		operation = addition(a2, b2, a1, b1)
	}
	else{
		symbol.textContent = "-";
		operation = subtraction(a2, b2, a1, b1);
	}

	if (operation[0] < 1) {
		generateQuestion();
		console.log(operation);
	} else {
		stageLevel++;

		let all = [a1,a2,b1,b2,operation[1],operation[0]]

		console.log(all);

		if (difficulty == "easy"){
			unknown_index = 5;
		}
		if (difficulty == "normal"){
			unknown_index = getRandomIntInclusive(1,3)*2 - 1;
		}
		if (difficulty == "hard"){
			unknown_index = getRandomIntInclusive(0,5);
		}

		if (difficulty == "hard"){
			const dziel = nwd(all[4],all[5])
			console.log(dziel);
			all[4] = parseInt(all[4]/dziel);
			all[5] = parseInt(all[5]/dziel);
		}

		console.log(all);

		unknown_number = all[unknown_index];

		all[unknown_index] = "?"

		const lookup = ["dnF1","upF1","dnF2","upF2","dnF3","upF3"];

		for (let i = 0; i < 6; i++){
			document.getElementById(lookup[i]).style = "";
		}

		document.getElementById(lookup[unknown_index]).style = "color: #10ffcd";

		dnF1.textContent = all[0];
		upF1.textContent = all[1];

		dnF2.textContent = all[2];
		upF2.textContent = all[3];

		dnF3.textContent = all[4];
		upF3.textContent = all[5];
	
	}
}

function addition(u1, u2, d1, d2) {
	var a1 = u1 * d2 + u2 * d1;
	var a2 = d1 * d2;
	return [a1, a2];
}
function subtraction(u1, u2, d1, d2) {
	var a1 = u1 * d2 - u2 * d1;
	var a2 = d1 * d2;
	return [a1, a2];
}

function level(id){
	document.getElementById("easy").style.border = "none";
	document.getElementById("normal").style.border = "none";
	document.getElementById("hard").style.border = "none";

	document.getElementById(id).style.border = "1px solid rgba(105, 105, 105, 0.5)";
	difficulty = id;
}

function nwd(a,b) {
	if (a == b){
		return 1;
	}
	let temp;
    while (b != 0){
        temp = a
        a = b
        b = temp%b
	}
	return a;
}