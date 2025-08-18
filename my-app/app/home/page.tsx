'use client';

import { Qoan } from "@/components/base";
import { Game } from "@/components/first_game";
import { Navigation } from "@/components/navigation";
import { SideBar } from "@/components/sidebar";
import { navigationItems, sidebarItems ,user } from "@/src/info";
import { updateSidebarItem } from "@/src/script/pg/home/sidebar";
import { homePageStyle } from "@/src/style";
import { useCallback, useEffect, useRef, useState } from "react";
import { BinaryFileHandler } from "@/src/script/file/src/compile/base"
import { redirect } from "next/navigation";
export default function Home() {
  if (!user.name) {
    // 未登录，重定向到登录页
    redirect('/login');
  }
  const [activeTab, setActiveTab] = useState('17000001');
  const [sideBarItems, setSidebarItems] = useState(sidebarItems)
  const [selectedSideBarItem, setSelectedSideBarItem] = useState<string>('18010001')
  return (

    <Qoan className={homePageStyle.base}>
      <Navigation items={navigationItems} selected={activeTab} onSelected={setActiveTab} />
      <Qoan className={homePageStyle.body}>

        {activeTab === '17000001' && sideBarItems.length > 0 && <SideBar items={sideBarItems}
          onPress={(id: string) => {
            setSelectedSideBarItem(id)
            setSidebarItems(updateSidebarItem(sideBarItems, id))
          }}
          selected={selectedSideBarItem}
        ></SideBar>}
        {activeTab === '17000001' && selectedSideBarItem === '18010001' && <Qoan>欢迎回来{user.name}</Qoan>}
        {activeTab === '17000001' && selectedSideBarItem === '18020101' && <Game />}
        {activeTab === '17000002' && <OtherPage />}
        {activeTab === '17000003' && <TestPage />}
      </Qoan>
    </Qoan>
  );
}
const OtherPage = () => {
  return (<Qoan>其他</Qoan>)
}
const TestPage = () => {
  const handleDownload = () => {
    // 要保存的数据
    const data = {
      name: '测试用户',
      age: 30,
      notes: '这是一段测试数据，用于生成自定义二进制文件'
    };

    // 生成 Blob
    const blob = BinaryFileHandler.createFileBlob(data, 65536); // 64KB 分片

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.qoan'; // 文件名
    a.click();

    // 释放 URL 对象
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>💾 二进制文件生成器</h1>
      <p>点击按钮生成一个自定义格式的 .qoan 文件</p>
      <button onClick={handleDownload} style={{ fontSize: '18px', padding: '10px 20px' }}>
        生成并下载文件
      </button>
    </div>
  );
}