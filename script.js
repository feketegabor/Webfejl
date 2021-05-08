/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function openKomp(evt, kompSzint) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        tablinks[i].disabled = false;
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(kompSzint).style.display = "block";
    evt.currentTarget.className += " active";
    document.getElementsByClassName("tablinks active").disabled = true;
    //Átmásolja az értékelés divet az írásbeli vizsga divjébe, de előtte törli a már meglévőt
    var divToCopy = document.getElementById('ertekeles');
    var masolat = divToCopy.cloneNode(true);
    document.getElementById("ertekeles").outerHTML = "";
    document.getElementById("irasbeliVizsga").appendChild(masolat);
    evt.currentTarget.disabled = true;
}

function closeTabs() {
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var divToCopy = document.getElementById('ertekeles');
    var masolat = divToCopy.cloneNode(true);
    document.getElementById("ertekeles").outerHTML = "";
    document.getElementById("vizsgaLeirasAlatt").appendChild(masolat);
    evt.currentTarget.disabled = true;
}

//Form validálás
$(document).ready(function () {
    $("#myform").validate({
        rules: {
            keresztnev: "required",
            vezeteknev: "required",
            email: {
                required: true,
                email: true
            },
            visszajelzes: {
                required: true,
                minlength: 10
            },
            visszTema: {

            }
        },
        messages: {
            vezeteknev: {
                required: "Írja be a vezetéknevét!",
                lettersonly: "Nem tartalmazhat számot a neve!"
            },
            keresztnev: {
                required: "Írja be a keresztnevét!",
                lettersonly: "Nem tartalmazhat számot a neve!"
            },
            visszajelzes: {
                required: "Írjon valamilyen visszajelzést a dobozba!",
                minlength: "Legalább 10 karakter legyen a visszajelzésében"
            },
            email: "Kérem valós email címet adjon meg!",
        },
    });
});

function visszaszaml() {
    var erettsegiDatum = new Date('05/14/2020 8:00 AM');
    var mostDatum = new Date();
    var masodperc = 1000;
    var perc = masodperc * 60;
    var ora = perc * 60;
    var nap = ora * 24;

    var megMennyi = erettsegiDatum - mostDatum;
    var visszaNap = Math.floor(megMennyi / nap);
    var visszaOra = Math.floor((megMennyi % nap) / ora);
    var visszaPerc = Math.floor((megMennyi % ora) / perc);
    var visszaMasodperc = Math.floor((megMennyi % perc) / masodperc);

    document.getElementById('visszaszaml').innerHTML = visszaNap + ' nap ' + visszaOra + ' óra ' + visszaPerc + ' perc ' + visszaMasodperc + ' mp ';
}
var timer = setInterval(visszaszaml, 1000);

//  function tananyagMegnyit(){
//     var ctd = document.getElementById('contentToDisappear')
//     ctd.innerHTML = "";
//     ctd.innerHTML = 


//  }
// var szelesseg = document.getElementById('iframe1').offsetWidth;
// var magassag = szelesseg * 40 / 180;
// document.getElementById('iframe1').style.height = magassag + 20 + "px";

function changeWordFile(evt) {
    var buttonContent = evt.currentTarget.innerHTML;
    var wordName = "Témakörök/" + buttonContent + ".docx";
    document.getElementById("wordLink").setAttribute('href', wordName);

    var feladatok;
    fetch('https://localhost:44378/api/feladat?tema=Anat%C3%B3mia%20%E2%80%93%20%C3%A9lettan')
        .then(response => response.json())
        .then(data => {
            feladatok = data;
            console.log(data);
            createIFrames(feladatok);
        });


}

function createIFrames(feladatok) {
    for (let index = 0; index < 1; index++) {
        const feladat = feladatok[index];
        let magassag = feladat["magassag"];
        let frameId = 'fFrame' + index;
        let frameSrc = feladat["feladatPdf"];
        // `<iframe id="${frameId}" src="${frameSrc}" width="100%" height="${magassag}" frameborder="0" allowfullscreen="")`
        $('<iframe>', {src: frameSrc, id: frameId, width: '100%', height: magassag, frameborder: 0}).appendTo('#iframecontainer')
    }
}
