'use client';
import React, { CSSProperties, memo, useCallback } from 'react';
import { Qoan } from '../base';
import { NavigationProps } from '@/src/types';
import { navigationStyle } from '@/src/style';

export const Navigation = memo(function Navigation(props: NavigationProps) {
    const {
        items,
        selected,
        onSelected
    } = props;

    const onClick = useCallback((id: string) => {
        onSelected?.(id); // 调用父组件提供的回调函数，传递被点击项的id
    }, [onSelected]);

    return (
        <Qoan className={navigationStyle.base + navigationStyle.dark}>
            {
                items?.map((item, i) => {
                    if (item.id === selected) {
                        return (
                            <Qoan key={`${item.name}-${i}`} className={navigationStyle.itemSelected}>
                                {item.name}
                            </Qoan>
                        )
                    }
                    else {
                        return (
                            <Qoan key={`${item.name}-${i}`} className={navigationStyle.item} onClick={() => onClick(item.id)}>
                                {item.name}
                            </Qoan>
                        )
                    }

                })
            }
        </Qoan>
    )
})
