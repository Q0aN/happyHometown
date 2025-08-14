'use client';

import React, { createContext, useContext, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Qoan } from '@/components/base';
import { navigationItems } from '@/src/info';

const TabContext = createContext<string>('');

export default function Layout({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState('00170001');

    return (
        <Qoan>
            <TabContext.Provider value={activeTab}>
                <Navigation items={navigationItems} selected={activeTab} onSelected={setActiveTab} />
                <main>{children}</main>
            </TabContext.Provider>
        </Qoan>
    );
}
export function useActiveTab() {
    return useContext(TabContext);
}