"use client";

import { X, Upload, Camera, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
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
  const [showGalleryPermission, setShowGalleryPermission] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 첫 방문 시 권한 팝업 표시
  useEffect(() => {
    const hasVisited = localStorage.getItem("uploadPageVisited");
    if (!hasVisited) {
      // 첫 방문이면 카메라 권한 팝업 먼저 표시
      setShowGalleryPermission(true);
    } else {
      // 이미 방문했으면 바로 카메라 시작
      setPermissionsGranted(true);
    }
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
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (videoDevices.length === 0) {
          setCameraError("사용 가능한 카메라가 없습니다.");
          return;
        }

        // 카메라 제약 조건 설정
        const constraints: MediaStreamConstraints = {
          video: videoDevices.length > 1 
            ? { facingMode: isFrontCamera ? "user" : "environment" }
            : true, // 카메라가 하나만 있으면 facingMode 없이 요청
          audio: false,
        };

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);

        setStream(newStream);
        setCameraError(null);

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (error: any) {
        console.error("카메라 접근 실패:", error);
        
        if (error.name === "NotFoundError") {
          setCameraError("카메라를 찾을 수 없습니다. 갤러리에서 사진을 업로드해주세요.");
        } else if (error.name === "NotAllowedError") {
          setCameraError("카메라 접근 권한이 거부되었습니다.");
        } else {
          setCameraError("카메라를 시작할 수 없습니다. 갤러리를 이용해주세요.");
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

  // 갤러리 권한 허용
  const handleGalleryPermissionAllow = () => {
    setShowGalleryPermission(false);
    setPermissionsGranted(true);
    localStorage.setItem("uploadPageVisited", "true");
  };

  // 카메라/갤러리 권한 거부
  const handlePermissionDeny = () => {
    setShowGalleryPermission(false);
    // 권한 거부 시 뒤로 가기
    onBack();
  };

  // 사진 촬영
  const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          // 촬영한 사진 처리 로직 (추후 구현)
          console.log("사진 촬영 완료:", blob);
        }
      }, "image/jpeg");
    }
  };

  // 갤러리에서 사진 선택
  const handleGalleryUpload = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 선택한 사진 처리 로직 (추후 구현)
      console.log("사진 선택 완료:", file);
    }
  };

  // 카메라 전환
  const handleCameraSwitch = () => {
    setIsFrontCamera((prev) => !prev);
  };

  return (
    <>
      {/* 갤러리 권한 팝업 */}
      <AlertDialog open={showGalleryPermission}>
        <AlertDialogContent className="max-w-[340px]">
          <AlertDialogHeader>
            <AlertDialogTitle>갤러리 권한 허용</AlertDialogTitle>
            <AlertDialogDescription>
              사진을 업로드하려면 갤러리 접근 권한이 필요합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handlePermissionDeny}>
              거부
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleGalleryPermissionAllow}>
              허용
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 업로드 화면 */}
      <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* 카메라 화면 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 카메라 에러 메시지 */}
        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-5">
            <div className="text-center px-6">
              <Camera size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-white mb-2">{cameraError}</p>
              <p className="text-gray-400 text-sm">
                갤러리 버튼을 눌러 사진을 업로드할 수 있습니다.
              </p>
            </div>
          </div>
        )}

        {/* 상단 닫기 버튼 */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {/* 갤러리 업로드 버튼 */}
            <button
              onClick={handleGalleryUpload}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <Upload size={24} className="text-white" />
            </button>

            {/* 촬영 버튼 */}
            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full bg-white border-4 border-white/30 hover:scale-110 transition-transform"
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Camera size={32} className="text-gray-800" />
              </div>
            </button>

            {/* 카메라 전환 버튼 */}
            <button
              onClick={handleCameraSwitch}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <RefreshCw size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </>
  );
}