
import React, { memo } from 'react';
import { Qoan } from '../base';
import { VideoProps } from '@/src/types';

export const Video = memo(function Video(props: VideoProps) {
    const {
        address
    } = props;


    return (
        <Qoan className='w-full flex pl-16'>
            <video className='w-full' controls>
                <source src={address} type="video/mp4" />
                您的浏览器不支持视频播放
            </video>
        </Qoan>
    )
})
