import React, { useState, useMemo, useCallback } from 'react';
import type GeoJSON from 'geojson';
import { Box, Grid } from '@mui/material';
import MapContainer from './components/map-container';
import ControlPanel from './components/control-panel';
import Statistiques from './components/statistiques';

import { updatePercentiles } from './utils';

const init = {
  type: "MultiPolygon",
  coordinates: [
    [
      [
        [
          6.82386387,
          46.469095495
        ],
        [
          6.823902186,
          46.46908068
        ],
        [
          6.824159079,
          46.468999131
        ],
        [
          6.824338894,
          46.468997858
        ],
        [
          6.82449149,
          46.468974396
        ],
        [
          6.824593806,
          46.468964515
        ],
        [
          6.824831947,
          46.469261771
        ],
        [
          6.825033759,
          46.469513579
        ],
        [
          6.824634938,
          46.469481552
        ],
        [
          6.824622278,
          46.469518637
        ],
        [
          6.824061917,
          46.469483483
        ],
        [
          6.823815628,
          46.469468113
        ],
        [
          6.82386387,
          46.469095495
        ]
      ]
    ]
  ]
}

export default function App() {
  const [floorNumber, setFloorNumber] = useState(1);
  const [floorHeight, setFloorHeight] = useState(10);
  const [lotCoverage, setLotCoverage] = useState(20);
  const [plot, setPlot] = useState(init);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data: any = JSON.parse(e.target?.result as string) as GeoJSON.FeatureCollection<GeoJSON.Polygon>;
      const res = updatePercentiles(data, floorNumber, floorHeight)
      setPlot(data);
    };
    reader.readAsText(file);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid container item xs={12} sm={6} md={4} lg={3} sx={{ zIndex: 1, backgroundColor: "white", height: "100vh", alignItems: 'center', justifyContent: 'center', padding: "0 10px" }}>
          <ControlPanel
            lot_coverage={lotCoverage} onCoverageChange={(value: any) => setLotCoverage(value)}
            floor_number={floorNumber} onNumberChange={(value: any) => setFloorNumber(value)}
            floor_height={floorHeight} onHeigtChange={(value: any) => setFloorHeight(value)}
            handleFileUpload={(e: any) => handleFileUpload(e)} />
          <Grid item xs={12} sx={{ display: { md: "flex", lg: "none" } }}>
            <Statistiques />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={7}>
          <MapContainer floorNumber={floorNumber} floorHeight={floorHeight} lotCoverage={lotCoverage} plot={plot} />
        </Grid>
        <Grid item lg={2} sx={{ zIndex: 1, backgroundColor: "white", display: { md: "none", lg: "flex" }, alignItems: 'center', justifyContent: 'center', padding: "0 10px" }}>
          <Statistiques />
        </Grid>
      </Grid>
    </Box>
  );
}
