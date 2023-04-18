async function getLights() {
  try {
    const response = await fetch('http://192.168.0.5/api/ZknBL-Ryw3Qmi7P73yabgNbc958uXwav2oJhPUtk/lights');
    const lights = await response.json();

    const statusBox = document.querySelector('.status-box');
    statusBox.innerHTML = '';

    let allLightsOff = true;

    Object.keys(lights).forEach(key => {
      const light = lights[key];
      if (light.name.includes("Kitchen")) {
        const div = document.createElement('div');
        div.innerHTML = `
          <h2>${light.name}</h2>
          <p>Brightness: ${light.state.bri}</p>
          <p>On/Off: ${light.state.on ? 'On' : 'Off'}</p>
          <button class="toggle-btn" data-light-id="${key}">
            ${light.state.on ? 'Turn Off' : 'Turn On'}
          </button>
        `;
        statusBox.appendChild(div);

        const toggleButton = div.querySelector('.toggle-btn');
        toggleButton.addEventListener('click', async () => {
          const newState = !light.state.on;
          try {
            const url = `http://192.168.0.5/api/ZknBL-Ryw3Qmi7P73yabgNbc958uXwav2oJhPUtk/lights/${key}/state`;
            const method = 'PUT';
            const body = JSON.stringify({ on: newState });
            const response = await fetch(url, { method, body });
            const data = await response.json();
            toggleButton.textContent = newState ? 'Turn Off' : 'Turn On';
            const onOff = toggleButton.previousElementSibling;
            onOff.textContent = `On/Off: ${newState ? 'On' : 'Off'}`;
          } catch (error) {
            console.error('Error toggling the light:', error);
          }
        });

        if (light.state.on) {
          allLightsOff = false;
        }
      }
    });

    if (statusBox.innerHTML === '') {
      statusBox.innerHTML = 'All kitchen lights are turned off';
    }

  } catch (error) {
    console.error('Error retrieving lights:', error);
  }
}

setInterval(getLights, 5000); // Refresh every 5 seconds
