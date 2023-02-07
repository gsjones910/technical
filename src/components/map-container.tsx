import React, { useState, useMemo, useCallback } from 'react';
import DeckGL from '@deck.gl/react/typed';// eslint-disable-line import/no-webpack-loader-syntax
import {GeoJsonLayer} from '@deck.gl/layers/typed';// eslint-disable-line import/no-webpack-loader-syntax
import * as turf from "turf";
import transformScale from "@turf/transform-scale";
import Map, { Source, Layer } from 'react-map-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { dataLayer } from '../map-style';
import { updatePercentiles } from '../utils';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN; // Set your mapbox token here

function MapContainer(props: any) {
  const { floorNumber, floorHeight, lotCoverage, plot } = props;

  const [initialViewState, setInitialViewState] = useState({
    longitude: 6.824831947,
    latitude: 46.469261771,
    zoom: 18
  });

  const onHover = useCallback((event: any) => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature = features && features[0];

  }, []);

  const data = useMemo(() => {
    const res = plot && updatePercentiles(plot, floorNumber, floorHeight);
    return res;
  }, [plot, floorNumber, floorHeight]);

  const layers = useMemo(() => {
    var scale = 0.5 * lotCoverage / 100 + 1
    const plots: any = plot.coordinates[0]
    setInitialViewState({
      longitude: plots[0][0][0],
      latitude: plots[0][0][1],
      zoom: 18
    })
    var polygon = turf.polygon(plots);
    var scaledPoly:any = transformScale(polygon, scale);
    const scaledLayer = new GeoJsonLayer({
      id: "union-layer",
      data: scaledPoly,
      filled: true,
      stroked: true,
      lineWidthMinPixels: 2,
      getFillColor: [0, 0, 0, 60]
    });
    return [scaledLayer];
  }, [plot, lotCoverage]);

  return (
    <DeckGL
      initialViewState={initialViewState}
      layers={layers}
      controller={true}
      onClick={({ object }: any) =>
        console.log(
          `Clicked on ${JSON.stringify(object && object.properties.name)}`
        )
      }
    >
      <Map
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
      </Map>
    </DeckGL>
  );
}

export default React.memo(MapContainer);
