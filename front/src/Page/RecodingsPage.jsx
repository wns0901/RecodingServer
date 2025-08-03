import { Grid, Paper, Typography, Box } from "@mui/material";
import FullRecoded from "../Components/FullRecoded";
import Recoding from "../Components/Recoding";

const RecodingsPage = () => {
  return (
    <Box>
      <Grid container direction="column" spacing={5}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              현재 녹화 중
            </Typography>

            <Recoding />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              녹화 완료 목록
            </Typography>
            <FullRecoded />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecodingsPage;
