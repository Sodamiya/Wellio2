"use client";

import { ArrowLeft, Calendar, ChevronDown, Building2, Pill } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MedicalHistoryPageProps {
  onBack: () => void;
}

interface MedicalRecord {
  id: number;
  code: string;
  patientName: string;
  patientAvatar: string;
  hospitalName: string;
  visitDate: string;
  visitTime: string;
  doctor: string;
  memo: string;
}

interface MedicalVisit {
  id: number;
  type: "hospital" | "pharmacy";
  name: string;
  visitDate: string;
  dayOfWeek: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: 1,
    code: "REC-2024-001",
    patientName: "김웰리",
    patientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    hospitalName: "서울대학교병원",
    visitDate: "2024년 11월 15일",
    visitTime: "오후 2:30",
    doctor: "김현수 교수",
    memo: "정기 검진 완료, 특이사항 없음"
  },
  {
    id: 2,
    code: "REC-2024-002",
    patientName: "박승희",
    patientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    hospitalName: "강남세브란스병원",
    visitDate: "2024년 11월 10일",
    visitTime: "오전 10:00",
    doctor: "이영희 원장",
    memo: "감기 증상으로 내원, 약 처방"
  },
  {
    id: 3,
    code: "REC-2024-003",
    patientName: "김동석",
    patientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    hospitalName: "아산병원",
    visitDate: "2024년 11월 5일",
    visitTime: "오후 4:00",
    doctor: "박민준 교수",
    memo: "건강검진 상담"
  },
];

const mockMedicalVisits: MedicalVisit[] = [
  {
    id: 1,
    type: "pharmacy",
    name: "우리온누리약국",
    visitDate: "2024년 11월 16일",
    dayOfWeek: "토요일"
  },
  {
    id: 2,
    type: "hospital",
    name: "서울대학교병원",
    visitDate: "2024년 11월 15일",
    dayOfWeek: "금요일"
  },
  {
    id: 3,
    type: "pharmacy",
    name: "건강플러스약국",
    visitDate: "2024년 11월 12일",
    dayOfWeek: "화요일"
  },
  {
    id: 4,
    type: "hospital",
    name: "강남세브란스병원",
    visitDate: "2024년 11월 10일",
    dayOfWeek: "일요일"
  },
  {
    id: 5,
    type: "pharmacy",
    name: "메디팜약국",
    visitDate: "2024년 11월 6일",
    dayOfWeek: "수요일"
  },
  {
    id: 6,
    type: "hospital",
    name: "아산병원",
    visitDate: "2024년 11월 5일",
    dayOfWeek: "화요일"
  },
];

export function MedicalHistoryPage({ onBack }: MedicalHistoryPageProps) {
  const [activeTab, setActiveTab] = useState<"treatment" | "medical">("treatment");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filters = [
    { id: "period", label: "기간검색" },
    { id: "kim", label: "김웰리" },
    { id: "park", label: "박승희" },
    { id: "kim2", label: "김동석" },
  ];

  return (
    <div className="relative bg-white flex flex-col max-w-[500px] mx-auto min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 py-4 flex items-center justify-between border-b border-gray-100 w-full bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-6 h-6 flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-[#1A1A1A]" />
          </button>
          <span className="text-lg font-bold text-[#1A1A1A]">
            진료내역
          </span>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("treatment")}
          className={`flex-1 py-4 text-center transition-colors ${
            activeTab === "treatment"
              ? "text-[#36D2C5] border-b-2 border-[#36D2C5]"
              : "text-gray-400"
          }`}
        >
          진료내역
        </button>
        <button
          onClick={() => setActiveTab("medical")}
          className={`flex-1 py-4 text-center transition-colors ${
            activeTab === "medical"
              ? "text-[#36D2C5] border-b-2 border-[#36D2C5]"
              : "text-gray-400"
          }`}
        >
          의료내역
        </button>
      </div>

      {/* Filter Tags */}
      <div className="px-4 py-4 flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedFilter === filter.id
                ? "bg-[#36D2C5] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
            {filter.id === "period" && (
              <ChevronDown size={16} className="inline-block ml-1" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        {activeTab === "treatment" ? (
          // 진료내역
          <div className="space-y-4">
            {mockRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3"
              >
                {/* 첫번째줄: 진료코드, 프로필+이름 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{record.code}</span>
                  <div className="flex items-center gap-2">
                    <ImageWithFallback
                      src={record.patientAvatar}
                      alt={record.patientName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {record.patientName}
                    </span>
                  </div>
                </div>

                {/* 두번째줄: 병원이름 */}
                <div className="text-gray-900">
                  {record.hospitalName}
                </div>

                {/* 세번째줄: 내원일 */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>내원일</span>
                  <span className="text-gray-800">{record.visitDate}</span>
                  <span className="text-gray-800">{record.visitTime}</span>
                </div>

                {/* 네번째줄: 진료의 */}
                <div className="text-sm text-gray-600">
                  <span>진료의 </span>
                  <span className="text-gray-800">{record.doctor}</span>
                </div>

                {/* 다섯번째줄: 한줄메모 */}
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                  {record.memo}
                </div>

                {/* 여섯번째줄: 버튼 */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    리뷰쓰기
                  </button>
                  <button className="flex-1 py-3 bg-[#36D2C5] text-white rounded-lg text-sm hover:bg-[#2BC0B3] transition-colors">
                    재접수하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 의료내역
          <div className="space-y-4">
            {mockMedicalVisits.map((visit) => (
              <div
                key={visit.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3"
              >
                {/* 병원/약국 이름 */}
                <div className="flex items-center gap-2">
                  {visit.type === "hospital" ? (
                    <Building2 size={20} className="text-[#36D2C5]" />
                  ) : (
                    <Pill size={20} className="text-[#36D2C5]" />
                  )}
                  <span className="text-gray-900 font-medium">{visit.name}</span>
                </div>

                {/* 내원일 */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>내원일</span>
                  <span className="text-gray-800">{visit.visitDate}</span>
                  <span className="text-gray-800">({visit.dayOfWeek})</span>
                </div>

                {/* 약국인 경우에만 버튼 표시 */}
                {visit.type === "pharmacy" && (
                  <button className="w-full py-3 bg-[#36D2C5] text-white rounded-lg text-sm hover:bg-[#2BC0B3] transition-colors">
                    내가 받은 약 보기
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}