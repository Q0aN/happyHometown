'use client';
import { Navigation } from '@/components/navigation';
import React, { memo, useState, } from 'react';



export default memo(function Home() {
  const [selectedNavigation, setSelectedNavigation] = useState<string>('00170001')
  return (
    <Navigation items={[{ id: '00170001', name: '菜单2' }, { id: '00170002', name: '菜单2' }, { id: '00170003', name: '菜单3' }, { id: '00170004', name: '菜单4' }]} selected={selectedNavigation} onSelected={setSelectedNavigation}>

    </Navigation>
  )
})
