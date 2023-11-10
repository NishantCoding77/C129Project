leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
SongStatus = "";
SongStatus2= "";


song = ""
song1 = ""

function preload(){
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
   
    video = createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function draw(){
  image(video,0,0,600,500);
  fill("#0000FF");
  stroke("#0000FF");
  songStatus2=song1.isPlaying();
  songStatus=song.isPlaying();
  if(leftWristScore>0.2){
    circle(leftWristX,leftWristY,20)
    song1.stop();
    if(SongStatus2 == false ){
        song.play();
        song.setVolume(1);
        song.rate(0.8);
        document.getElementById("songname").innerHTML = "Playing Harry Potter OST";
    }
  }
  
}

function modelLoaded(){
    console.log("Model has been intialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY=" + leftWristY )
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log(  "rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
    }
}