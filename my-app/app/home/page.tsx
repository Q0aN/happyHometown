'use client';

import { Qoan } from "@/components/base";
import { Navigation } from "@/components/navigation";
import { navigationItems } from "@/src/info";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('00170001');

  return (

    <Qoan>
      <Navigation items={navigationItems} selected={activeTab} onSelected={setActiveTab} />
      {activeTab === '00170001' && <HomePage />}
      {activeTab === '00170002' && <OtherPage />}
    </Qoan>
  );
}

const HomePage = () => {
  return (
    <Qoan>
      这是首页
    </Qoan>
  );
};
const OtherPage = () => {
  return (
    <Qoan>
      这是其他
    </Qoan>
  );
};