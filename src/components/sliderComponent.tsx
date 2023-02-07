import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;
const marks = [
    {
        value: 1,
        label: '0',
    },
    {
        value: 100,
        label: '100',
    },
];

export default function InputSlider(props: any) {
    const { title, sliderValue } = props;

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        props.handleSlider(newValue)
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var val = event.target.value === '' ? '' : Number(event.target.value);
        props.handleSlider(val)
    };

    const handleBlur = () => {
        if (sliderValue < 0) {
            props.handleSlider(0)
        } else if (sliderValue > 100) {
            props.handleSlider(100)
        }
    };

    return (
        <Box sx={{ marginTop: "20px" }}>
            <Typography id="input-slider" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof sliderValue === 'number' ? sliderValue : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        marks={marks}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={sliderValue}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 1,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}