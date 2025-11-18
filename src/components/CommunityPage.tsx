"use client";

import {
  ArrowLeft,
  ChevronDown,
  Search,
  Bell,
  LayoutGrid,
  Calendar,
  Plus,
  MapPin,
  Cloud,
  Clock,
  Heart,
  X,
  Smile,
} from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "motion/react";
import "swiper/css";

interface CommunityPageProps {
  onBack: () => void;
  onUploadClick: () => void;
  posts: Array<{
    id: number;
    image: string;
    badge?: string;
    userAvatar: string;
    caption: string;
    userName: string;
    textOverlay?: string;
    location?: string;
    weather?: string;
    time?: string;
    health?: string;
    comments?: Array<{
      userName: string;
      userAvatar: string;
      text: string;
      timestamp: string;
    }>;
    reactions?: Array<{
      emoji: string;
      users: Array<{
        userName: string;
        userAvatar: string;
      }>;
    }>;
  }>;
}

export function CommunityPage({ onBack, onUploadClick, posts }: CommunityPageProps) {
  const [selectedGroup, setSelectedGroup] =
    useState("우리가족");
  const [isGridView, setIsGridView] = useState(false);
  const [isReactionView, setIsReactionView] = useState(false);
  const [selectedPostForReaction, setSelectedPostForReaction] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [emojiAnimation, setEmojiAnimation] = useState<{ emoji: string; active: boolean } | null>(null);

  // 현재 사용자 정보
  const currentUser = {
    userName: "나",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
  };

  // 각 포스트별 추가된 댓글 관리
  const [addedComments, setAddedComments] = useState<{
    [postId: number]: Array<{
      userName: string;
      userAvatar: string;
      text: string;
      timestamp: string;
    }>;
  }>({});

  // 각 포스트별 추가된 리액션 관리
  const [addedReactions, setAddedReactions] = useState<{
    [postId: number]: Array<{
      emoji: string;
      users: Array<{
        userName: string;
        userAvatar: string;
      }>;
    }>;
  }>({});

  const emojis = ["❤️", "👍", "😊", "🎉", "🔥", "👏"];

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;
    
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newCommentObj = {
      userName: currentUser.userName,
      userAvatar: currentUser.userAvatar,
      text: newComment,
      timestamp: timeString
    };

    setAddedComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentObj]
    }));

    setNewComment("");
  };

  const handleEmojiReaction = (emoji: string, postId: number) => {
    setEmojiAnimation({ emoji, active: true });
    setShowEmojiPicker(false);
    
    // 리액션 추가
    setAddedReactions(prev => {
      const existingReactions = prev[postId] || [];
      const existingReactionIndex = existingReactions.findIndex(r => r.emoji === emoji);
      
      if (existingReactionIndex >= 0) {
        // 이미 해당 이모지 리액션이 있으면 사용자 추가
        const updatedReactions = [...existingReactions];
        const userExists = updatedReactions[existingReactionIndex].users.some(
          u => u.userName === currentUser.userName
        );
        
        if (!userExists) {
          updatedReactions[existingReactionIndex] = {
            ...updatedReactions[existingReactionIndex],
            users: [...updatedReactions[existingReactionIndex].users, currentUser]
          };
        }
        
        return {
          ...prev,
          [postId]: updatedReactions
        };
      } else {
        // 새 이모지 리액션 추가
        return {
          ...prev,
          [postId]: [...existingReactions, {
            emoji,
            users: [currentUser]
          }]
        };
      }
    });
    
    // 애니메이션 종료 후 상태 초기화
    setTimeout(() => {
      setEmojiAnimation(null);
    }, 2000);
  };

  const generateRandomPosition = () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  // 댓글 합치기 함수
  const getAllComments = (postId: number, originalComments?: Array<any>) => {
    const original = originalComments || [];
    const added = addedComments[postId] || [];
    return [...original, ...added];
  };

  // 리액션 합치기 함수
  const getAllReactions = (postId: number, originalReactions?: Array<any>) => {
    const original = originalReactions || [];
    const added = addedReactions[postId] || [];
    
    // 중복 이모지 병합
    const merged: { [emoji: string]: Array<any> } = {};
    
    [...original, ...added].forEach(reaction => {
      if (merged[reaction.emoji]) {
        merged[reaction.emoji] = [...merged[reaction.emoji], ...reaction.users];
      } else {
        merged[reaction.emoji] = [...reaction.users];
      }
    });
    
    return Object.entries(merged).map(([emoji, users]) => ({
      emoji,
      users
    }));
  };

  // 내가 리액션한 게시물 필터링 함수
  const getMyReactionPosts = () => {
    return posts.filter(post => {
      // 내가 댓글을 단 게시물
      const hasMyComment = addedComments[post.id]?.some(
        comment => comment.userName === currentUser.userName
      );
      
      // 내가 이모지 반응을 한 게시물
      const hasMyReaction = addedReactions[post.id]?.some(reaction =>
        reaction.users.some(user => user.userName === currentUser.userName)
      );
      
      return hasMyComment || hasMyReaction;
    });
  };

  return (
    // max-w는 화면 중앙 정렬을 위한 것이므로 유지
    <div className="relative bg-white flex flex-col max-w-[500px] mx-auto min-h-screen pb-20">
      
      {/* Header (높이 110px) */}
      <header 
        className="sticky top-0 z-30 px-4 flex items-center justify-between border-b border-gray-100 w-full bg-white h-[110px]"
      >
        {isReactionView ? (
          // 리액션 모아보기 헤더
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsReactionView(false)}
                className="w-6 h-6 flex items-center justify-center"
              >
                <ArrowLeft size={24} className="text-[#1A1A1A]" />
              </button>
              <span className="text-lg font-bold text-[#1A1A1A]">
                리액션 모아보기
              </span>
            </div>
          </>
        ) : isGridView ? (
          // 모아보기 헤더
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsGridView(false)}
                className="w-6 h-6 flex items-center justify-center"
              >
                <ArrowLeft size={24} className="text-[#1A1A1A]" />
              </button>
              <span className="text-lg font-bold text-[#1A1A1A]">
                모아보기
              </span>
            </div>
            <button
              onClick={() => setIsReactionView(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart size={24} className="text-[#36D2C5]" fill="#36D2C5" />
            </button>
          </>
        ) : (
          // 일반 헤더
          <>
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
          </>
        )}
      </header>

      {/* Content Area (Swiper) */}
      <div className="w-full">
        {isReactionView ? (
          // 리액션 모아보기: 3열 그리드로 내가 리액션한 게시물만 표시
          <div className="px-4 py-4 pb-20">
            {getMyReactionPosts().length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Heart size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500">아직 리액션한 게시물이 없습니다</p>
                <p className="text-gray-400 text-sm mt-2">댓글이나 이모지를 남겨보세요!</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {getMyReactionPosts().map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square relative overflow-hidden rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <ImageWithFallback
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                    {/* 리액션 표시 배지 */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                      <Heart size={12} className="text-[#36D2C5]" fill="#36D2C5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isGridView ? (
          // 그리드 뷰: 3열 그리드로 사진 모아보기
          <div className="px-4 py-4 pb-20">
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square relative overflow-hidden rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <ImageWithFallback
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // 일반 피드 뷰: Swiper
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
                    <button
                      onClick={() => setSelectedPostForReaction(post.id)}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={post.image}
                        alt="Community post"
                        className="w-full h-full object-cover bg-gray-100"
                      />
                    </button>

                    {/* 리액션 모드 오버레이 */}
                    {selectedPostForReaction === post.id && (
                      <div className="absolute inset-0 bg-black/70 z-10 flex flex-col">
                        {/* 닫기 버튼 */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPostForReaction(null);
                          }}
                          className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-20"
                        >
                          <X size={20} className="text-white" />
                        </button>

                        {/* 오른쪽 상단: 감정표현 + 사용자 프로필 */}
                        {getAllReactions(post.id, post.reactions).length > 0 && (
                          <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                            {getAllReactions(post.id, post.reactions).map((reaction, idx) => (
                              <div
                                key={idx}
                                className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2"
                              >
                                <span className="text-2xl">{reaction.emoji}</span>
                                <div className="flex -space-x-2">
                                  {reaction.users.map((user, userIdx) => (
                                    <ImageWithFallback
                                      key={userIdx}
                                      src={user.userAvatar}
                                      alt={user.userName}
                                      className="w-6 h-6 rounded-full border-2 border-white"
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 좌측 하단: 원본 텍스트 */}
                        {post.textOverlay && (
                          <div className="absolute bottom-4 left-4 max-w-[60%] z-20">
                            <p className="text-white text-sm bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
                              {post.textOverlay}
                            </p>
                          </div>
                        )}

                        {/* 하단 우측: 댓글 목록 (최신이 위) */}
                        {getAllComments(post.id, post.comments).length > 0 && (
                          <div className="absolute bottom-4 right-4 flex flex-col-reverse gap-2 max-w-[65%] max-h-[60%] overflow-y-auto z-20">
                            {getAllComments(post.id, post.comments).map((comment, idx) => (
                              <div
                                key={idx}
                                className="bg-white/20 backdrop-blur-sm rounded-2xl px-3 py-2 flex items-start gap-2 ml-auto"
                              >
                                <div className="flex flex-col items-end gap-1 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white text-xs opacity-90">
                                      {comment.userName}
                                    </span>
                                    <ImageWithFallback
                                      src={comment.userAvatar}
                                      alt={comment.userName}
                                      className="w-5 h-5 rounded-full border border-white"
                                    />
                                  </div>
                                  <p className="text-white text-sm text-right">
                                    {comment.text}
                                  </p>
                                  <span className="text-white/60 text-xs">
                                    {comment.timestamp}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 왼쪽 상단 정보 오버레이 (위치/날씨/시간/건강) - 리액션 모드가 아닐 때만 */}
                    {selectedPostForReaction !== post.id && (post.location ||
                      post.weather ||
                      post.time ||
                      post.health) && (
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {post.location && (
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
                            <MapPin
                              size={16}
                              className="text-white"
                            />
                            <span className="text-white text-sm">
                              {post.location}
                            </span>
                          </div>
                        )}
                        {post.weather && (
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Cloud size={16} className="text-white" />
                            <span className="text-white text-sm">
                              {post.weather}
                            </span>
                          </div>
                        )}
                        {post.time && (
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Clock size={16} className="text-white" />
                            <span className="text-white text-sm">
                              {post.time}
                            </span>
                          </div>
                        )}
                        {post.health && (
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Heart size={16} className="text-white" />
                            <span className="text-white text-sm">
                              {post.health}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Badge (기존 배지가 있을 때만 표시) - 리액션 모드가 아닐 때만 */}
                    {selectedPostForReaction !== post.id && post.badge &&
                      !post.location &&
                      !post.weather &&
                      !post.time &&
                      !post.health && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 text-sm font-medium">
                          <span>{post.badge}</span>
                        </div>
                      )}

                    {/* User Profile + Caption + +N Batch - 리액션 모드가 아닐 때만 */}
                    {selectedPostForReaction !== post.id && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <ImageWithFallback
                            src={post.userAvatar}
                            alt={post.userName}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                          {post.textOverlay && (
                            <span className="text-white font-semibold text-sm line-clamp-1">
                              {post.textOverlay}
                            </span>
                          )}
                        </div>
                        {/* +N 알림 배지 - 댓글 개수 동적 표시 */}
                        <div className="bg-gray-100 rounded-full px-2.5 py-1 text-xs font-bold text-gray-800 flex items-center justify-center relative">
                          +{getAllComments(post.id, post.comments).length}
                          {getAllComments(post.id, post.comments).length > 0 && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 댓글 입력창 - 🚨 max-w-[360px] 제거 🚨 */}
                  <div className="relative flex items-center gap-2 w-full mt-4">
                    {/* 이모지 애니메이션 레이어 */}
                    <AnimatePresence>
                      {emojiAnimation && emojiAnimation.active && currentPostId === post.id && (
                        <div className="fixed inset-0 pointer-events-none z-50">
                          {emojiAnimation.emoji === "❤️" ? (
                            // 하트: 화면 전체에 동시다발적으로 생성
                            <>
                              {Array.from({ length: 30 }).map((_, i) => {
                                const pos = generateRandomPosition();
                                return (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0, x: `${pos.x}vw`, y: `${pos.y}vh` }}
                                    animate={{ 
                                      opacity: [0, 1, 1, 0], 
                                      scale: [0, 1.5, 1.5, 0],
                                    }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ 
                                      duration: 1.5,
                                      delay: Math.random() * 0.3,
                                      ease: "easeOut"
                                    }}
                                    className="absolute text-6xl"
                                  >
                                    ❤️
                                  </motion.div>
                                );
                              })}
                            </>
                          ) : emojiAnimation.emoji === "👍" ? (
                            // 따봉: 폭죽처럼 중앙에서 사방으로 퍼짐
                            <>
                              {Array.from({ length: 20 }).map((_, i) => {
                                const angle = (i / 20) * Math.PI * 2;
                                const distance = 200 + Math.random() * 200;
                                return (
                                  <motion.div
                                    key={i}
                                    initial={{ 
                                      opacity: 0, 
                                      scale: 0, 
                                      x: "50vw", 
                                      y: "50vh" 
                                    }}
                                    animate={{ 
                                      opacity: [0, 1, 1, 0], 
                                      scale: [0, 1.5, 1, 0],
                                      x: `calc(50vw + ${Math.cos(angle) * distance}px)`,
                                      y: `calc(50vh + ${Math.sin(angle) * distance}px)`,
                                      rotate: [0, 360]
                                    }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ 
                                      duration: 1.5,
                                      delay: i * 0.05,
                                      ease: "easeOut"
                                    }}
                                    className="absolute text-5xl"
                                  >
                                    👍
                                  </motion.div>
                                );
                              })}
                            </>
                          ) : null}
                        </div>
                      )}
                    </AnimatePresence>

                    {/* 이모지 피커 팝업 */}
                    <AnimatePresence>
                      {showEmojiPicker && currentPostId === post.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full left-0 mb-2 bg-white rounded-2xl shadow-2xl p-3 flex gap-2 border border-gray-200"
                        >
                          {emojis.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                setCurrentPostId(post.id);
                                handleEmojiReaction(emoji, post.id);
                              }}
                              className="text-3xl hover:scale-125 transition-transform p-1"
                            >
                              {emoji}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      className="p-2 text-gray-500 hover:text-gray-800"
                      onClick={() => {
                        setCurrentPostId(post.id);
                        setShowEmojiPicker(!showEmojiPicker);
                      }}
                    >
                      <Smile size={24} />
                    </button>
                    <div className="flex-1 bg-[#F5F5F5] rounded-full px-4 py-3">
                      <input
                        type="text"
                        placeholder="댓글을 작성해주세요"
                        className="w-full bg-transparent outline-none text-[#1A1A1A] placeholder:text-gray-400"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddComment(post.id);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {/* End of Content Area */}

      {/* Bottom Navigation with FAB (Fixed, 맨 아래) - 그리드 뷰일 때 숨김 */}
      {!isGridView && !isReactionView && (
        <div className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto bg-white border-t border-gray-100 z-20">
          <div className="relative px-4 pt-2 pb-4">
            <div className="flex items-center justify-around">
              <button 
                onClick={() => setIsGridView(true)}
                className="flex flex-col items-center gap-1 text-gray-800"
              >
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
      )}
    </div>
  );
}