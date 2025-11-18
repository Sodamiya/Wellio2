"use client";

import {
  Image as ImageIcon,
  Camera,
  RefreshCw,
  ArrowLeft,
  Upload,
  Edit,
  Sparkles,
  X,
  Type,
  MapPin,
  Cloud,
  Clock,
  Heart,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface UploadPageProps {
  onBack: () => void;
}

export function UploadPage({ onBack }: UploadPageProps) {
  const [showCameraPermission, setShowCameraPermission] =
    useState(false);
  const [showGalleryPermission, setShowGalleryPermission] =
    useState(false);
  const [permissionsGranted, setPermissionsGranted] =
    useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(
    null,
  );
  const [cameraError, setCameraError] = useState<string | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<
    string | null
  >(null);
  const [isUploadMode, setIsUploadMode] = useState(false);
  const [hasCameraDevice, setHasCameraDevice] = useState<boolean | null>(null);
  const [isDetailEditMode, setIsDetailEditMode] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 매번 권한 팝업 표시 (카메라 먼저)
  useEffect(() => {
    // 권한 팝업 없이 바로 시작 (카메라는 선택적)
    setPermissionsGranted(true);
  }, []);

  // 카메라 스트림 시작
  useEffect(() => {
    if (!permissionsGranted) return;

    const startCamera = async () => {
      try {
        // 기존 스트림 정리
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        // 먼저 사용 가능한 카메라가 있는지 확인
        const devices =
          await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );

        if (videoDevices.length === 0) {
          setCameraError("사용 가능한 카메라가 없습니다.");
          setHasCameraDevice(false);
          return;
        } else {
          setHasCameraDevice(true);
        }

        // 카메라 제약 조건 설정
        const constraints: MediaStreamConstraints = {
          video:
            videoDevices.length > 1
              ? {
                  facingMode: isFrontCamera
                    ? "user"
                    : "environment",
                }
              : true, // 카메라가 하나만 있으면 facingMode 없이 요청
          audio: false,
        };

        const newStream =
          await navigator.mediaDevices.getUserMedia(
            constraints,
          );

        setStream(newStream);
        setCameraError(null);

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (error: any) {
        console.error("카메라 접근 실패:", error);

        if (error.name === "NotFoundError") {
          setCameraError(
            "카메라를 찾을 수 없습니다. 갤러리에서 사진을 업로드해주세요.",
          );
        } else if (error.name === "NotAllowedError") {
          setCameraError("카메라 접근 권한이 거부되었습니다.");
        } else {
          setCameraError(
            "카메라를 시작할 수 없습니다. 갤러리를 이용해주세요.",
          );
        }
      }
    };

    startCamera();

    // 컴포넌트 언마운트 시 스트림 정리
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [permissionsGranted, isFrontCamera]);

  // 카메라 권한 허용
  const handleCameraPermissionAllow = () => {
    setShowCameraPermission(false);
    // 카메라 권한 허용 후 갤러리 권한 팝업 표시
    setShowGalleryPermission(true);
  };

  // 갤러리 권한 허용
  const handleGalleryPermissionAllow = () => {
    setShowGalleryPermission(false);
    // 모든 권한 허용 후 카메라 시작
    setPermissionsGranted(true);
  };

  // 카메라/갤러리 권한 거부
  const handlePermissionDeny = () => {
    setShowCameraPermission(false);
    setShowGalleryPermission(false);
    // 권한 거부 시 뒤로 가기
    onBack();
  };

  // 사진 촬영 또는 편집 모드 전환
  const handleCapture = () => {
    if (isUploadMode) {
      // 업로드 모드일 때 - 실제 업로드 처리
      console.log("사진 업로드:", selectedImage);
      // TODO: 실제 업로드 로직 구현
      return;
    }

    // 촬영 모드일 때
    // 카메라가 있는 경우: 실제 카메라 캡처
    if (hasCameraDevice && videoRef.current && stream) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setSelectedImage(reader.result as string);
              setIsUploadMode(true);
              // 카메라 스트림 정리
              if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
              }
            };
            reader.readAsDataURL(blob);
          }
        }, "image/jpeg");
      }
    } else {
      // 카메라가 없는 경우: 임의의 이미지 사용
      const randomImageUrl = `https://source.unsplash.com/800x600/?medical,health,hospital&${Date.now()}`;
      
      setSelectedImage(randomImageUrl);
      setIsUploadMode(true);
      
      // 카메라 스트림 정리 (혹시 있다면)
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  };

  // 카메라 전환
  const handleCameraSwitch = () => {
    setIsFrontCamera((prev) => !prev);
  };

  // 갤러리에서 이미지 선택
  const handleImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setIsUploadMode(true);
        // 이미지를 선택하면 스트림 정리 (카메라 끄기)
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 입력하기 버튼 (업로드 모드에서) -> 세부조정 모드로 전환
  const handleEdit = () => {
    setIsDetailEditMode(true);
  };

  // 세부조정 모드 종료
  const handleCloseDetailEdit = () => {
    setIsDetailEditMode(false);
  };

  // 세부조정 버튼 핸들러들
  const handleTextInput = () => {
    console.log("텍스트 입력");
    // TODO: 텍스트 입력 모달 구현
  };

  const handleLocationInput = () => {
    console.log("위치 입력");
    // TODO: 위치 입력 모달 구현
  };

  const handleWeatherInput = () => {
    console.log("날씨 입력");
    // TODO: 날씨 입력 모달 구현
  };

  const handleTimeInput = () => {
    console.log("시간 입력");
    // TODO: 시간 입력 모달 구현
  };

  const handleHealthInput = () => {
    console.log("건강기록 입력");
    // TODO: 건강기록 연동 모달 구현
  };

  // 필터 버튼 (업로드 모드에서)
  const handleFilter = () => {
    // TODO: 필터 선택 화면으로 전환
    console.log("필터 버튼 클릭");
  };

  return (
    <>
      {/* 카메라 권한 팝업 (기존 유지) */}
      <AlertDialog open={showCameraPermission}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              카메라 권한 허용
            </AlertDialogTitle>
            <AlertDialogDescription>
              사진을 촬영하려면 카메라 접근 권한이 필요합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handlePermissionDeny}>
              거부
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCameraPermissionAllow}
            >
              허용
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 갤러리 권한 팝업 (기존 유지) */}
      <AlertDialog open={showGalleryPermission}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              갤러리 권한 허용
            </AlertDialogTitle>
            <AlertDialogDescription>
              사진을 업로드하려면 갤러리 접근 권한이 필요합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handlePermissionDeny}>
              거부
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleGalleryPermissionAllow}
            >
              허용
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 업로드 화면 */}
      <div className="relative w-full h-screen bg-white overflow-hidden">
        {/* -------------------- [수정된 부분: 카메라 뷰 사이즈 및 스타일 조정] -------------------- */}
        <div
          // Layer 1: Vertical constraint container (pt-20, pb-[120px])
          className="absolute left-0 right-0 top-0 bottom-0 pt-20 pb-[120px] flex justify-center items-center overflow-hidden"
        >
          <div
            // Layer 2: Horizontal margin/padding (px-4)
            className="w-full h-full flex justify-center items-center px-4"
          >
            <div
              // Layer 3: Actual Camera/Post Box (h-[85%], w-full, shadow-lg, rounded-2xl)
              className="relative h-[85%] w-full bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* 카메라 화면 */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 선택된 이미지 표시 */}
              {selectedImage && (
                <div className="absolute inset-0 bg-white">
                  <ImageWithFallback
                    src={selectedImage}
                    alt="Selected Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* 카메라 에러 메시지 */}
              {cameraError && !selectedImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                  <div className="text-center px-6">
                    <Camera
                      size={48}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <p className="text-white mb-2">
                      {cameraError}
                    </p>
                    <p className="text-gray-400 text-sm">
                      갤러리 버튼을 눌러 사진을 업로드할 수
                      있습니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------------- */}

        {/* 상단 Header (fixed) */}
        <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 flex items-center justify-center w-full bg-white max-w-[500px] mx-auto">
          {isDetailEditMode ? (
            <button
              onClick={handleCloseDetailEdit}
              className="absolute left-4 p-1"
            >
              <X size={24} className="text-[#1A1A1A]" />
            </button>
          ) : (
            <button
              onClick={onBack}
              className="absolute left-4 p-1"
            >
              <ArrowLeft size={24} className="text-[#1A1A1A]" />
            </button>
          )}
          <h1 className="text-xl font-bold text-[#1A1A1A] text-center">
            {isDetailEditMode ? "세부조정" : "업로드"}
          </h1>
        </header>

        {/* 하단 버튼 영역 (fixed) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pt-4 pb-10 bg-white max-w-[500px] mx-auto">
          {/* 숨겨진 파일 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {isDetailEditMode ? (
            /* 세부조정 모드: 5개 동그란 아이콘 버튼(위) + 업로드 버튼(아래 중앙) */
            <div className="flex flex-col items-center gap-3 max-w-md mx-auto px-4">
              {/* 5개 세부조정 아이콘 버튼 */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleTextInput}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#E7F3FF] text-[#2F80ED] transition-colors hover:bg-[#D0E7FF]">
                    <Type size={24} />
                  </div>
                  <span className="text-xs text-gray-600">텍스트</span>
                </button>

                <button
                  onClick={handleLocationInput}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#FFF4E5] text-[#FF9800] transition-colors hover:bg-[#FFE8CC]">
                    <MapPin size={24} />
                  </div>
                  <span className="text-xs text-gray-600">위치</span>
                </button>

                <button
                  onClick={handleWeatherInput}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#E8F8F7] text-[#36D2C5] transition-colors hover:bg-[#D0F0ED]">
                    <Cloud size={24} />
                  </div>
                  <span className="text-xs text-gray-600">날씨</span>
                </button>

                <button
                  onClick={handleTimeInput}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F3E5F5] text-[#9C27B0] transition-colors hover:bg-[#E1BEE7]">
                    <Clock size={24} />
                  </div>
                  <span className="text-xs text-gray-600">시간</span>
                </button>

                <button
                  onClick={handleHealthInput}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#FFEBEE] text-[#F44336] transition-colors hover:bg-[#FFCDD2]">
                    <Heart size={24} />
                  </div>
                  <span className="text-xs text-gray-600">건강</span>
                </button>
              </div>

              {/* 업로드 버튼 (중앙) */}
              <button
                onClick={handleCapture}
                className="w-16 h-16 rounded-full border-4 border-gray-100 bg-[#36D2C5] hover:bg-[#00C2B3] transition-colors flex items-center justify-center"
              >
                <Upload size={28} className="text-white" />
              </button>
            </div>
          ) : (
            /* 기본 모드: 3개 버튼 (갤러리/촬영/카메라전환 또는 입력하기/업로드/필터) */
            <div className="flex items-center justify-between max-w-md mx-auto px-6">
              {/* 왼쪽 버튼 - 촬영 모드: 갤러리, 업로드 모드: 입력하기 */}
              <button
                onClick={isUploadMode ? handleEdit : () => fileInputRef.current?.click()}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              >
                {isUploadMode ? (
                  <Edit size={32} className="" />
                ) : (
                  <ImageIcon size={32} className="" />
                )}
              </button>

              {/* 가운데 버튼 - 촬영 모드: 촬영, 업로드 모드: 업로드 */}
              <button
                onClick={handleCapture}
                className="w-16 h-16 rounded-full border-4 border-gray-100 bg-[#36D2C5] hover:bg-[#00C2B3] transition-colors flex items-center justify-center"
              >
                {isUploadMode ? (
                  <Upload size={28} className="text-white" />
                ) : (
                  <div className="w-14 h-14 rounded-full border-4 border-white" />
                )}
              </button>

              {/* 오른쪽 버튼 - 촬영 모드: 카메라 전환, 업로드 모드: 필터 */}
              <button
                onClick={isUploadMode ? handleFilter : handleCameraSwitch}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors"
              >
                {isUploadMode ? (
                  <Sparkles size={32} className="" />
                ) : (
                  <RefreshCw size={32} className="" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}