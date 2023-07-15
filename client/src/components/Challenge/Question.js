import { Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Laptop from './image/laptop.png'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkmark from './image/checkmark.png'
import { useNavigate } from 'react-router-dom'

const Question = ({ data }) => {

    const navigate = useNavigate();

    return (
        <Grid item xs={4}>
            <Paper variant='outlined'>
                <Grid container>
                    <Grid item xs={11}>
                        <Box paddingX={2}>
                            <img src={Laptop} alt='img' height='60px' width='60px'></img>
                        </Box>
                    </Grid>
                    <Grid item xs={'auto'}  >
                        <Box>
                            <img src={Checkmark} alt='img' height='20px' width='20px'></img>
                        </Box>
                    </Grid>
                </Grid>
                <Box paddingX={2}>
                    <Typography variant="h6" gutterBottom>
                        {data.name}
                    </Typography>
                </Box>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Box paddingX={2} paddingBottom={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            {data.questions} questions - {data.time} minutes
                        </Typography>
                    </Box>
                    <Grid item paddingRight={1} paddingBottom={3} onClick={() => navigate("/quizPage")}>
                        <Button variant='contained'>
                            go !
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Question