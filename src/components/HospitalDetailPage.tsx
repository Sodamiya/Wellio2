"use client";

import { ArrowLeft, MapPin, Clock, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { DoctorCard } from "./DoctorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef } from "react";

/**
 * 카카오맵 API 사용 방법:
 * 
 * 1. index.html의 <head> 태그에 아래 스크립트를 추가하세요:
 *    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY"></script>
 * 
 * 2. YOUR_APP_KEY를 카카오 개발자 사이트(https://developers.kakao.com)에서 발급받은 JavaScript 키로 교체하세요.
 * 
 * 3. 카카오 개발자 사이트에서:
 *    - 내 애플리케이션 > 앱 설정 > 플랫폼 > Web 플랫폼 추가
 *    - 사이트 도메인 등록 (예: http://localhost:3000)
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

export function HospitalDetailPage({ hospital, onBack }: HospitalDetailPageProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // 카카오맵 초기화
  useEffect(() => {
    // 카카오맵 API 로드 확인
    if (typeof window !== "undefined" && window.kakao && window.kakao.maps) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(
          hospital.latitude || 37.5665,
          hospital.longitude || 126.978
        ),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(
        hospital.latitude || 37.5665,
        hospital.longitude || 126.978
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [hospital.latitude, hospital.longitude]);

  // 길찾기 함수
  const handleDirections = () => {
    const lat = hospital.latitude || 37.5665;
    const lng = hospital.longitude || 126.978;
    
    // 카카오맵 길찾기 URL
    window.open(
      `https://map.kakao.com/link/to/${encodeURIComponent(hospital.name)},${lat},${lng}`,
      "_blank"
    );
  };

  // 샘플 의사 데이터
  const doctors = [
    {
      id: 1,
      name: "김건강 원장",
      specialty: "내과 전문의",
      experience: "경력 15년",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
    },
    {
      id: 2,
      name: "이웰니스 원장",
      specialty: "가정의학과 전문의",
      experience: "경력 12년",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80",
    },
    {
      id: 3,
      name: "박진료 원장",
      specialty: "내과 전문의",
      experience: "경력 10년",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      {/* Header */}
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

      {/* Content */}
      <main className="flex-1 pb-6 overflow-y-auto">
        {/* 병원 사진 */}
        <div className="w-full h-[240px] md:h-[320px] overflow-hidden bg-gray-200">
          <ImageWithFallback
            src={hospital.imageUrl}
            alt={hospital.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 병원 설명 카드 */}
        <div className="mx-4 sm:mx-6 md:mx-8 mt-4 bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {hospital.name}
          </h2>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            {hospital.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-[#36D2C5] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{hospital.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[#36D2C5] flex-shrink-0" />
              <p className="text-sm text-gray-700">{hospital.hours}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-[#36D2C5] flex-shrink-0" />
              <p className="text-sm text-gray-700">{hospital.phone}</p>
            </div>
          </div>
        </div>

        {/* 가로형 배너 */}
        <div className="mx-4 sm:mx-6 md:mx-8 mt-4 bg-gradient-to-r from-[#36D2C5] to-[#00C2B3] rounded-2xl p-5 text-white shadow-sm">
          <h3 className="font-semibold mb-1">첫 방문 환자 할인 이벤트</h3>
          <p className="text-sm opacity-90">
            진료비 10% 할인 혜택을 받아보세요
          </p>
        </div>

        {/* 의사 정보 섹션 */}
        <div className="mt-6">
          <div className="px-4 sm:px-6 md:px-8 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              의료진 소개
            </h3>
          </div>

          {/* 모바일: Swiper 슬라이더 */}
          <div className="block md:hidden pl-4 sm:pl-6">
            <Swiper
              slidesPerView="auto"
              spaceBetween={16}
              grabCursor={true}
              className="!overflow-visible"
            >
              {doctors.map((doctor) => (
                <SwiperSlide key={doctor.id} style={{ width: "280px" }}>
                  <DoctorCard doctor={doctor} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 데스크톱: 그리드 */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 px-4 sm:px-6 md:px-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>

        {/* 카카오맵 */}
        <div className="mx-4 sm:mx-6 md:mx-8 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            오시는 길
          </h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div
              ref={mapRef}
              className="w-full h-[300px] bg-gray-100"
            >
              {/* 카카오맵이 여기에 로드됩니다 */}
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-sm">
                  카카오맵 API 키를 설정하면 지도가 표시됩니다
                </p>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={handleDirections}
                className="w-full bg-[#FEE500] text-[#3C1E1E] py-3 rounded-lg font-semibold hover:bg-[#FDD835] transition-colors"
              >
                카카오맵으로 길찾기
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 카카오맵 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}