import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// import React from 'react'

function DisplayMap({lat,long}) {
  console.log(lat,long);
  console.log(lat,long);
    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([lat, long], 12);
        // Add the OpenStreetMap layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 30,
        }).addTo(map);
    
        // Create a custom icon
        const customIcon = L.icon({
          iconUrl: "https://img.icons8.com/ios-filled/50/null/marker.png",
          iconSize: [30, 30],
          iconAnchor: [10, 10],
          popupAnchor: [0, -20],
        });
    
        // Add a marker to the map with the custom icon
        const marker = L.marker([lat,long], { icon: customIcon }).addTo(map);
    
        // Clean up on unmount
        return () => {
          map.remove();
        };
      }, [lat,long]);
    
      return (
        <>
        <center>
        <h2> Location of House</h2>
        </center>
        <div id="map" style={{ height: '500px', width: '100%',borderRadius:"10px"}} />
        </>
      )
}

export default React.memo(DisplayMap)