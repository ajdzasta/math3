const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const resaultend = document.getElementById('resaultend');
const resultscreen = document.querySelector(".resultscreen");
const clearButton = document.getElementById("clear");
const confirmButton = document.getElementById("confirm");
const container2 = document.getElementById("container2");
const wrapper = document.querySelector(".wrapper");
const wrapper2 = document.querySelector(".wrapper2");
const buttons = document.querySelector(".buttons");
const startinfo = document.querySelector(".startinfo")

let vh = window.innerHeight;
document.documentElement.style.setProperty('--vh', `${vh}px`);

var __timePlay = 240;
var progressBarInterval;
var check = false;
var difficulty = "normal";

const hanoi_dif = {
	easy: 3,
	normal: 4,
	hard: 6
}

const gameInit = () => {

	//init();

	clearButton.addEventListener('click', () => {
		IntitDisc(disknum)
	});

	buttonStart.addEventListener('click', () => {
    ClearDisc();
    disknum = hanoi_dif[difficulty];
		gameStart();
		//Generate();
		//Clear();
    
	});

	resultscreen.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	wrapper.style.display = 'none';
  wrapper2.style.display = 'none';
	buttons.style.display = 'none';
	
};

const gameStart = () => {
	check = false;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	resultscreen.style.display = 'none';
  startinfo.style.display = 'none';
	progressBarStart('start', 2);
};

const gameWin = async() => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Zadanie udane!';
	wrapper.style.display = 'none';
  wrapper2.style.display = 'none';
	buttons.style.display = 'none';
	hackText.style.display = 'none';
	resultscreen.style.display = 'none';
  startinfo.style.display = 'none';
	document.getElementById("endInfo").innerHTML = "Otrzymane punkty: 10 pkt";

	progressBarStart('end', 2);
};

const gameOver = async() => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Zadanie nieudane!';
	wrapper.style.display = 'none';
	buttons.style.display = 'none';
	hackText.style.display = 'none';
	resultscreen.style.display = 'none';
	document.getElementById("endInfo").innerHTML = "Otrzymane punkty: 0 pkt";

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
			//console.log(width);

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
				wrapper.style.display = 'flex';
        wrapper2.style.display = 'flex';
				buttons.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				check = true;
        IntitDisc(disknum);
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				wrapper.style.display = 'none';
        wrapper2.style.display = 'none';
				buttons.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				gameOver();
				return;
			}

			if (type == 'end') {
				wrapper.style.display = 'none';
        wrapper2.style.display = 'none';
				buttons.style.display = 'none';
				hackText.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
				hackInfo.style.display = 'none';
				resultscreen.style.display = '';
        startinfo.style.display = '';
			}
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

// Variables to store initial positions and offsets
let initialX = 0;
let initialY = 0;
let offsetX = 0;
let offsetY = 0;
let draggedDisk = null; // Declare draggedDisk globally
let draggedDiskTower = 0;
var disknum = 6;


function IntitDisc(disknum){
  for (let i = disknum; i > 0; i--){
    document.getElementById("tower21").appendChild(document.getElementById("disk" + i));
    document.getElementById("disk" + i).style.display = "block";
  }
}

function ClearDisc(){
  for (let i = 1; i < 9; i++){
    document.getElementById("disk" + i).style.display = "none";
    document.getElementsByClassName("wrapper")[0].appendChild(document.getElementById("disk" + i));
  }
}

// Function to initialize drag
function initializeDrag(element, event) {
    if (element != element.parentNode.children[element.parentNode.children.length - 1]){
      return
    }
    // Prevent default touch event behavior to avoid scrolling or other interference
    event.preventDefault();

    // Determine whether the event is a mouse event or a touch event
    let clientX, clientY;
    if (event.type.startsWith('touch')) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    draggedDiskTower = element.parentNode.id.slice(5)

    // Store initial positions and offsets
    initialX = clientX;
    initialY = clientY;
    offsetX = clientX - element.getBoundingClientRect().left;
    offsetY = clientY - element.getBoundingClientRect().top;

    // Set element's position to absolute
    element.style.position = 'absolute';

    // Set initial position based on the document coordinates
    element.style.left = initialX - offsetX + 'px';
    element.style.top = initialY - offsetY + 'px';

    // Set z-index to bring the element to the top
    element.style.zIndex = '9999';

    // Move the element to the top of the document
    document.body.appendChild(element);

    // Store reference to the dragged disk
    draggedDisk = element;
    

    // Add event listeners for mousemove and mouseup events
    if (event.type.startsWith('touch')) {
        document.addEventListener('touchmove', dragElement);
        document.addEventListener('touchend', dropDisk);
    } else {
        document.addEventListener('mousemove', dragElement);
        document.addEventListener('mouseup', dropDisk);
    }
}

// Function to handle dragging
function dragElement(event) {
    // Prevent default touch event behavior to avoid scrolling or other interference
    event.preventDefault();

    // Determine whether the event is a mouse event or a touch event
    let clientX, clientY;
    if (event.type.startsWith('touch')) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    if (draggedDisk) {
        // Calculate new position based on mouse/touch position and initial offset
        let newX = clientX - offsetX;
        let newY = clientY - offsetY;

        // Move the element to the new position
        draggedDisk.style.left = newX + 'px';
        draggedDisk.style.top = newY + 'px';
    }
}

// Function to handle dropping the disk
function dropDisk() {
    if (draggedDisk) {
        // Remove event listeners for dragging
        document.removeEventListener('mousemove', dragElement);
        document.removeEventListener('mouseup', dropDisk);
        document.removeEventListener('touchmove', dragElement);
        document.removeEventListener('touchend', dropDisk);

        // Reset z-index and position
        draggedDisk.style.zIndex = '';
        draggedDisk.style.position = 'absolute';


        let towers = document.getElementsByClassName('container2');

        // Calculate the nearest pole's position
        let minDistance = Infinity;
        let nearestTower;
        for (let i = 0; i < towers.length; i++) {
            let tower = towers[i];
            let poleRect = tower.getBoundingClientRect();
            let diskRect = draggedDisk.getBoundingClientRect();
            let distance = Math.abs((diskRect.left + draggedDisk.offsetWidth/2) - (poleRect.left + tower.offsetWidth/2));
            if (distance < minDistance) {
                minDistance = distance;
                nearestTower = tower;
            }
        }

        draggedDisk.style.position = '';
        //console.log(nearestTower.id.slice(5))
        if (document.getElementById("tower2" + nearestTower.id.slice(5)).children.length > 0){
          if (document.getElementById("tower2" + nearestTower.id.slice(5)).children[document.getElementById("tower2" + nearestTower.id.slice(5)).children.length - 1].id.slice(4) > draggedDisk.id.slice(4)){
            document.getElementById("tower2" + nearestTower.id.slice(5)).appendChild(draggedDisk);
          }
          else{
            document.getElementById("tower" + draggedDiskTower).appendChild(draggedDisk);
          }
        }
        else{
          document.getElementById("tower2" + nearestTower.id.slice(5)).appendChild(draggedDisk);
        }
        

        // Reset draggedDisk
        draggedDisk = null;
        draggedDiskTower = 0;

        checkTowers();
    }
}

function checkTowers(){

  let towers = document.getElementsByClassName('container3');
  if (towers[2].children.length == disknum){
    gameWin();
  }
}

function level(id){
	document.getElementById("easy").style.border = "none";
	document.getElementById("normal").style.border = "none";
	document.getElementById("hard").style.border = "none";

	document.getElementById(id).style.border = "1px solid rgba(105, 105, 105, 0.5)";
	difficulty = id;
}

/*
var delay = 200;
var drag = false;
var objDisk = null;
var x = 0;
var y = 0;
var disksOnTower1 = new Array(null, null, null, null, null, null, null, null);
var disksOnTower2 = new Array(null, null, null, null, null, null, null, null);
var disksOnTower3 = new Array(null, null, null, null, null, null, null, null);
var disksOnTowers = new Array(disksOnTower1, disksOnTower2, disksOnTower3);
var offsetleft = 30;
var offsettop = 30;
var offsettower = 20;
var offsethoriz = 30;
var basetop = 0;
var diskheight = 0;
var midhoriztower = 0;
var indexTo = 1;
var indexFr = 1;
var movectr = 0;
var gameOver = false;
var prevIndex = 0;
var zindex = 0;
var currTower = 1;
var prevTower = 1;
var demo = false;
var arrFr = new Array(255);
var arrTo = new Array(255);
var idx = 0;
var pos = 0;
var t = null;
function init() {
  if (document.getElementById) {
    var diskno = document.hanoi.diskno;
    diskno.options.selectedIndex = 0;
    drawTowers();
	console.log(parseInt(diskno.options[diskno.options.selectedIndex].text));
    drawDisks(parseInt(diskno.options[diskno.options.selectedIndex].text));
  }
}
function initVars() {
  for (var i = 0; i < disksOnTower1.length; i++) {
    disksOnTower1[i] = null;
    disksOnTower2[i] = null;
    disksOnTower3[i] = null;
  }
  drag = false;
  indexTo = 1;
  indexFr = 1;
  movectr = 0;
  zindex = 0;
  idx = 0;
  pos = 0;
  t = null;
  gameOver = false;
  demo = false;
}
function drawTowers() {
  const tower1 = document.getElementById("tower1");
  const tower2 = document.getElementById("tower2");
  const tower3 = document.getElementById("tower3");
  const settings = document.getElementById("settings");
  const towerWidth = parseInt(tower1.style.width);
  const towerHeight = parseInt(tower1.style.height);
  const settingsWidth = parseInt(settings.style.width);
  midhoriztower = parseInt(document.getElementById("horiztower1").style.width) / 2;
  diskheight = parseInt(document.getElementById("disk1").style.height);
  tower1.style.left = `${offsetleft}px`;
  tower2.style.left = `${offsetleft + towerWidth + offsettower}px`;
  tower3.style.left = `${offsetleft + (towerWidth + offsettower) * 2}px`;
  settings.style.left = `${offsetleft + 1.5 * towerWidth + offsettower - settingsWidth / 2}px`;
  settings.style.top = `${parseInt(tower1.style.top) + towerHeight + offsethoriz}px`;
}
function drawDisks(disknum) {
  var tower1 = document.getElementById("tower1");
  var disktop = parseInt(tower1.style.top) + parseInt(document.getElementById("horiztower1").style.top);
  var lefttower1 = parseInt(tower1.style.left);
  var disk;
  var f = document.hanoi;
  basetop = disktop;
  for (var i = disksOnTower1.length; i >= 1; i--) {
    disk = document.getElementById("disk" + i);
    disk.style.zIndex = ++zindex;
    if (i <= disknum) {
      disk.style.left = lefttower1 + midhoriztower - parseInt(disk.style.width) / 2 + "px";
      disk.style.top = disktop - diskheight - 1 + "px";
      disktop = parseInt(disk.style.top);
      disksOnTowers[0][i - 1] = disk;
    } else {
      disk.style.left = "-250px";
      disk.style.top = "-250px";
      disksOnTowers[0][i - 1] = null;
    }
  }
  f.minmove.value = f.diskno.options[f.diskno.options.selectedIndex].value;
  f.yourmove.value = 0;
}
function newGame(obj) {
  initVars();
  drawDisks(parseInt(obj.options[obj.options.selectedIndex].text));
}
function initializeDrag(disk, e) {
  if (!e) e = event;
  indexFr = indexTo;
  if (disk.id != disksOnTowers[indexFr - 1][0].id || gameOver || demo) return;
  objDisk = disk;
  x = e.clientX;
  y = e.clientY;
  tempx = parseInt(disk.style.left);
  tempy = parseInt(disk.style.top);
  document.onmousemove = dragDisk;
}
function dragDisk(event) {
  if (!event) event = window.event;
  zindex++;
  drag = true;
  var posX = tempx + event.clientX - x;
  var posY = tempy + event.clientY - y;
  var objTower1 = document.getElementById("tower1");
  var objTower2 = document.getElementById("tower2");
  var objTower3 = document.getElementById("tower3");
  var tower1Left = parseInt(objTower1.style.left);
  var tower2Left = parseInt(objTower2.style.left);
  var tower3Left = parseInt(objTower3.style.left);
  var tower3Width = parseInt(objTower3.style.width);
  objDisk.style.zIndex = zindex;
  objDisk.style.left = posX + "px";
  objDisk.style.top = posY + "px";
  if (event.clientX >= document.body.clientWidth - 10 || event.clientY >= document.body.clientHeight - 5 || event.clientX == 5 || event.clientY == 5) {
    indexTo = indexFr;
    dropDisk(objDisk);
  } else if (tower3Left <= posX && tower3Left + tower3Width >= posX && parseInt(objTower3.style.top) + parseInt(objTower3.style.height) > posY) {
    indexTo = 3;
  } else if (tower2Left <= posX && tower2Left + tower3Width >= posX) {
    indexTo = 2;
  } else if (tower1Left <= posX && tower1Left + parseInt(objTower1.style.width) >= posX) {
    indexTo = 1;
  } else {
    indexTo = indexFr;
  }
  return false;
}
function dropDisk(disk) {
  var f = document.hanoi;
  document.onmousemove = function () {
    return false;
  };
  if (!drag) return;
  var gameStatus = false;
  var topDisk = disksOnTowers[indexTo - 1][0];
  if (indexFr === indexTo) {
    getNewTop(indexFr, null);
    pushDisk(disk, indexFr);
    getNewTop(indexFr, disk);
  } else if (topDisk === null) {
    pushDisk(disk, indexTo);
    getNewTop(indexFr, null);
    getNewTop(indexTo, disk);
    movectr++;
    currTower = indexTo;
    prevTower = indexFr;
  } else if (parseInt(disk.style.width) < parseInt(topDisk.style.width)) {
    pushDisk(disk, indexTo);
    getNewTop(indexFr, null);
    getNewTop(indexTo, disk);
    movectr++;
    currTower = indexTo;
    prevTower = indexFr;
    if (indexTo === 3) gameStatus = checkStatus();
  } else {
    getNewTop(indexFr, null);
    pushDisk(disk, indexFr);
    getNewTop(indexFr, disk);
  }
  drag = false;
  f.yourmove.value = movectr;
  if (gameStatus) {
    minmove = parseInt(f.minmove.value);
    var msg = "";
    if (movectr === minmove) {
      msg = "\nGood job! You completed the game in " + minmove + " moves.";
    } else if (movectr > minmove) {
      msg = "\nBut there's room for improvement.";
      msg = "\nThe minimum move count for this number of disks is " + minmove;
    }
    alert("Well done! You completed the game.," + msg);
    gameOver = true;
  }
}
function checkStatus() {
  var gameStat = false;
  var disks = 0;
  for (var i = 0; i < disksOnTower3.length; i++) {
    if (disksOnTowers[2][i] != null) disks++;
  }
  if (disks == parseInt(document.hanoi.diskno.options[document.hanoi.diskno.options.selectedIndex].text)) gameStat = true;
  return gameStat;
}
function pushDisk(disk, index) {
  var diskWidth = parseInt(disk.style.width);
  var towerLeft = parseInt(document.getElementById("tower" + index).style.left);
  var topDisk = disksOnTowers[index - 1][0];
  if (topDisk != null) {
    topDiskWidth = parseInt(topDisk.style.width);
    topDiskTop = parseInt(topDisk.style.top);
    disk.style.left = towerLeft + midhoriztower - diskWidth / 2 + "px";
    disk.style.top = topDiskTop - diskheight - 1 + "px";
  } else {
    disk.style.left = towerLeft + midhoriztower - diskWidth / 2 + "px";
    disk.style.top = basetop - diskheight - 1 + "px";
  }
}
function getNewTop(index, disk) {
  if (disk == null) {
    for (var i = 0; i < disksOnTower1.length - 1; i++) {
      disksOnTowers[index - 1][i] = disksOnTowers[index - 1][i + 1];
    }
    disksOnTowers[index - 1][disksOnTower1.length - 1] = null;
  } else {
    for (var i = disksOnTower1.length - 1; i >= 1; i--) {
      disksOnTowers[index - 1][i] = disksOnTowers[index - 1][i - 1];
    }
    disksOnTowers[index - 1][0] = disk;
  }
}

function moveDisk() {
  frm = document.hanoi;
  disk = disksOnTowers[arrFr[pos]][0];
  pushDisk(disk, arrTo[pos] + 1);
  getNewTop(arrFr[pos] + 1, null);
  getNewTop(arrTo[pos] + 1, disk);
  movectr++;
  frm.yourmove.value = movectr;
  pos++;
  if (movectr < parseInt(frm.minmove.value)) t = window.setTimeout("moveDisk()", delay); else {
    alert("Can you do that in " + movectr + " moves?");
    gameOver = true;
    frm.btnSolve.value = "Solve";
    frm.btnIns.disabled = false;
    frm.btnRes.disabled = false;
  }
}
function getMoves(from, to, empty, numDisk) {
  if (numDisk > 1) {
    getMoves(from, empty, to, numDisk - 1);
    arrFr[idx] = from;
    arrTo[idx++] = to;
    getMoves(empty, to, from, numDisk - 1);
  } else {
    arrFr[idx] = from;
    arrTo[idx++] = to;
  }
}

*/

gameInit();
