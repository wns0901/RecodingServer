import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from '@mui/material';

// 가상의 현재 녹화 중인 데이터
const currentlyRecodingData = [
  { id: 1, title: '치지직 스트리머의 재미있는 방송', startTime: '2023-10-27 20:00', duration: '1시간 25분' },
  { id: 2, title: '신작 게임 플레이', startTime: '2023-10-27 21:30', duration: '45분' },
];

const Recoding = () => {
  // 데이터가 없을 경우를 처리
  if (currentlyRecodingData.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>현재 녹화 중인 방송이 없습니다.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>방송 제목</TableCell>
            <TableCell align="right">시작 시간</TableCell>
            <TableCell align="right">진행 시간</TableCell>
            <TableCell align="center">작업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentlyRecodingData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.startTime}</TableCell>
              <TableCell align="right">{row.duration}</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="error" size="small">
                  녹화 중지
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Recoding;