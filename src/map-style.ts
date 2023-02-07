import type {FillLayer} from 'react-map-gl';

export const dataLayer: FillLayer = {
  id: 'data',
  type: 'fill-extrusion' as 'fill',
  source: 'floorplan',
  paint: {
    'fill-extrusion-color': ['get', 'color'],
    'fill-extrusion-height': ['get', 'height'],
    'fill-extrusion-base': ['get', 'base_height'],
    'fill-extrusion-opacity': 0.5
    } as any
};
