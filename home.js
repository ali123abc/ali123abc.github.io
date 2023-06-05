// Define a function to update the "datetime" element with the current date and time
function updateDateTime() {
    var now = new Date();
    document.getElementById("datetime").innerHTML = now.toLocaleString();
  }
  
  // Call the "updateDateTime" function once to set the initial content
  updateDateTime();
  
  // Call the "updateDateTime" function every second to update the content dynamically
  setInterval(updateDateTime, 1000);
  
  function getWeatherData() {
    let apiKey = '7233c7498f634085abb161829231504';
    let city = 'Barnstaple';
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let temperature = data.current.temp_c;
        let description = data.current.condition.text;
        document.getElementById('temperature').innerHTML = temperature;
        document.getElementById('description').innerHTML = description;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }
  
  getWeatherData();
  