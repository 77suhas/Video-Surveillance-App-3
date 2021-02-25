objects = ""
video = ""
status = ""
function preload() {
  video = createVideo('video.mp4')
  video.size(400, 400)
  video.hide()
}
function setup() {
  canvas = createCanvas(400, 400)
  canvas.center()
}
function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded)
  document.getElementById("status").innerHTML = "Status : Detecting objects"
}
function modelLoaded() {
  console.log("model is loaded")
  status = true
  video.loop()
  video.speed(1)
  video.volume(0)
}
function draw() {
  image(video, 0, 0, 400, 400)
  if (status != "") {
    objectDetector.detect(video, gotResults)
    for (i = 0; i < objects.length; i++) {
      objectName = objects[i].label
      accuracy = floor(objects[i].confidence * 100) + "%"
      x = objects[i].x
      y = objects[i].y
      height = objects[i].height
      width = objects[i].width
      document.getElementById("status").innerHTML = "status : objects are detected"
      document.getElementById("number").innerHTML = "number of objects detected :" + objects.length
      r = random(255)
      g = random(255)
      b = random(255)

      fill(r, g, b)
      stroke(r, g, b)
      text(objectName + " " + accuracy, x, y - 15)
      textSize(15)
      strokeWeight(2)
      noFill()
      rect(x, y, width, height)
    }
  }
}
function gotResults(error, results) {
  if (error) {
    console.log(error)
  }
  else {
    console.log(results)
    objects = results
  }
}