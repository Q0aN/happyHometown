'use client';

import React from 'react';
import { Qoan } from '@/components/base';


export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Qoan>
            <main>{children}</main>
        </Qoan>
    );
}