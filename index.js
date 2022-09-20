

function changemode(){
    let mybody = document.body;
    mybody.classList.toggle('mydark');
}
function closecoupon(){
    let coupon= document.getElementById(`coupon`);
    coupon.style.display="none";
    document.getElementById("photoslider").style.opacity="1";

}
let x= document.getElementById('out');
let y =document.getElementById('location');
function getgeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showposition);
    }
    else{
        x.innerHTML=" Geoloaction not available!"
       
    }
}
function showposition(data){
    console.log(data);
    let lat = data.coords.latitude;
    let long = data.coords.longitude;
    //  x.innerText = `Lat: ${lat.toFixed(2)} Long: ${long.toFixed(2)}`;
     const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
     //api calling
     fetch(url,{method:`GET`})
     //return promise
     .then((res)=>res.json())
     //resolved promise
     .then((data)=>{
        y.innerHTML=`${data.city.name} <br>  &nbsp &nbsp${data.list[0].temp.day} °C`
        
     })

}
