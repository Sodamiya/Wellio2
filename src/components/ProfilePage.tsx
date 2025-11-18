import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface ProfilePageProps {
  userName: string;
  currentPage: string;
  onPageChange: (
    page: "home" | "community" | "hospital" | "profile",
  ) => void;
  onBack: () => void;
}

export function ProfilePage({
  userName,
  currentPage,
  onPageChange,
  onBack,
}: ProfilePageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Profile Header */}
      <Header
        title="내 정보"
        showBackButton={true}
        onBack={onBack}
        showSearchButton={true}
        showSettingsButton={true}
      />

      {/* 헤더 높이(h-16)만큼 pt-16 추가 */}
      <main className="flex-grow bg-[#F7F7F7] pt-16 pb-24">
        {/* User Info Section */}
        <div className="bg-white py-6 px-4 sm:px-6 md:px-8 flex items-center">
          <div className="w-[72px] h-[72px] md:w-20 md:h-20 rounded-full overflow-hidden relative">
            <img
              src="https://via.placeholder.com/72x72"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-1 border border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.75 2.112l-6.819 6.819a2 2 0 00-.546.732l-1.63 4.891a1 1 0 001.242 1.242l4.89-1.63a2 2 0 00.732-.546l6.818-6.819-2.828-2.828z" />
              </svg>
            </button>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-900">
              {userName} 님
            </h2>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span className="bg-[#E7F3FF] text-[#2F80ED] text-xs font-semibold px-2 py-0.5 rounded-full mr-1">
                가족관리
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Point Section */}
        <div className="bg-white mx-4 sm:mx-6 md:mx-8 p-4 rounded-lg shadow-sm mt-3 flex items-center justify-between">
          <span className="text-gray-700 font-medium">
            보유포인트
          </span>
          <div className="flex items-center">
            <span className="text-lg font-bold text-[#4CAF50]">
              2,025P
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Activity Buttons */}
        <div className="flex bg-white mx-4 sm:mx-6 md:mx-8 rounded-lg shadow-sm mt-3 overflow-hidden">
          <button className="flex-1 flex items-center justify-center py-3 text-gray-700 font-medium border-r border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            나의 후기
          </button>
          <button className="flex-1 flex items-center justify-center py-3 text-gray-700 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.071c-1.472 1.472-1.472 3.869 0 5.341L10 17.341l6.828-6.929c1.472-1.472 1.472-3.869 0-5.341-1.472-1.472-3.869-1.472-5.341 0L10 6.071l-1.487-1.487c-1.472-1.472-3.869-1.472-5.341 0z"
                clipRule="evenodd"
              />
            </svg>
            찜한 병원
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-6 bg-white py-6">
          <div className="px-4 sm:px-6 md:px-8 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1c-.512 0-1.026.061-1.536.177M12 3c1.921-.308 3.568.175 4.093 1.391C16.634 5.762 16 7 16 7H8s-.634-1.238-.157-2.609C8.432 3.175 10.079 2.692 12 3zM12 14v5m-3 0h6m-1-4l.117-.008A2 2 0 0013.997 16H16l1-1h1.5l.5-1.5H21a1 1 0 001-1V9a1 1 0 00-1-1h-.5L20 6.5l-.5-1.5H18a1 1 0 00-1-1H7a1 1 0 00-1 1H5l-.5 1.5L4 8H3a1 1 0 00-1 1v4a1 1 0 001 1h.5l.5 1.5H6l1 1h2a2 2 0 001.883 2L12 19h-1z"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">
              이런 기능도 있어요
            </h3>
          </div>
          <ul className="mt-4">
            {[
              "원클릭 실손보험 신청",
              "가까운 병원 찾기",
              "건강 뉴스",
            ].map((feature, index) => (
              <li
                key={index}
                className="px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between border-b border-gray-100 last:border-b-0"
              >
                <span className="text-gray-700">{feature}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>

        {/* Health Record Section */}
        <div className="mt-6 bg-white py-6">
          <div className="px-4 sm:px-6 md:px-8 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">
              건강 내역
            </h3>
          </div>
          <ul className="mt-4">
            <li className="px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">진료 이력</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            {/* 👇 [추가] 건강검진 내역 */}
            <li className="px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">
                건강검진 내역
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
          </ul>
        </div>

        {/* 👇 [추가] Customer Service Section */}
        <div className="mt-6 bg-white py-6">
          <div className="px-4 sm:px-6 md:px-8 flex items-center">
            {/* Phone Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500 mr-2" // 아이콘 색상 (text-blue-500)
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.128a1 1 0 00-.5 1.21l3.603 6.305a1 1 0 001.21.5l1.128-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">
              고객센터
            </h3>
          </div>
          <ul className="mt-4">
            <li className="px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">공지사항</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li className="px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between border-b border-gray-100 last:border-b-0">
              <span className="text-gray-700">
                고객센터 문의하기
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
          </ul>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] sm:max-w-md md:max-w-2xl lg:max-w-4xl z-50">
        <BottomNav
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}