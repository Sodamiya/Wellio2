"use client";

import { ArrowLeft, Star } from "lucide-react";

interface MyReviewsPageProps {
  onBack: () => void;
}

interface Review {
  id: number;
  hospitalName: string;
  rating: number;
  visitType: "첫방문" | "재방문";
  dayOfWeek: string;
  tags: string[];
  content: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    hospitalName: "서울대학교병원",
    rating: 5,
    visitType: "재방문",
    dayOfWeek: "금요일",
    tags: ["친절해요", "전문적이에요", "시설이 깨끗해요"],
    content: "의사선생님께서 정말 친절하시고 자세히 설명해주셔서 좋았습니다. 진료를 기다리는 동안 병원 시설도 깨끗하고 쾌적해서 만족스러웠어요.",
    date: "2024.11.15"
  },
  {
    id: 2,
    hospitalName: "강남세브란스병원",
    rating: 4,
    visitType: "첫방문",
    dayOfWeek: "일요일",
    tags: ["대기시간이 짧아요", "교통이 편리해요"],
    content: "일요일인데도 진료를 받을 수 있어서 좋았습니다. 지하철역과 가까워서 접근성도 좋았어요.",
    date: "2024.11.10"
  },
  {
    id: 3,
    hospitalName: "아산병원",
    rating: 5,
    visitType: "재방문",
    dayOfWeek: "화요일",
    tags: ["친절해요", "설명이 자세해요", "주차가 편리해요"],
    content: "건강검진 결과 상담을 받았는데 매우 자세하게 설명해주셨습니다. 주차 공간도 넓어서 편리했어요.",
    date: "2024.11.05"
  },
  {
    id: 4,
    hospitalName: "삼성서울병원",
    rating: 4,
    visitType: "첫방문",
    dayOfWeek: "수요일",
    tags: ["시설이 좋아요", "전문적이에요"],
    content: "최신 장비로 검사받을 수 있어서 좋았습니다. 병원 시설도 훌륭했어요.",
    date: "2024.10.28"
  },
];

export function MyReviewsPage({ onBack }: MyReviewsPageProps) {
  return (
    <div className="relative bg-[#F7F7F7] flex flex-col max-w-[500px] mx-auto min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 py-4 flex items-center gap-4 border-b border-gray-100 w-full bg-white">
        <button
          onClick={onBack}
          className="w-6 h-6 flex items-center justify-center"
        >
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <span className="text-lg font-bold text-[#1A1A1A]">
          나의 후기
        </span>
      </header>

      {/* Content */}
      <div className="px-4 py-4 pb-20 space-y-4">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3"
          >
            {/* 첫번째줄: 병원이름 */}
            <div className="font-medium text-gray-900">
              {review.hospitalName}
            </div>

            {/* 두번째줄: 별점, 첫방문/재방문, 요일 */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-500">•</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                review.visitType === "첫방문"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-green-50 text-green-600"
              }`}>
                {review.visitType}
              </span>
              <span className="text-gray-600">{review.dayOfWeek}</span>
            </div>

            {/* 세번째줄: 리뷰태그 */}
            <div className="flex flex-wrap gap-2">
              {review.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#E8F8F7] text-[#36D2C5] rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 네번째줄: 리뷰내용 */}
            <div className="text-sm text-gray-700 leading-relaxed">
              {review.content}
            </div>

            {/* 작성일 */}
            <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
              {review.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
