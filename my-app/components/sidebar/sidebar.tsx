'use client';
import React, { memo, useCallback } from 'react';
import { Qoan } from '../base';
import { SideBarProps } from '@/src/types';
import { sidebarStyle } from '@/src/style';
import { SideBarItem } from './sidebarItem';

export const SideBar = memo(function SideBar(props: SideBarProps) {
    const {
        items,
        selected,
        onPress
    } = props;

    const onClick = useCallback((id: string) => {
        onPress?.(id); // 调用父组件提供的回调函数，传递被点击项的id
    }, [onPress]);

    return (
        <Qoan className={sidebarStyle.base}>
            {
                items?.map((item) => {
                    return (
                        <SideBarItem onPress={onClick} key={item.id} id={item.id} name={item.name} isOpened={item.isOpened} children={item.children} selected={selected} />
                    )
                })
            }
        </Qoan>
    )
})
