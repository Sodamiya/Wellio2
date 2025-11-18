import { Header } from "./Header";
import { UserGreeting } from "./UserGreeting";
import { CalendarCard } from "./CalendarCard";
import { PromoBanner } from "./PromoBanner";
import { CTAButtons } from "./CTAButtons";
import { BottomNav } from "./BottomNav"; // 👈 BottomNav import 확인
import { SecondaryMenu } from "./SecondaryMenu";
import { HealthKnowledge } from "./HealthKnowledge"; // 👈 1. 건강지식 import

interface HomePageProps {
  userName: string;
  currentPage: string;
  onPageChange: (
    page: "home" | "community" | "hospital" | "profile",
  ) => void;
}

export function HomePage({
  userName,
  currentPage,
  onPageChange,
}: HomePageProps) {
  return (
    <>
      <Header />

      {/* main 태그의 pb-24는 BottomNav가 fixed(고정)될 때 
        가장 하단 콘텐츠(HealthKnowledge)가 BottomNav에 가려지지 않도록 
        필요한 여백입니다.
      */}
      <main className="bg-[#F7F7F7] pt-4 pb-24">
        <UserGreeting userName={userName} />

        <div className="relative -mt-20 z-10">
          {" "}
          {/* 캘린더 위치 조절 (예: -mt-20) */}
          <CalendarCard />
        </div>

        <div className="px-4 sm:px-6 md:px-8 mt-6">
          <PromoBanner />
        </div>

        <div className="px-4 sm:px-6 md:px-8 mt-6">
          <CTAButtons
            onHospitalClick={() => onPageChange("hospital")}
          />
        </div>

        <div className="px-4 sm:px-6 md:px-8 mt-3">
          {" "}
          {/* 3개 버튼은 mt-3 (약간 더 가깝게) */}
          <SecondaryMenu />
        </div>

        {/* 👇 2. 건강지식 섹션을 여기에 추가 */}
        <div className="mt-8">
          {" "}
          {/* 위쪽 여백 8 (32px) */}
          <HealthKnowledge />
        </div>
      </main>

      {/* 👇 3. BottomNav 수정
        - div로 감싸서 화면 하단에 고정(fixed)시킵니다.
        - bottom-0, left-0, right-0 (또는 w-full)으로 위치를 지정합니다.
        - z-50을 주어 다른 요소(캘린더의 z-10)보다 항상 위에 표시되게 합니다.
        - 반응형: 부모 컨테이너의 max-w를 따라가도록 수정
      */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] sm:max-w-md md:max-w-2xl lg:max-w-4xl z-50">
        <BottomNav
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}