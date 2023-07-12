audio = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

function setup(){
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();  

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotResult);
}

function preload(){
 audio = loadSound("music.mp3");
}

function draw(){
  image(video, 0, 0, 600, 500);
  
  fill("red");
  stroke("black");

  if(scorerightWrist > 0.2){
    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100){
      document.getElementById("speed").innerHTML = "Speed: 0.5x";
      audio.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY <= 200){
      document.getElementById("speed").innerHTML = "Speed: 1x";
      audio.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300){
      document.getElementById("speed").innerHTML = "Speed: 1.5x";
      audio.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400){
      document.getElementById("speed").innerHTML = "Speed: 2x";
      audio.rate(2);
    }

    else if(rightWristY > 400){
      document.getElementById("speed").innerHTML = "Speed: 2.5x";
      audio.rate(2.5);
    }
  }
  

  if(scoreleftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    innumber_leftwristY = Number(leftWristY);
    withoutdecimal_leftwristY = floor(innumber_leftwristY);
    volume = withoutdecimal_leftwristY/500;
    audio.setVolume(volume);
    document.getElementById("volume").innerHTML = "Volume:" + volume;
  }
}

function play(){
    audio.play();
    audio.setVolume(1);
    audio.rate(1);
}

function modelLoaded(){
  console.log("PoseNet is Initialised");
}

function gotResult(results){
  if (results.length > 0){
    console.log(results);
  
  scoreleftWrist = results[0].pose.keypoints[9].score; 
  scorerightWrist = results[0].pose.keypoints[10].score; 


  leftWristX = results[0].pose.leftWrist.x;
  leftWristY = results[0].pose.leftWrist.y;

  rightWristX = results[0].pose.rightWrist.x;
  rightWristY = results[0].pose.rightWrist.y;
  }
}