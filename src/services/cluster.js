import supercluster from 'supercluster';

function convertGeoJSON(locations) {
  return locations.map((location) => {
    const lat = Number(parseFloat(location.coordinates[0]).toFixed(4));
    const lon = Number(parseFloat(location.coordinates[1]).toFixed(4));
    return {
      type: 'Feature',
      properties: {
        ...location,
        lat_y: lat,
        long_x: lon,
      },
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      }
    };
  });
}
export function getClusters(locations, zoom) {
  const points = convertGeoJSON(locations);
  const index = supercluster({ log: false });
  index.load(points);
  return index.getClusters([-180, -85, 180, 85], zoom);
}
