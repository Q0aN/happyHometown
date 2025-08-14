
import React, { memo } from 'react';

export interface QoanProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export const Qoan = memo(function Qoan(props: QoanProps) {
    const {
        children,
        style,
        className
    } = props;
    return (
        <div style={style} className={className}>
            {children}
        </div>
    );
});
