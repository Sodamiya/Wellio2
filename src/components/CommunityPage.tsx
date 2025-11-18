"use client";

import {
  ArrowLeft,
  ChevronDown,
  Search,
  Bell,
  LayoutGrid,
  Calendar,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface CommunityPageProps {
  onBack: () => void;
  onUploadClick: () => void;
}

export function CommunityPage({ onBack, onUploadClick }: CommunityPageProps) {
  const [selectedGroup, setSelectedGroup] =
    useState("우리가족");

  const posts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
      badge: "🏆 주 1회 함께 걷기",
      userAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      caption: "챌린지 첫 시작!",
      userName: "김건강",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      badge: "💪 매일 운동하기",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      caption: "오늘도 달렸어요!",
      userName: "박활력",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      badge: "🧘‍♀️ 매일 요가",
      userAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      caption: "마음 챙기기",
      userName: "이평화",
    },
  ];

  return (
    // max-w는 화면 중앙 정렬을 위한 것이므로 유지
    <div className="relative bg-white flex flex-col max-w-[500px] mx-auto min-h-screen pb-20">
      
      {/* Header (높이 110px) */}
      <header 
        className="sticky top-0 z-30 px-4 flex items-center justify-between border-b border-gray-100 w-full bg-white h-[110px]"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-6 h-6 flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-[#1A1A1A]" />
          </button>
          <button className="flex items-center gap-1">
            <span className="text-lg font-bold text-[#1A1A1A]">
              {selectedGroup}
            </span>
            <ChevronDown size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-6 h-6 flex items-center justify-center">
            <Search size={20} className="text-[#1A1A1A]" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center">
            <Bell size={20} className="text-[#1A1A1A]" />
          </button>
        </div>
      </header>

      {/* Content Area (Swiper) */}
      <div className="w-full">
        <Swiper
          direction={"vertical"}
          className="w-full h-[calc(100vh-190px)]"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              {/* SwiperSlide 내부 콘텐츠: 좌우 여백 px-4 유지 */}
              <div className="h-full flex flex-col items-center px-4 py-4"> 
                
                {/* Post Card - 🚨 max-w-[360px] 제거 🚨 */}
                <div className="relative h-[85%] w-full rounded-2xl overflow-hidden shadow-lg self-center">
                  <ImageWithFallback
                    src={post.image}
                    alt="Community post"
                    className="w-full h-full object-cover bg-gray-100" 
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 text-sm font-medium">
                    <span>{post.badge}</span>
                  </div>
                  {/* User Profile + Caption + +N Batch */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ImageWithFallback
                        src={post.userAvatar}
                        alt="User avatar"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                      <span className="text-white font-semibold text-sm">
                        {post.caption}
                      </span>
                    </div>
                    {/* +N 알림 배지 */}
                    <div className="bg-gray-100 rounded-full px-2.5 py-1 text-xs font-bold text-gray-800 flex items-center justify-center relative">
                      +2
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </div>
                  </div>
                </div>

                {/* 댓글 입력창 - 🚨 max-w-[360px] 제거 🚨 */}
                <div className="flex items-center gap-2 w-full mt-4">
                  <button className="p-2 text-gray-500 hover:text-gray-800">
                    <RefreshCw size={24} />
                  </button>
                  <div className="flex-1 bg-[#F5F5F5] rounded-full px-4 py-3">
                    <input
                      type="text"
                      placeholder="댓글을 작성해주세요"
                      className="w-full bg-transparent outline-none text-[#1A1A1A] placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* End of Content Area */}

      {/* Bottom Navigation with FAB (Fixed, 맨 아래) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto bg-white border-t border-gray-100 z-20">
        <div className="relative px-4 pt-2 pb-4">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-gray-800">
              <LayoutGrid size={24} />
              <span className="text-xs font-semibold">모아보기</span>
            </button>
            <div className="w-16" />
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <Calendar size={24} />
              <span className="text-xs">캘린더</span>
            </button>
          </div>
          <button
            className="absolute left-1/2 -translate-x-1/2 -top-[34px] w-14 h-14 bg-[#36D2C5] rounded-full flex items-center justify-center shadow-lg hover:bg-[#00C2B3] transition-colors"
            onClick={onUploadClick}
          >
            <Plus size={28} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}