import supercluster from 'supercluster';

function convertGeoJSON(locations) {
  return locations.map(location => ({
    type: 'Feature',
    properties: {
      ...location,
      lat_y: location.coordinates[0],
      long_x: location.coordinates[1],
    },
    geometry: {
      type: 'Point',
      coordinates: [location.coordinates[1], location.coordinates[0]]
    }
  }));
}
export function getClusters(locations, zoom) {
  const points = convertGeoJSON(locations);
  const index = supercluster({ log: false });
  index.load(points);
  return index.getClusters([-180, -85, 180, 85], zoom);
}
