console.log('Weather Application v0.0.1');
const url = `${window.location.protocol}//${window.location.host}/weather/?address={{address}}`
const getWeather = (url, callback) => {
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            callback(data);
        });
    });
}

const weatherFom = document.querySelector('form');
const search = document.querySelector('form input');
const status = document.querySelector('.weatherInfo .status');
const title = document.querySelector('.weatherInfo .title');
const temp = document.querySelector('.weatherInfo .temp');
const feels = document.querySelector('.weatherInfo .feelslike');
const desc = document.querySelector('.weatherInfo .desc');
const icon = document.querySelector('.weatherInfo img');

weatherFom.addEventListener('submit', (e)=> {
    e.preventDefault();
    status.textContent = "Loading weather information for " + search.value;

    title.textContent = '';
    icon.src = '';
    temp.textContent = '';
    feels.textContent = '';
    desc.textContent = '';

    getWeather(url.replace('{{address}}', search.value), (data)=> {
        console.log('data is ', data);
        if(data.error){
            status.textContent = data.error;
        }else{
            status.textContent = "";
            title.textContent = data.location;
            icon.src = data.icon;
            temp.textContent = data.temprature + '°';
            feels.textContent = data.feelslike + '°';
            desc.textContent = data.description;
        }
    });

    return false;
});