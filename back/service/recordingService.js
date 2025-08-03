// 필요한 모듈들을 불러옵니다.
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// ---
// 녹화 상태를 관리하는 객체입니다. (간단한 파일 기반 또는 DB로 대체 가능)
const recordingsStatus = {};
// ---

// 녹화 파일이 저장될 기본 경로입니다.
const RECORDING_BASE_PATH =
  process.env.RECORDING_PATH || path.join(__dirname, "recordings");

// 녹화 관련 비즈니스 로직을 처리하는 서비스 객체
const RecordingService = {
  /**
   * 특정 URL의 방송 녹화를 시작합니다.
   * @param {object} options - 녹화 옵션 객체
   * @param {string} options.url - 녹화할 방송 URL
   * @param {string} options.fileName - 저장할 파일명
   * @param {string} options.quality - 녹화 화질 ('1080p', '720p' 등)
   * @returns {object} - 녹화 프로세스에 대한 정보
   */
  async startRecording({ url, fileName, quality }) {
    // 1. 입력값 유효성 검사
    if (!url || !fileName || !quality) {
      throw new Error("URL, 파일명, 화질 정보가 모두 필요합니다.");
    }

    fs.mkdirSync(RECORDING_BASE_PATH, { recursive: true });

    // [추가] 파일명 보안 처리 (Path Traversal 공격 방지)
    const safeFileName = fileName.replace(/[\\/]/g, "_");

    // 2. 고유한 녹화 ID 및 파일 경로 생성
    const recordingId = `${Date.now()}`;
    // [수정] 클라이언트에서 받은 파일명과 yt-dlp 확장자 변수 사용
    const outputPath = path.join(
      RECORDING_BASE_PATH,
      `${safeFileName}.%(ext)s`
    );

    // [추가] 화질 옵션을 yt-dlp 포맷 코드로 변환
    const formatCode =
      {
        "1080p": "bestvideo[height<=?1080]+bestaudio/best",
        "720p": "bestvideo[height<=?720]+bestaudio/best",
        "480p": "bestvideo[height<=?480]+bestaudio/best",
      }[quality] || "best"; // 기본값으로 'best' 사용

    // 3. yt-dlp 명령어와 옵션 준비
    const ytDlpArgs = [
      "--live-from-start",
      "--wait-for-video",
      "300",
      "-f",
      formatCode, // [수정] 화질 포맷 옵션 추가
      "--merge-output-format",
      "mp4",
      "-o",
      outputPath, // [수정] 새로운 출력 경로 지정
      url,
    ];

    // 4. yt-dlp 프로세스를 백그라운드에서 실행
    const ytDlpProcess = spawn("yt-dlp", ytDlpArgs, {
      cwd: RECORDING_BASE_PATH,
      detached: true,
      stdio: "inherit",
    });

    // 5. 프로세스 ID 저장 및 상태 관리
    ytDlpProcess.unref();

    const recordingInfo = {
      id: recordingId,
      url: url,
      status: "recording",
      pid: ytDlpProcess.pid,
      startTime: new Date().toISOString(),
      // [수정] 실제 저장될 파일 경로를 저장
      outputPath: outputPath.replace(".%(ext)s", ".mp4"), // 예상 확장자 .mp4
      fileName: safeFileName, // 클라이언트에게 보여줄 파일명
      quality: quality,
    };

    // 현재 녹화 상태를 메모리 객체에 저장
    recordingsStatus[recordingId] = recordingInfo;

    console.log(`[${recordingId}] 녹화 시작: ${url} (화질: ${quality})`);

    // 6. 녹화 프로세스 종료 시 이벤트 처리
    ytDlpProcess.on("exit", (code) => {
      const finalStatus = code === 0 ? "completed" : `failed with code ${code}`;
      console.log(`[${recordingId}] 녹화 프로세스 종료. 상태: ${finalStatus}`);

      // 상태 업데이트
      if (recordingsStatus[recordingId]) {
        recordingsStatus[recordingId].status = finalStatus;
        recordingsStatus[recordingId].endTime = new Date().toISOString();
      }
    });

    ytDlpProcess.on("error", (err) => {
      console.error(`[${recordingId}] yt-dlp 실행 실패:`, err);
      recordingsStatus[recordingId].status = "error";
    });

    // 7. 녹화 프로세스 정보를 반환
    return {
      message: "녹화가 시작되었습니다.",
      recordingId: recordingId,
      info: recordingInfo,
    };
  },

  /**
   * [추가] ID에 해당하는 녹화 프로세스를 중지합니다.
   * @param {string} recordingId - 중지할 녹화의 ID
   * @returns {object} - 작업 결과 메시지
   */
  stopRecording(recordingId) {
    // 1. 해당 ID의 녹화 정보 조회
    const recordingInfo = recordingsStatus[recordingId];

    // 2. 유효성 검사
    if (!recordingInfo) {
      throw new Error("해당 ID의 녹화를 찾을 수 없습니다.");
    }
    if (recordingInfo.status !== "recording") {
      throw new Error("이미 녹화 중인 상태가 아닙니다.");
    }

    try {
      // 3. PID를 이용해 프로세스에 종료 신호(SIGTERM) 전송
      // SIGTERM은 프로세스가 정상적으로 종료 준비를 할 시간을 줍니다.
      process.kill(recordingInfo.pid, "SIGTERM");

      // 4. 즉시 상태를 'stopped'로 업데이트하여 피드백 제공
      recordingInfo.status = "stopped";
      recordingInfo.endTime = new Date().toISOString();

      console.log(
        `[${recordingId}] 녹화 중지 요청 완료. PID: ${recordingInfo.pid}`
      );

      return { message: `[${recordingId}] 녹화 중지를 요청했습니다.` };
    } catch (error) {
      // 프로세스가 이미 존재하지 않는 등 예외 상황 처리
      console.error(`[${recordingId}] 프로세스 종료 실패: `, error.message);
      // 상태를 'failed'로 변경
      recordingInfo.status = "failed";
      throw new Error(
        "프로세스를 종료하는 데 실패했습니다. 이미 종료되었을 수 있습니다."
      );
    }
  },

  /**
   * 현재 녹화 중인 방송 목록과 상태를 반환합니다.
   * @returns {object} - 현재 녹화 상태 객체
   */
  getRecordingsStatus() {
    return recordingsStatus;
  },
};

// 모듈로 내보내기
module.exports = RecordingService;
