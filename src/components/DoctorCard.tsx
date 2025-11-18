import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    // [수정] w-[280px] -> w-full (부모 SwiperSlide/Grid가 너비 제어)
    // [수정] p-4, border, shadow 제거 -> 시안에 맞게 변경
    <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <ImageWithFallback
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left">
          <h4 className="font-semibold text-gray-900">
            {doctor.name}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {doctor.specialty}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {doctor.experience}
          </p>
        </div>
      </div>

      {/* [수정] 예약하기 버튼 -> ChevronRight 아이콘 */}
      <ChevronRight
        size={20}
        className="text-gray-400 flex-shrink-0"
      />
    </button>
  );
}