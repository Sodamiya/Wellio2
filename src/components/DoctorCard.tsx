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
    <div className="w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <ImageWithFallback
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{doctor.specialty}</p>
          <p className="text-xs text-gray-500 mt-1">{doctor.experience}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full bg-[#E8F8F7] text-[#00C2B3] py-2 rounded-lg font-medium hover:bg-[#D4FBF7] transition-colors">
          예약하기
        </button>
      </div>
    </div>
  );
}
