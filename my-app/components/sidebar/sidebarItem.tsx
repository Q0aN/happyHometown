'use client';
import React, { memo } from 'react';
import { Qoan } from '../base';
import { SideBarItemProps } from '@/src/types';
import { getStyle } from '@/src/script/cp/sidebar';

export const SideBarItem = memo(function SideBarItem(props: SideBarItemProps) {
    const {
        name,
        id,
        isOpened,
        children,
        selected,
        onPress
    } = props;

    return (
        <Qoan className={getStyle(props)}>
            <Qoan
                onClick={(e) => {
                    e.stopPropagation();
                    onPress?.(id)
                }}
            >{name}</Qoan>

            {isOpened && children && children.map((child) => (
                <SideBarItem key={child.id} id={child.id} name={child.name} isOpened={child.isOpened} children={child.children} onPress={onPress} selected={selected} />
            ))
            }
        </Qoan>
    )
})