import { MapPin, Star, Clock } from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  department: string;
  distance: string;
  status: string;
  rating: number;
  reviews: number;
  address: string;
}

interface HospitalCardProps {
  hospital: Hospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Hospital Name & Department */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-[#1A1A1A] mb-1">{hospital.name}</h3>
          <p className="text-gray-500">{hospital.department}</p>
        </div>
        <span 
          className={`px-3 py-1 rounded-full text-xs ${
            hospital.status === "진료중"
              ? 'bg-[#E8F8F7] text-[#00C2B3]'
              : 'bg-[#FFF4E6] text-[#FF9800]'
          }`}
        >
          {hospital.status}
        </span>
      </div>
      
      {/* Address */}
      <div className="flex items-center gap-1 mb-3 text-gray-600">
        <MapPin size={16} />
        <span>{hospital.address}</span>
      </div>
      
      {/* Info Row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={16} className="text-[#FFB800] fill-[#FFB800]" />
            <span className="text-[#1A1A1A]">{hospital.rating}</span>
            <span className="text-gray-400">({hospital.reviews})</span>
          </div>
          
          {/* Distance */}
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin size={16} />
            <span>{hospital.distance}</span>
          </div>
        </div>
        
        {/* Appointment Button */}
        <button className="bg-[#36D2C5] text-white px-4 py-2 rounded-lg hover:bg-[#00C2B3] transition-colors">
          예약하기
        </button>
      </div>
    </div>
  );
}
