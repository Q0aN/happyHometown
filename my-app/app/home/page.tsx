'use client';

import { Qoan } from "@/components/base";
import { useActiveTab } from "./layout";
export default function Home() {
  const activeTab = useActiveTab();
  return (
    <Qoan>
      {activeTab === '00170001' && <HomePage></HomePage>}

    </Qoan>
  );
}

const HomePage = ()=>{
  return(
    <Qoan>
      这是首页
    </Qoan>
  )
}