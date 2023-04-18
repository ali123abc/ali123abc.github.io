// Use the Philips Hue API to retrieve the current status of your lights
fetch('http://192.168.0.5/api/ZknBL-Ryw3Qmi7P73yabgNbc958uXwav2oJhPUtk/lights')
.then(response => response.json())
.then(lights => {
  // Create HTML elements to display the status of each light
  const statusBox = document.querySelector('.status-box');
  statusBox.innerHTML = '';
  Object.keys(lights).forEach(key => {
    const light = lights[key];
    if (light.name.includes("Kitchen")) {
      const div = document.createElement('div');
      div.innerHTML = `
        <h2>${light.name}</h2>
        <p>Brightness: ${light.state.bri}</p>
        <p>On/Off: ${light.state.on ? 'On' : 'Off'}</p>
      `;
      statusBox.appendChild(div);
    }
  });
  if (statusBox.innerHTML === '') {
    statusBox.innerHTML = 'All kitchen lights are turned off';
  }
});

// Use a timer to periodically refresh the information from the API and update the HTML elements
setInterval(() => {
fetch('http://192.168.0.5/api/ZknBL-Ryw3Qmi7P73yabgNbc958uXwav2oJhPUtk/lights')
  .then(response => response.json())
  .then(lights => {
    const statusBox = document.querySelector('.status-box');
    let allLightsOff = true;
    Object.keys(lights).forEach(key => {
      const light = lights[key];
      if (light.name.includes("Kitchen")) {
        const brightness = statusBox.querySelector(`#${key} p:nth-of-type(1)`);
        const onOff = statusBox.querySelector(`#${key} p:nth-of-type(2)`);
        brightness.innerText = `Brightness: ${light.state.bri}`;
        onOff.innerText = `On/Off: ${light.state.on ? 'On' : 'Off'}`;
        if (light.state.on) {
          allLightsOff = false;
        }
      }
    });
    if (allLightsOff) {
      statusBox.innerHTML = 'All kitchen lights are turned off';
    }
  });
}, 5000); // Refresh every 5 seconds