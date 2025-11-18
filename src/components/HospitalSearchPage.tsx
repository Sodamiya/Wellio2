import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { HospitalCard } from "./HospitalCard";

interface HospitalSearchPageProps {
  onBack: () => void;
}

export function HospitalSearchPage({ onBack }: HospitalSearchPageProps) {
  const [selectedFilter, setSelectedFilter] = useState("거리순");
  
  const filters = ["거리순", "진료종", "즉시접수", "야간진료", "약/주사"];
  
  const hospitals = [
    {
      id: 1,
      name: "매일건강의원",
      department: "내과",
      distance: "250m",
      status: "진료중",
      rating: 4.8,
      reviews: 234,
      address: "서울시 강남구 역삼동 123-45"
    },
    {
      id: 2,
      name: "365클리닉 강남본점",
      department: "가정의학과",
      distance: "420m",
      status: "진료중",
      rating: 4.6,
      reviews: 189,
      address: "서울시 강남구 테헤란로 234"
    },
    {
      id: 3,
      name: "사랑니쏙쏙 강남본점",
      department: "치과",
      distance: "580m",
      status: "야간진료",
      rating: 4.9,
      reviews: 456,
      address: "서울시 강남구 역삼동 567-89"
    },
    {
      id: 4,
      name: "강남예쁜이치과의원",
      department: "치과",
      distance: "720m",
      status: "진료중",
      rating: 4.7,
      reviews: 312,
      address: "서울시 강남구 선릉로 345"
    }
  ];
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-6 md:px-8 pt-4 pb-2 space-y-4">
        {/* Title Bar */}
        <div className="flex items-center justify-between pb-2">
          <button 
            onClick={onBack}
            className="w-6 h-6 flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-[#1A1A1A]" />
          </button>
          <h1 className="text-[#1A1A1A] absolute left-1/2 -translate-x-1/2">병원 찾기</h1>
          <div className="w-6" />
        </div>
        
        {/* Search Input */}
        <div className="bg-[#F0F0F0] rounded-lg px-4 py-3 flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="진료과, 병원이름을 검색해보세요"
            className="flex-1 bg-transparent outline-none text-[#1A1A1A] placeholder:text-gray-400"
          />
          <button className="text-[#1A1A1A]">
            취소
          </button>
        </div>
        
        {/* Filter Tags */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === filter
                  ? 'bg-[#E0EFFF] text-[#1A73E8]'
                  : 'bg-[#F0F0F0] text-[#1A1A1A]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>
      
      {/* Hospital List */}
      <div className="flex-1 px-4 sm:px-6 md:px-8 py-2 overflow-y-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      </div>
    </div>
  );
}