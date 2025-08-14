'use client';

import React, { createContext, useContext, useState } from 'react';
import { Qoan } from '@/components/base';

const TabContext = createContext<string>('');

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Qoan>
            <main>{children}</main>
        </Qoan>
    );
}
export function useActiveTab() {
    return useContext(TabContext);
}