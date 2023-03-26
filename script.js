const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

let input = document.querySelector('.search-box input');
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
        e.preventDefault();
        search.click();
    }
})

search.addEventListener('click', () => {

    const API = 'aac55dcf7aa50bd9e20f7182e96b71c9'
    let city = document.querySelector('.search-box input').value;
    if (document.querySelector('.search-box input').value.toLowerCase() === 'melbourne'){
        city = city + ',AU';
    } else {
        city = document.querySelector('.search-box input').value;
    }

    if (city === ''){
        return;}
    
    // console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`)
    .then(response => response.json())
    .then(json => {

        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }
        error404.style.display= 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Haze':
                image.src = 'images/haze.png';
                break;
            case 'Mist':
                image.src = 'images/haze.png';
                break

            
            default:
                image.src = '';
        }
       
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px'

        });
});

