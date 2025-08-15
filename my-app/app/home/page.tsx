'use client';

import { Qoan } from "@/components/base";
import { Navigation } from "@/components/navigation";
import { SideBar } from "@/components/sidebar";
import { navigationItems, sidebarItems } from "@/src/info";
import { updateSidebarItem } from "@/src/script/pg/home/sidebar";
import { homePageStyle } from "@/src/style";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('17000001');
  const [sideBarItems, setSidebarItems] = useState(sidebarItems)
  const [selectedSideBarItem, setSelectedSideBarItem] = useState<string>('')
  return (

    <Qoan className={homePageStyle.base}>
      <Navigation items={navigationItems} selected={activeTab} onSelected={setActiveTab} />
      <Qoan className={homePageStyle.body}>

        {activeTab === '17000001' && <SideBar items={sideBarItems}
          onPress={(id: string) => {
            setSelectedSideBarItem(id)
            setSidebarItems(updateSidebarItem(sideBarItems, id))
          }}
          selected={selectedSideBarItem}
        ></SideBar>}
        {activeTab === '17000001' && <HomePage />}
        {activeTab === '17000002' && <OtherPage />}
      </Qoan>
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