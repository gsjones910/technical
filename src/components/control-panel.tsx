import * as React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import InputSlider from './sliderComponent';

function ControlPanel(props: any) {
  const fileRef = React.useRef<any>();
  const { floor_number, lot_coverage, floor_height } = props;

  return (
    <Box sx={{ flexGrow: 1, padding: "0 10px", }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            GeoJSON
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <input
            ref={fileRef}
            type="file" hidden
            onChange={e => props.handleFileUpload(e)}
          />
          <Button
            variant="contained"
            style={{ textTransform: 'none' }}
            onClick={() => fileRef.current?.click()}
          >
            load geojson
          </Button>
        </Grid>
        <Grid item xs={12}>
          <InputSlider title="lot coverage %" sliderValue={lot_coverage} handleSlider={(val: any) => props.onCoverageChange(val)} />
        </Grid>
        <Grid item xs={12}>
          <InputSlider title="floor number" sliderValue={floor_number} handleSlider={(val: any) => props.onNumberChange(val)} />
        </Grid>
        <Grid item xs={12}>
          <InputSlider title="floor height" sliderValue={floor_height} handleSlider={(val: any) => props.onHeigtChange(val)} />
        </Grid>
      </Grid>

    </Box>
  );
}

export default React.memo(ControlPanel);
