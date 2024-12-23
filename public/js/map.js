
    // Step 1: Initialize the map and set its view to New York City
    let lat = coordinates[1];
    let lon = coordinates[0];
    const map = L.map('map').setView([lat,lon], 13); // Latitude, Longitude, Zoom Level

    // Step 2: Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    console.log(coordinates)
    // Step 3: Add a marker for New York City
    
    L.marker([lat,lon])
      .addTo(map)
      .bindPopup(`<b>${display}!</b><br>This is a specific area.`)
      .openPopup();
  