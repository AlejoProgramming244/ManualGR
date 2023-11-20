Webcam.set
({
    height: 350,
    width: 350,
    image_format: "png",
    png_quality: 90 
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_photo()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='image' src="+ data_uri +">"
    })
}

classify = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/p7hU9FcnQ/model.json", modelLoaded);

console.log("Modelo ML5", ml5.version);

function modelLoaded()
{
    console.log("ModelLoaded!", modelLoaded);
}

function Scanphoto()
{
    img = document.getElementById("image");
    classify.classify(img, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.error("Hubo un error", error);
    }
    else
    {
        console.log(results);

        document.getElementById("OManualGR").innerHTML = "Gesto Manual: " + results[0].label;

        document.getElementById("PManualGR").innerHTML = "Estoy seguro un " + (results[0].confidence* 100).toFixed(5) + "%";
    }
}