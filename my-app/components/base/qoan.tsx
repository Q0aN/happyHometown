
import React, { memo } from 'react';

export interface QoanProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onClick?: any;
}

export const Qoan = memo(function Qoan(props: QoanProps) {
    const {
        children,
        style,
        className,
        onClick
    } = props;
    return (
        <div style={style} className={className} onClick={onClick}>
            {children}
        </div>
    );
});
