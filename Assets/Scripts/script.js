var idDitemukan = false;
var dataToDisplay = {
    "title": "",
    "desc": "",
    "url": ""
}

const sc1 = document.getElementById("abc");
const sc2 = document.getElementById("def");
const sc3 = document.getElementById("ghi");

const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id')?.toLocaleLowerCase();

if (idParam == undefined || idParam == null || idParam == "") {
    sc1.style.display = "block";
    sc2.style.display = "none";
    sc3.style.display = "none";
} else {
    sc1.style.display = "none";
    ambilData();
}

/*  
    ==========================================
      KAMU LIAT SCRIPT INI YA? GAPAPA KOK :)
    ==========================================
*/

function ambilData() {
    fetch('/Assets/Data/data1.json') //  ---> Itu path to json nya yak
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == idParam) {
                    idDitemukan = true;
                    dataToDisplay.title = data[i].title;
                    dataToDisplay.desc = data[i].description;
                    dataToDisplay.url = data[i].url;
                    updateTampilan();
                    break;
                }
            }

            if (idDitemukan) {
                sc2.style.display = "block";
                sc3.style.display = "none";
                tampilanResponsif();
            } else {
                sc2.style.display = "none";
                sc3.style.display = "block";
            }

        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
}

function updateTampilan() {
    document.getElementById("thetitle").textContent = dataToDisplay.title;
    document.getElementById("thedescription").textContent = dataToDisplay.desc;
    document.getElementById("theurl").textContent = dataToDisplay.url;
    document.getElementById("theimage").src = dataToDisplay.url;
}

function salinUrl() {
    if (dataToDisplay.url === "" || dataToDisplay.url == null) {
        return;
    } else {
        navigator.clipboard
            .writeText(dataToDisplay.url)
            .then(() => alert("URL berhasil disalin!"))
            .catch(() => alert("Gagal menyalin URL"));
    }
}

function tampilanResponsif() {
    if (window.innerWidth < 275) {
        document.getElementById("thethanks").style.display = "none";
    }
}

function goTo(location) {
    window.location.href = location;
}

function subscribeYoutube() {
    window.location.href = "https://www.youtube.com/@DynCrazy?sub_confirmation=1";
}