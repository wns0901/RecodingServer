const express = require("express");
const router = express.Router();
const recordingService = require("../service/recordingService");

// [개선] POST /recordings : 새로운 녹화를 생성합니다.
router.post("/", async (req, res, next) => {
    try {
        // [개선] req.body에서 필요한 데이터만 꺼내서 서비스에 전달합니다.
        const { url, fileName, quality } = req.body;
        const result = await recordingService.startRecording({ url, fileName, quality });
        res.status(201).json(result); // 201 Created 응답
    } catch (error) {
        // [개선] 서비스에서 발생한 에러를 처리합니다.
        console.error(error);
        res.status(400).json({ message: error.message }); // 400 Bad Request 응답
    }
});

// [개선] GET /recordings : 현재 진행 중인 녹화 상태 목록을 가져옵니다.
router.get("/", async (req, res, next) => {
    try {
        const statuses = recordingService.getRecordingsStatus();
        res.status(200).json(statuses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 에러가 발생했습니다." });
    }
});

// [개선] DELETE /recordings/:id : 특정 녹화를 중지합니다.
router.delete("/:id", async (req, res, next) => {
    try {
        // [개선] req.params에서 id를 추출합니다.
        const { id } = req.params;
        const result = recordingService.stopRecording(id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// [구현 제안] GET /recordings/files : 녹화 완료된 파일 목록을 가져옵니다.
// (새로운 메서드 recordingService.getCompletedFiles()가 필요합니다)
router.get("/files", async (req, res, next) => {
    try {
        // const files = await recordingService.getCompletedFiles();
        // res.status(200).json(files);
        res.status(200).json({ message: '구현 예정' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "파일 목록을 가져오는 데 실패했습니다." });
    }
});


module.exports = router;

// 이 라우터는 app.js 같은 곳에서 다음과 같이 사용됩니다.
// app.use('/api/recordings', recordingRouter);