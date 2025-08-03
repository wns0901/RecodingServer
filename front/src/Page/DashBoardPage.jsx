import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

// 컴포넌트 이름 변경된 것 반영
import Recoding from "../Components/Recoding";
import SimpleRecoded from "../Components/SimpleRecoded";
import UrlInput from "../Components/UrlInput";

const DashBoardPage = () => {
  return (
    <Box>
      <Grid container direction="column" spacing={5}>
        {/* 1. 첫 번째 로우 */}
        {/* 이 item이 가로 전체(12)를 차지합니다. */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              방송 녹화 시작
            </Typography>
            <UrlInput />
          </Paper>
        </Grid>

        {/* 2. 두 번째 로우 */}
        {/* 이 item도 가로 전체(12)를 차지해야 합니다. */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              현재 녹화 중
            </Typography>
            <Recoding />
          </Paper>
        </Grid>

        {/* 3. 세 번째 로우 */}
        {/* 이 item 역시 가로 전체(12)를 차지해야 합니다. */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              녹화 완료 목록
            </Typography>
            <SimpleRecoded />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashBoardPage;
