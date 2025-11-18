import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { HospitalSearchPage } from "./components/HospitalSearchPage";
import { CommunityPage } from "./components/CommunityPage";
import { ProfilePage } from "./components/ProfilePage"; // 👈 1. ProfilePage import

type Page = "home" | "community" | "hospital" | "profile";

export default function App() {
  // 👈 2. 로그인 페이지가 보이도록 false로 유지
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("김건강");
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex justify-center">
      <div className="w-full max-w-[430px] sm:max-w-md md:max-w-2xl lg:max-w-4xl min-h-screen bg-white relative shadow-xl">
        {currentPage === "home" && (
          <HomePage
            userName={userName}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        {currentPage === "hospital" && (
          <HospitalSearchPage
            onBack={() => setCurrentPage("home")}
          />
        )}
        {currentPage === "community" && (
          <CommunityPage
            onBack={() => setCurrentPage("home")}
          />
        )}
        {/* 👇 3. '준비중' 텍스트 대신 ProfilePage 컴포넌트로 교체 */}
        {currentPage === "profile" && (
          <ProfilePage
            userName={userName}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onBack={() => setCurrentPage("home")} // '뒤로가기' 누르면 홈으로
          />
        )}
      </div>
    </div>
  );
}