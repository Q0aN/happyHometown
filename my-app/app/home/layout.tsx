'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Qoan } from '@/components/base';
import { navigationItems } from '@/src/info';

export default function Layout({children}) {
    const [activeTab, setActiveTab] = useState('00170001');

    return (
        <Qoan>
            <Navigation items={navigationItems} selected={activeTab} onSelected={setActiveTab}>

            </Navigation>

            <main>
                {/* {activeTab === '00170001' && <HomeContent />} */}
                {children}
            </main>
        </Qoan>
    );
}
function HomeContent() {
    return <div>这是首页内容</div>;
}

function AboutContent() {
    return <div>这是关于页面内容</div>;
}

function ContactContent() {
    return <div>这是联系页面内容</div>;
}