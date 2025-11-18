"use client";

import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Star,
  ChevronRight,
  ClipboardList,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { DoctorCard } from "./DoctorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

/**
 * 카카오맵 API가 동적으로 로드됩니다.
 * API 키: ee7ef6c37b67c27768d7dcb2f13f0a83
 */

interface Hospital {
  id: number;
  name: string;
  department: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
}

interface HospitalDetailPageProps {
  hospital: Hospital;
  onBack: () => void;
}

export function HospitalDetailPage({
  hospital,
  onBack,
}: HospitalDetailPageProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 카카오맵 스크립트 동적 로딩
  useEffect(() => {
    const loadKakaoMap = () => {
      // 이미 로드되어 있는지 확인
      if (window.kakao && window.kakao.maps) {
        setIsMapLoaded(true);
        return;
      }

      // 기존 스크립트가 있는지 확인
      const existingScript = document.querySelector(
        'script[src*="dapi.kakao.com"]',
      );

      if (existingScript) {
        // 이미 스크립트가 있으면 로드 대기
        const checkKakao = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            clearInterval(checkKakao);
            setIsMapLoaded(true);
          }
        }, 100);

        setTimeout(() => clearInterval(checkKakao), 5000);
        return;
      }

      // 스크립트 생성 (autoload 없이)
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=ee7ef6c37b67c27768d7dcb2f13f0a83`;
      script.type = "text/javascript";

      script.onload = () => {
        // 카카오 객체가 로드될 때까지 대기
        const checkKakao = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            clearInterval(checkKakao);
            setIsMapLoaded(true);
          }
        }, 100);

        // 5초 후에도 로드 안되면 타임아웃
        setTimeout(() => {
          clearInterval(checkKakao);
          if (!window.kakao || !window.kakao.maps) {
            console.error("카카오맵 객체 초기화 타임아웃");
          }
        }, 5000);
      };

      script.onerror = (error) => {
        console.error("카카오맵 스크립트 로딩 실패:", error);
      };

      document.head.appendChild(script);
    };

    loadKakaoMap();
  }, []);

  // 카카오맵 초기화
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    try {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(
          hospital.latitude || 37.5665,
          hospital.longitude || 126.978,
        ),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      const markerPosition = new window.kakao.maps.LatLng(
        hospital.latitude || 37.5665,
        hospital.longitude || 126.978,
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    } catch (error) {
      console.error("카카오맵 초기화 실패:", error);
    }
  }, [isMapLoaded, hospital.latitude, hospital.longitude]);

  // 길찾기 함수 (기존 코드와 동일)
  const handleDirections = () => {
    const lat = hospital.latitude || 37.5665;
    const lng = hospital.longitude || 126.978;
    window.open(
      `https://map.kakao.com/link/to/${encodeURIComponent(hospital.name)},${lat},${lng}`,
      "_blank",
    );
  };

  // 샘플 의사 데이터 (기존 코드와 동일)
  const doctors = [
    {
      id: 1,
      name: "김건강 원장",
      specialty: "내과 전문의",
      experience: "경력 15년",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
    },
    {
      id: 2,
      name: "이웰니스 원장",
      specialty: "가정의학과 전문의",
      experience: "경력 12년",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80",
    },
    {
      id: 3,
      name: "박진료 원장",
      specialty: "내과 전문의",
      experience: "경력 10년",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
    },
  ];

  // 샘플 후기 키워드 데이터
  const reviewKeywords = [
    { label: "친절해요", percent: 92 },
    { label: "진료를 잘해요", percent: 85 },
    { label: "시설이 깨끗해요", percent: 77 },
  ];

  return (
    // 하단 고정 버튼을 위한 relative, pb-24 추가
    <div className="relative min-h-screen bg-[#F7F7F7] flex flex-col">
      {/* Header (기존과 동일) */}
      <header className="sticky top-0 z-20 bg-white px-4 sm:px-6 md:px-8 py-4 flex items-center border-b border-gray-100">
        <button
          onClick={onBack}
          className="w-6 h-6 flex items-center justify-center mr-4"
        >
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <h1 className="text-lg font-semibold text-[#1A1A1A]">
          {hospital.name}
        </h1>
      </header>

      {/* 하단 버튼 여백 pb-24 추가 */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {/* 병원 사진 */}
        <div className="w-full h-[240px] md:h-[320px] overflow-hidden bg-gray-200">
          <ImageWithFallback
            src={hospital.imageUrl}
            alt={hospital.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 병원 정보 카드 (디자인 시안처럼 이미지 위로 올림) */}
        <div className="relative z-10 mx-4 sm:mx-6 md:mx-8 -mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {hospital.name}
            </h2>
            <p className="text-base text-gray-600 mb-4">
              {hospital.department}
            </p>

            <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <Clock
                  size={20}
                  className="text-[#36D2C5] flex-shrink-0"
                />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">진료중</span>{" "}
                  {hospital.hours}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="text-[#36D2C5] flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-gray-700">
                  {hospital.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  size={20}
                  className="text-[#36D2C5] flex-shrink-0"
                />
                <p className="text-sm text-gray-700">
                  {hospital.phone}
                </p>
              </div>
            </div>

            <button className="flex justify-between items-center w-full text-sm font-medium text-gray-700">
              <span>진료과목 상세보기</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 배너 (시안의 파란색 배너) */}
        <div className="mx-4 sm:mx-6 md:mx-8 mt-4 bg-[#E7F3FF] rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              원클릭 실손보험 연동하기
            </h3>
            <p className="text-sm text-gray-700">
              진료비 10초 만에 청구 완료!
            </p>
            <div className="w-10" />
          </div>
          <ClipboardList size={24} className="text-blue-500" />
        </div>

        {/* 1. 진료 과목 */}
        <div className="mt-6 bg-white py-6">
          <div className="px-4 sm:px-6 md:px-8 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              진료 과목
            </h3>
          </div>
          <div className="flex gap-2 px-4 sm:px-6 md:px-8 overflow-x-auto scrollbar-hide">
            {[
              "내과",
              "소아청소년과",
              "피부과",
              "정형외과",
              "이비인후과",
            ].map((subject) => (
              <span
                key={subject}
                className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* 2. 의료진 소개 섹션 (Swiper 컨테이너에 mt-4 추가) */}
        <div className="mt-6 bg-white py-6">
          <div className="px-4 sm:px-6 md:px-8 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              의료진 소개
            </h3>
          </div>
          {/* ⭐️ Swiper 영역: md 이하(모바일)에서만 표시 + mt-4 추가 */}
          <div className="block md:hidden mt-4"> 
            <Swiper
              slidesPerView="auto"
              spaceBetween={16}
              grabCursor={true}
              className="!overflow-visible !-mx-4 sm:!-mx-6 px-4 sm:px-6"
            >
              {doctors.map((doctor) => (
                <SwiperSlide
                  key={doctor.id}
                  style={{ width: "80%" }} 
                >
                  <DoctorCard doctor={doctor} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* 그리드 영역: md 이상(태블릿/PC)에서만 표시 */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 md:px-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>

        {/* 카카오맵 */}
        <div className="mt-6 bg-white py-6">
          <div className="px-4 sm:px-6 md:px-8 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              오시는 길
            </h3>
            </div>
          <div
            ref={mapRef}
            className="w-full h-[200px] bg-gray-100"
          >
            {/* ... 카카오맵 로드 ... */}
          </div>
          <div className="p-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                {hospital.address}
              </p>
              <p className="text-xs text-gray-500">
                {hospital.phone}
              </p>
            </div>
            <Button
              onClick={handleDirections}
              className="w-full mt-3 h-12 bg-gray-800 text-white font-semibold hover:bg-gray-900"
            >
              길찾기
            </Button>
          </div>
        </div>

        {/* 3. 병원 후기 */}
        <div className="mt-6 bg-white py-6">
          <div className="px-4 sm:px-6 md:px-8 mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              병원 후기
            </h3>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-800">
              전체보기
            </button>
          </div>
          <div className="px-4 sm:px-6 md:px-8">
            {/* 후기 요약 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Star
                  size={20}
                  className="text-[#FFB800] fill-[#FFB800]"
                />
                <span className="text-2xl font-bold text-gray-900">
                  4.8
                </span>
                <span className="text-sm text-gray-500">
                  (223개)
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                이 병원은{" "}
                <span className="text-red-500 font-semibold">
                  90%
                </span>
                가 만족했어요
              </p>
              <div className="space-y-2">
                {reviewKeywords.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-3 items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">
                      {item.label}
                    </span>
                    <div className="col-span-2">
                      <Progress
                        value={item.percent}
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 샘플 후기 */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-[#FFB800] fill-[#FFB800]"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-2">
                김*강님 | 2025.11.18
              </p>
              <p className="text-sm text-gray-800 leading-relaxed">
                의사 선생님이 정말 친절하시고, 설명도 꼼꼼하게
                잘 해주셔서 좋았습니다. 병원 내부도 깨끗하고
                대기 시간도 짧았어요.
              </p>
            </div>
          </div>
        </div>

        {/* 4. 병원 접수 안내 */}
        <div className="mt-6 bg-white py-6">
          <div className="px-4 sm:px-6 md:px-8 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              병원 접수 안내
            </h3>
          </div>
          <div className="px-4 sm:px-6 md:px-8">
            <ul className="list-disc list-outside space-y-2 pl-5 text-sm text-gray-600">
              <li>
                [즉시 접수] 트래픽 병원 사정에 따라 상시 마감될
                수 있습니다.
              </li>
              <li>
                접수 후 30분 이내 미방문 시 자동 접수
                취소됩니다.
              </li>
              <li>
                점심시간 10분 전/진료 마감 30분 전까지 접수 및
                방문해야 합니다.
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* 하단 고정 접수 버튼: '예약하기', '즉시 접수' 두 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-white border-t border-gray-100 max-w-[500px] mx-auto">
        <div className="flex space-x-3">
          {/* 찜하기 버튼 */}
          <Button
            variant="outline"
            className="h-14 w-14 p-0 flex-shrink-0 border-2 border-[#36D2C5] text-[#36D2C5] bg-white hover:bg-gray-50"
          >
            <Heart size={24} fill="currentColor" />
          </Button>

          {/* 예약/접수 버튼 그룹 */}
          <div className="flex-1 flex space-x-3">
                {/* 예약하기 버튼 (흰색/테두리) */}
                <Button
                    variant="outline"
                    className="flex-1 h-14 text-lg font-semibold border-2 border-[#36D2C5] text-[#36D2C5] bg-white hover:bg-gray-50"
                >
                    예약하기
                </Button>

                {/* 즉시 접수 버튼 (민트색) */}
                <Button className="flex-1 h-14 text-lg font-semibold bg-[#36D2C5] hover:bg-[#00C2B3]">
                    즉시 접수
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

// 카카오맵 타입 선언 (기존과 동일)
declare global {
  interface Window {
    kakao: any;
  }
}