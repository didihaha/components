import './less/index.less'
import React, { Component, Children } from 'react'
import { IProps, IState } from './PlayerProps'
import classnames from 'classnames'


export default class AudioPlayer extends Component<IProps, IState> {
    audio: HTMLAudioElement | null
    static defaultProps = {
        audioInfo: {
            audioSrc: '',
            key: '&&' + Math.random().toString(36).slice(2)
        },
        audioConfig: {
            showPlayer: true,
            showPlayerBtn: true,
            clickAudio: (e: boolean) => null,
            audioEnd: () => null,
            isPlayinyAfterMount: false
        }
        
    }
    constructor (props: IProps) {
        super(props)
        this.audio = null
    }
    // 音频播放完毕调用该方法
    audioPlayEnd () {
        this.props.audioConfig!.audioEnd!()
    }
    // 播放按钮绑定的事件
    handdleAudio (): void {
        this.props.audioConfig!.clickAudio!(this.audio!.paused)
        if (this.audio) {
            if (this.audio.paused) {
                this.audio.play()
            } else {
                this.audio.pause()
            }
        }
        this.forceUpdate()
    }
    static getDrivedStateFromProps () {
        console.log(9890)
        return null
    }
    shouldComponentUpdate (nextProps: IProps, _nextState: IState): boolean {
        if (this.props.audioInfo!.key === nextProps.audioInfo!.key) {
            return false
        }
        return true
    }
    componentDidUpdate (prevProps: IProps, _prevState: IState) {
        // 更改声音地址后音频会自动停止播放，这里需要直接开始播放
        if (prevProps.audioInfo!.key !== this.props.audioInfo!.key) {
            this.audio!.play()
            this.forceUpdate()
        }
    }
    render() {
        const { children, audioInfo, audioConfig } = this.props
        return (
            <div className={ classnames('audio-player', {
                none: !audioConfig!.showPlayer
            }) }>
                { Children.map(children, (child: React.ReactNode) => child) }
                {
                    audioConfig!.showPlayerBtn && (
                        <div
                            className={ classnames('audio-btn', {
                                on: this.audio && !this.audio.paused
                            }) }
                            onClick={ this.handdleAudio.bind(this) }>
                        </div>
                    )
                }
                
                <audio ref={ e => this.audio = e } onEnded={ this.audioPlayEnd.bind(this) } src={ audioInfo!.audioSrc } hidden />
            </div>
        )
    }
    componentDidMount () {
        if (this.props.audioConfig!.isPlayinyAfterMount) {
            this.handdleAudio()
        }
    }
}
