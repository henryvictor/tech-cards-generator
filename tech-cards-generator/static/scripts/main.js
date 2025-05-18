const figure = document.getElementById('figure');
const user = document.getElementById('user');
const title = document.getElementById('title');
const date = document.getElementById('date');
const dayDate = document.getElementById('day-date');
const spans = date.children;
const square = document.getElementById('square');
const path = document.getElementById('path');
const textField = document.getElementById('text-field');
const saveButton = document.getElementById('save-button');
const card = document.getElementById('card');
const logo = document.getElementById('logo-svg');
const svg2 = document.getElementById('svg2');

const couleurs = [[67, 75, 86], [50, 66, 89], [61, 31, 63], [106, 107, 81], [119, 199, 167], [248, 198, 109], [224, 122, 63], [220, 89, 73], [116, 23, 9], [94, 68, 52], [75, 93, 91], [218, 155, 41], [243, 199, 73], [143, 209, 193], [143, 197, 195], [152, 153, 132], [183, 106, 85], [222, 149, 66], [62, 60, 15], [92, 97, 60], [162, 166, 138], [224, 216, 148], [179, 105, 30], [55, 135, 136], [138, 200, 59], [202, 187, 63], [210, 195, 96], [238, 156, 65], [230, 120, 35], [198, 54, 25], [156, 23, 48], [65, 53, 63], [147, 153, 132], [212, 200, 105], [235, 225, 135], [180, 163, 76], [110, 84, 50], [49, 61, 67], [117, 167, 151], [66, 37, 42], [245, 161, 72], [240, 198, 179], [197, 228, 230], [173, 187, 192], [114, 93, 103], [202, 222, 184], [208, 201, 198], [205, 198, 139], [171, 144, 145], [131, 123, 93], [93, 118, 181], [108, 154, 149], [193, 155, 108], [202, 162, 110], [212, 118, 63], [234, 58, 69], [223, 120, 90], [211, 161, 127], [164, 200, 195], [96, 163, 173], [118, 214, 248], [60, 107, 126], [71, 109, 100], [222, 180, 74], [218, 125, 21]];
const adjectives = ["Random", "Mischiveous", "Genius", "Authentic", "Smart", "Insane", "Crazy", "Cultural", "Happy", "Knowledgeable"];
const titles = ["Graphic Designer", "Developer", "Businessman", "Product Owner", "Manager", "Technical Director", "Product Designer", "Tutor", "Intern", "Architect", "Product Manager", "Lead Developer", "Front End Developer", "Back End Developer"];


let now = new Date();
let formattedDate = now.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

dayDate.innerText = formattedDate;

function getCouleurs2() {
    const randomNumber = Math.floor(Math.random() * couleurs.length);
    const randomCouleur1 = couleurs[randomNumber];
    const randomCouleur2 = couleurs[randomNumber + 1];
    return [randomCouleur1, randomCouleur2]
}

function getAdjectiveAndTitle() {
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    return [randomTitle, randomAdjective]
}

function applyTitleAndAdjective() {
    const titleAndAdjectiveTmp = getAdjectiveAndTitle();
    title.innerText = titleAndAdjectiveTmp[1] + " " + titleAndAdjectiveTmp[0];
}

function applyCouleurs() {
    const couleursTmp = getCouleurs2();
    const color1 = couleursTmp[0];
    const color2 = couleursTmp[1];
    figure.style.backgroundColor = 'rgb(' + color1.join(',') + ')';
    path.style.fill = 'rgb(' + color2.join(',') + ')';
    user.style.color = 'rgb(' + color1.join(',') + ')';
    title.style.color = 'rgb(' + color1.join(',') + ')';
    date.style.borderColor = 'rgb(' + color1.join(',') + ')';
    square.style.background = 'repeating-linear-gradient( 45deg, rgb(' + color1.join(',') + '), rgb(' + color1.join(',') + ') 1px, transparent 1px, transparent 3px )';
    square.style.borderLeft = '1px solid rgb(' + color1.join(',') + ')';
    square.style.borderRight = '1px solid rgb(' + color1.join(',') + ')';
    logo.style.fill = 'rgb(' + color2.join(',') + ')';
    var paths = logo.children;
    for (child of paths) {
        child.style.fill = 'rgb(' + color1.join(',') + ')';
    };
    /*
    var paths2 = svg2.children;
    for (child of paths2) {
        child.style.fill = 'rgb(' + color2.join(',') + ')';
    };
    */
    for (child of spans) {
        child.style.color = 'rgb(' + color1.join(',') + ')';
    };
}

function applyRandomColorsTitleAdjective() {
    applyCouleurs();
    applyTitleAndAdjective();
}

textField.addEventListener("input", (event) => {
    text = textField.value;
    //console.log(text);
    user.innerText = text;
    localStorage.setItem("userName", text);
});

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    user.innerText = localStorage.getItem("userName");
    textField.value = localStorage.getItem("userName");
    applyCouleurs();
    applyTitleAndAdjective();
});

saveButton.addEventListener('click', function() {
    html2canvas(card, {backgroundColor: "rgba(0,0,0,0)"}).then(function(canvas) {
        var imgUrl = canvas.toDataURL();
        var link = document.createElement('a');
        link.href = imgUrl;
        link.download = 'card.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(function () {
      console.log("Erreur dans la sauvegarde");
 });
});

function managePalette(requestedPalette) {
    for (var i = 0; i < requestedPalette.length; i++) {
        color = requestedPalette[i];
        R = color[0]
        G = color[1]
        B = color[2]
        //L = max(R, G, B) / 255
        //L = (0.212 * R + 0.701 * G + 0.087 * B) / 255
        L = ((0.2126 * R) + (0.7152 * G) + (0.0722 * B)) / 255;
        console.log("Luminance : ", L);
        if (L > 0.90) {
            console.log("Luminance", L);
            requestedPalette.splice(i, 1);
            console.log("####### - Deleted ", color);
        }
        else {
            console.log("Couleur conservée : ", color);
        }
    }
    return managedRequestedPalette
}

function requestApi() {
    var url = "http://colormind.io/api/";
    var data = {
	    model : "default",
	    input : [[44,43,44],[90,83,82],"N","N","N"]
    }

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
		    var palette = JSON.parse(http.responseText).result;
            console.log(palette);
            requestedPalette = palette;
            managePalette(requestedPalette);
	    }
    }

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
}