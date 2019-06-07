import * as React from 'react'
interface IAudioInfo {
    key: string | number,
    audioSrc: string,
    className?: string,
}

interface IAudioConfig {
    clickAudio?: Function,
    audioEnd?: Function,
    showPlayer?: boolean,
    showPlayerBtn?: boolean,
    isPlayinyAfterMount?: boolean
}

export interface IProps {
    audioInfo: IAudioInfo,             // 单个音频需传入
    audioConfig?: IAudioConfig
}

export interface IState {

}