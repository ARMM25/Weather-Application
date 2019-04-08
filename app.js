    window.addEventListener('load', ()=>{
    let long;
    let lat;
    let tempratureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone")
    let tempratureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/4c96debca7f091c67b490236f73868d1/${lat},${long}`

        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {temprature, summary, icon } = data.currently;
            
            //Set DOM elements from the API
            temperatureDegree.textContent = temperature; 
            tempratureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            //Formula for Cels
            let cels = (temprature - 32) * (5/9)

            
            //set Icon
            setIcons(icon, document.querySelector(".icon"));

            //Change temp to Cels or Far
            tempratureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(cels);
                } else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temprature;
                }
            })
        });
    });
}
    function setIcons(icon, iconID){
        const skycons = new skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    } 
});
