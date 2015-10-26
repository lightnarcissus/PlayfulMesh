

// Keep track of our socket connection
var socket;
var randomChance;
var randomShape;
var randR;
var randG;
var randB;

var notes = [61,62,63,64,65,66,67,68];
var socket;
// For automatically playing the song
var index = 0;
var song = [ 
  { note: 4, duration: 400, display: "D" },  
  { note: 0, duration: 200, display: "G" },  
  { note: 1, duration: 200, display: "A" },  
  { note: 2, duration: 200, display: "B" }, 
  { note: 3, duration: 200, display: "C" },  
  { note: 4, duration: 400, display: "D" },  
  { note: 0, duration: 400, display: "G" },  
  { note: 0, duration: 400, display: "G" }
];
var trigger = 0;
var autoplay = false;
var osc;
function setup() {
  createCanvas(windowWidth, windowHeight);
  notes=[random(22,106), random(22,106), random(22,106), random(22,106), random(22,106), random(22,106), random(22,106)];
  //background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://10.1.1.203:8001');
 // randomShape=random(0,2);
  randR=random(0,255);
  randG=random(0,255);
  randB=random(0,255);

  //MUSIC
  osc = new p5.SinOsc();
  // Start silent
  osc.start();
  osc.amp(1);


  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {

    //music
    window.console.log(accelerationX);
     if (millis() > trigger){
    if(index<song.length)
    {
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
    window.console.log(index);
  }
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    index=0;
  }




      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
     // randomShape=random(0,2);
      randomChance=random(0,1000);
      if(randomChance<1)
      {
        randR=random(0,255);
        randG=random(0,255);
        randB=random(0,255);
        osc.freq(random(10,40),5,10);
        
      
      }
      fill(randR,randG,randB);
      noStroke();
      ellipse(data.x,data.y,data.a,data.b);
      // if(randomShape==0)
      //   ellipse(data.x,data.y,80,80);
      // else if(randomShape==1)
      //   line(data.x,data.y,random(1,5)*data.x,random(1,5)*data.y);
    }
  );
}

function draw() {
  // Nothing
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);
  
  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}
function touchMoved() {
  // Draw some white circles

    randomChance=random(0,1000);
      if(randomChance<1)
      {
        randR=random(0,255);
        randG=random(0,255);
        randB=random(0,255);
      
      }
      fill(randR,randG,randB);
      noStroke();
      osc.amp(map(accelerationX,0,100,0,0.9));
     osc.phase(map(accelerationY,0,100,0,0.9));
      ellipse(touchX,touchY,accelerationX,accelerationY);

  var key = floor(map(touchX, touchY, width, height, notes.length));
  playNote(notes[key]);
  // Send the mouse coordinates
  sendmouse(touchX,touchY,accelerationX,accelerationY);

  // noStroke();
  // fill(0,0,0,10);

}

function touchEnded() {
  osc.fade(0,0.5);
}

// Function for sending to the socket
function sendmouse(xpos, ypos, xacc, yacc) {
  // We are sending!
 // console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    a: xacc,
    b: yacc
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}