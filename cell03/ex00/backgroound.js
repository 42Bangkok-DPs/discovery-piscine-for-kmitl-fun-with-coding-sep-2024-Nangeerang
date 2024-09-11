let scaleFactor = 1;
function changeBackground() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;

    const button = document.getElementById('myButton');
    scaleFactor += 0.1; 
    button.style.transform = `scale(${scaleFactor})`; 
  }