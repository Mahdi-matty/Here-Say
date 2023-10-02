var map;
    function initialize() {
    var myLatlng = new google.maps.LatLng(40.713956,-74.006653);
  
    var myOptions = {
       zoom: 8,
       center: myLatlng,
       mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
  
    var marker = new google.maps.Marker({
    draggable: true,
    position: myLatlng, 
    map: map,
    title: "Your location"
    });
  
    google.maps.event.addListener(marker, 'click', function (event) {
    document.getElementById("latbox").value = event.latLng.lat();
    document.getElementById("lngbox").value = event.latLng.lng();
});

google.maps.event.addListener(marker, 'click', function (event) {
    let getLat = this.getPosition().lat();
    let getLang = this.getPosition() .lng();
    localStorage.setItem("getLat", getLat);
    localStorage.setItem("getLang", getLang);
    document.getElementById("latbox").value = this.getPosition().lat();
    document.getElementById("lngbox").value = this.getPosition().lng();
    localStorage.setItem("longit", document.getElementById("lngbox").value)
    locationFind.setItem("latitude");
    
});
 reverseGeo();
  
  }
  let cityLocal;
  let targetLan;
  
  
  function reverseGeo() {
    var cityLat =localStorage.getItem("getLat");
    var cityLon = localStorage.getItem("getLang");
     fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${cityLat}&lon=${cityLon}&limit=5&appid=26f0afb86e9cf6226ab49ee5e767a358`)
    .then(function (response){
        return response.json();
    }).then (function (data){
        console.log(data);
        cityLocal = data[0].country;
        document.querySelector("#firstCrap").textContent= data[0].name;
        document.querySelector("#secondCrap").textContent= cityLocal;
        return getCountry();
    })
    
  }
  let exTar;

  function getCountry() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "pYyOks18m688CTFInbtsWfh7SklnQvxS");
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    
    fetch(`https://api.apilayer.com/geo/country/code/${cityLocal}`, requestOptions)
    .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        document.querySelector("#thirdCrap").textContent= data[0].name;
        document.querySelector("#fourthCrap").textContent=data[0].languages[0].name;
        document.querySelector("#fifthCrap").textContent=data[0].capital;
        document.querySelector("#sixthCrap").textContent=data[0].population;
        exTar = data[0].currencies[0].code;
        document.querySelector("#seventhCrap").textContent=data[0].currencies[0].code;
        targetLan = textContent=data[0].languages[0].iso639_1;
        document.querySelector("#eighthCrap").textContent=data[0].languages[0].iso639_1;
    })
}
const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const translateParagraphs = async () => {
  const inputTexttest = document.querySelector("#transSeacrh");
  const inputText = inputTexttest.value;
  const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '437aa4723dmsh8eae8a882ee1508p18ab89jsn2da10d04f34f',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      body: new URLSearchParams({
          q: inputText,
          target:  `${targetLan}`,
          source: 'en'
      })
  };
 


  try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.data.translations.length > 0) {
        const translatedText = result.data.translations[0].translatedText;

        const pTarget = document.createElement("p");
        pTarget.textContent = translatedText;

        const translationContainer = document.querySelector("#translationContainer");
        translationContainer.appendChild(pTarget);
    } else {
        console.warn("No translation found.");
    }
} catch (error) {
    console.error(error);
}
};
document.querySelector("#searchBtn").addEventListener("click", translateParagraphs);
function showDes(event) {
    const sections = event.currentTarget;
    // sections.forEach(section => {
        sections.classList.toggle("show-description");
    }


document.querySelectorAll("section").forEach(section => {
    section.addEventListener("click", showDes);
});


function exchange() {
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_NKtmTMsXpVnAOBStOLKV1mGWodW5Of23cls4PwcD`)
    .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        document.querySelector("#ninthCrap").textContent= data[0].exTar;
    })
}
exchange();