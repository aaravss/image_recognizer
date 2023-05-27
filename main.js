var shutter = document.getElementById("shutter");
var ding = document.getElementById("ding");

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    flip_horiz: true,
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    shutter.play();
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = 
        '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PM7ENQECm/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function check(){
    ding.play();
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);

        document.getElementById("result_object_name").innerHTML = 
        results[0].label
        document.getElementById("message").innerHTML = 
        '<b>The object ' + '"' + '<span id="result_object_name2"></span>' + '"' + ' has been successfully detected!</b><br><br>'
        document.getElementById("result_object_name2").innerHTML = 
        results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = 
        results[0].confidence.toFixed(3)*100+"%";

    }
}
