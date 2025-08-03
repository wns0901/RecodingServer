import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

// 가상의 녹화 완료 데이터
const recodedData = [
  { id: 1, title: '지난 방송 다시보기', recordTime: '2023-10-26', fileSize: '2.5 GB' },
  { id: 2, title: '짧은 클립', recordTime: '2023-10-25', fileSize: '300 MB' },
  { id: 3, title: '프로젝트 발표 녹화', recordTime: '2023-10-24', fileSize: '1.2 GB' },
];

const SimpleRecoded = () => {
  if (recodedData.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>녹화 완료된 파일이 없습니다.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>방송 제목</TableCell>
            <TableCell align="right">녹화 시간</TableCell>
            <TableCell align="right">파일 크기</TableCell>
            <TableCell align="center">작업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recodedData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.recordTime}</TableCell>
              <TableCell align="right">{row.fileSize}</TableCell>
              <TableCell align="center">
                <Box>
                  <IconButton aria-label="download" color="primary">
                    <DownloadIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleRecoded;