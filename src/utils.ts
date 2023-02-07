import type GeoJSON from 'geojson';

export function updatePercentiles(
  plot: any,
  floorNumber: number,
  floorHeight: number,
): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  var feature: any = []
  if (floorNumber > 1) {
    for (let i = 0; i < floorNumber; i++) {
      feature.push({
        type: "Feature",
        properties: {
          name: "Arch",
          level: 1,
          color: "yellow",
          base_height: floorHeight * i,
          height: floorHeight - 0.1
        },
        geometry: {
          coordinates: plot.coordinates[0],
          type: "Polygon"
        },
        id: i
      })
    }
  }else{
    feature = [{
      type: "Feature",
      properties: {
        name: "Arch",
        level: 1,
        color: "blue",
        base_height: 0,
        height: 0.1
      },
      geometry: {
        coordinates: plot.coordinates[0],
        type: "Polygon"
      },
      id: -1
    }]
  }

  return {
    type: 'FeatureCollection',
    features: feature
  };

}