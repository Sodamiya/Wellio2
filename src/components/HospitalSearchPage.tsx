import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { HospitalCard } from "./HospitalCard"; // 수정된 HospitalCard 임포트

interface HospitalSearchPageProps {
  onBack: () => void;
}

export function HospitalSearchPage({
  onBack,
}: HospitalSearchPageProps) {
  const [selectedFilter, setSelectedFilter] =
    useState("거리순");

  const filters = [
    "거리순",
    "진료종",
    "즉시접수",
    "야간진료",
    "약/주사",
  ];

  // [수정] hospital 데이터를 새 인터페이스에 맞게 변경
  const hospitals = [
    {
      id: 1,
      name: "매일건강의원",
      specialtyText: "가정의학과와 전문의 2명",
      hours: "10:00-20:00",
      distance: "37m",
      address: "서울 서초구 서초대로 59번길 19, 201호",
      isAvailableNow: true,
      rating: 4.8,
      reviews: 223,
      imageUrl:
        "https://images.unsplash.com/photo-1580281658136-17c835359e86?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "365클리닉 강남본점",
      specialtyText: "피부과와 전문의 3명",
      hours: "09:30-20:30",
      distance: "58m",
      address: "서울 서초구 서초대로 16가길, 3층",
      isAvailableNow: true,
      rating: 4.6,
      reviews: 12,
      imageUrl:
        "https://via.placeholder.com/100x100/E7F3FF/2F80ED?text=Logo",
    },
    {
      id: 3,
      name: "사랑니쏙쏙 강남본점",
      specialtyText: "치과",
      hours: "10:00-18:00",
      distance: "167m",
      address: "서울 서초구 강남대로 102",
      isAvailableNow: true,
      rating: 4.7,
      reviews: 41,
      imageUrl:
        "https://via.placeholder.com/100x100/E8F8F7/00C2B3?text=Logo",
    },
    {
      id: 4,
      name: "강남예쁜이치과의원",
      specialtyText: "치과",
      hours: "09:00-19:00",
      distance: "720m",
      address: "서울시 강남구 선릉로 345",
      isAvailableNow: false,
      rating: 4.7,
      reviews: 312,
      imageUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
    },
  ];

  return (
    // [수정] h-screen, overflow-hidden 추가
    <div className="h-screen bg-white flex flex-col">
      {/* [수정] Header: sticky, z-10, bg-white, border-b 추가 */}
      <header className="sticky top-0 z-10 bg-white px-4 sm:px-6 md:px-8 pt-4 pb-2 space-y-4 border-b border-gray-100">
        {/* [수정] Title Bar: h1 중앙 정렬 방식 변경 */}
        <div className="flex items-center justify-between pb-2">
          <button onClick={onBack} className="w-10 p-2 -ml-2">
            <ArrowLeft size={24} className="text-[#1A1A1A]" />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A] text-center flex-1">
            병원 찾기
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* [수정] Search: "취소" 버튼을 밖으로 분리 */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-2">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="진료과, 병원이름을 검색해보세요"
              className="flex-1 bg-transparent outline-none text-[#1A1A1A] placeholder:text-gray-400"
            />
          </div>
          <button className="text-[#1A1A1A] text-sm font-medium">
            취소
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors text-sm font-medium ${
                selectedFilter === filter
                  ? "bg-[#E7F3FF] text-[#2F80ED]" // 시안과 일치
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* [수정] Hospital List: px, gap 제거. flex-1, overflow-y-auto 추가 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {hospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
            />
          ))}
        </div>
      </div>
    </div>
  );
}