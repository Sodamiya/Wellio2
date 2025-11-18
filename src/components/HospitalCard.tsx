import { Heart, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// 카드 데이터 인터페이스 (이전과 동일)
interface Hospital {
  id: number;
  name: string;
  specialtyText: string;
  hours: string;
  distance: string;
  address: string;
  isAvailableNow: boolean;
  rating: number;
  reviews: number;
  imageUrl: string;
}

interface HospitalCardProps {
  hospital: Hospital;
  onClick?: () => void;
}

export function HospitalCard({ hospital, onClick }: HospitalCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col bg-white p-4 border-b border-gray-100 last:border-b-0 md:border md:rounded-2xl md:shadow-sm md:m-2 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      {/* 1. 상단 정보: 이미지, 이름, 전문의, 하트 */}
      <div className="flex gap-4">
        {/* [수정] 이미지 크기 w-12 h-12 (48px)로 변경, 반응형 제거 */}
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <ImageWithFallback
            src={hospital.imageUrl}
            alt={hospital.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 이름, 전문의, 하트 */}
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
              {hospital.name}
            </h3>
            <button
              className="text-gray-300 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Heart size={24} />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {hospital.specialtyText}
          </p>
        </div>
      </div>

      {/* 2. 하단 정보: 진료시간, 주소, 별점 */}
      {/* [수정] pt-4 와 border-t 제거 */}
      <div className="mt-4">
        {/* 진료 시간 */}
        <div className="flex items-center text-sm text-gray-700 mb-2">
          <span className="font-semibold text-[#1A73E8] mr-2">
            오늘 진료
          </span>
          <span>{hospital.hours}</span>
        </div>

        {/* 거리 + 주소 */}
        <p className="text-sm text-gray-500 mb-3 truncate">
          {hospital.distance} | {hospital.address}
        </p>

        {/* 태그 + 별점 */}
        <div className="flex items-center gap-2">
          {hospital.isAvailableNow && (
            <span className="bg-[#E7F3FF] text-[#2F80ED] text-xs font-semibold px-2 py-1 rounded-full">
              즉시 접수 가능
            </span>
          )}
          <div className="flex items-center gap-0.5 text-sm">
            <Star
              size={16}
              className="text-[#FFB800] fill-[#FFB800]"
            />
            <span className="text-[#1A1A1A] font-bold ml-1">
              {hospital.rating}
            </span>
            <span className="text-gray-400">
              ({hospital.reviews})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}