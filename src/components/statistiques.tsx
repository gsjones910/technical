import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

function statistiques(props: any) {
  // const { landArea, buildingArea, floorArea, volume, height } = props;

  return (
    <Box sx={{ flexGrow: 1,}}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Statistiques
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Land Area (m2)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Building Area (m2)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Building Floor Area (m2)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Volume (m2)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Building Height (m2)
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(statistiques);
