import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

const UrlInput = () => {
  // 기본 상태
  const [url, setUrl] = useState('');
  
  // 팝업(Dialog)의 열림/닫힘 상태
  const [open, setOpen] = useState(false);

  // 팝업 내 설정들의 상태
  const [quality, setQuality] = useState('1080p');
  const [fileName, setFileName] = useState('');

  // '녹화 시작' 버튼 클릭 시 팝업을 여는 함수
  const handleClickOpen = () => {
    if (!url) {
      alert('URL을 입력해주세요!');
      return;
    }
    setFileName(`[${new Date().toISOString().slice(0, 10)}] `); // 기본 파일명 제안
    setOpen(true);
  };

  // 팝업을 닫는 함수
  const handleClose = () => {
    setOpen(false);
  };

  // 최종적으로 녹화를 시작하는 함수
  const handleConfirmAndRecord = () => {
    console.log('--- 녹화 시작 정보 ---');
    console.log('URL:', url);
    console.log('화질:', quality);
    console.log('파일명:', fileName);
    // TODO: 여기에 실제 백엔드 API 요청 로직 추가
    
    handleClose(); // 팝업 닫기
    setUrl(''); // 기존 URL 초기화
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          fullWidth
          label="녹화할 방송 URL 입력"
          variant="outlined"
          size="small"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ flexShrink: 0 }}
          onClick={handleClickOpen} // 버튼 클릭 시 팝업 열기
        >
          녹화 시작
        </Button>
      </Box>

      {/* 녹화 설정 팝업(Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>녹화 설정</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            녹화를 시작하기 전 세부 옵션을 설정할 수 있습니다.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filename"
            label="파일명"
            type="text"
            fullWidth
            variant="standard"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="quality-select-label">화질</InputLabel>
            <Select
              labelId="quality-select-label"
              id="quality-select"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              label="화질"
            >
              <MenuItem value="1080p">1080p (최상)</MenuItem>
              <MenuItem value="720p">720p</MenuItem>
              <MenuItem value="480p">480p</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleConfirmAndRecord} variant="contained">
            설정 후 녹화
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UrlInput;