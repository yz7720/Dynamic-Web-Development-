var socket = io.connect();
			
socket.on('connect', function() {
    console.log("Connected");
});   

socket.on('mouse', function(data) {
  
  console.log(data);
  noStroke();
  fill(data.r, data.g, data.b)
  ellipse(data.x, data.y, 20, 20);
});


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  socket = io.connect ('http://yz7720.itp.io:3000/')
}

function draw() {
  textSize(50);
  text("YOU FOUND ME",100,100);
  fill(255);

  textSize(50);
  text("WHAT ELSE",500,400);
  fill(255);

  textSize(50);
  text("I LOVE YOU",1200,800);
  fill(255);

  //background(220);
  // ellipse(mouseX, mouseY, 50, 50);
}

function mouseDragged() {
  var datatosend = {
    x: mouseX,
    y: mouseY,
    r: random(255),
    g: random(255),
    b: random(255)
  }
  socket.emit("mouse", datatosend);
}