document.getElementById('locationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const location = document.getElementById('location').value;
    const [latitude, longitude] = location.split(',').map(coord => coord.trim());
    
    getWeather(latitude, longitude);
});

function getWeather(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.current_weather) {
                const weather = data.current_weather;
                document.getElementById('weatherResult').innerHTML = `
                    <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
                    <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
                    <p><strong>Weather Code:</strong> ${weather.weathercode}</p>
                `;
            } else {
                document.getElementById('weatherResult').innerHTML = '<p>Unable to fetch weather data.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherResult').innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        });
}
