import React, { Component, Children } from 'react'
import classnames from 'classnames'

export default class Pop extends Component {
    static defaultProps = {
        isShow: false
    }
    /**
     * 
     * @param {* dom节点} e 
     * @param {* 点击区域是否在内容区域外部的验证} isCheckContains 
     */
    closePop (e, isCheckContains = false) {
        if (isCheckContains) {
            if (this.box.contains(e.target)) {
                return null
            }
        }
        const { closePop } = this.props
        closePop()
    }
    render() {
        const { isShow } = this.props
        return (
            <div onClick={ (e) => this.closePop(e, true) } className={ classnames('pop_container', {
                none: !isShow
            }) }>
                <div className='pop_transition_box'>
                    <div className='pop_content' ref={ e => this.box = e }>
                        {
                            Children.map(this.props.children, child => child)
                        }
                        <a className='close' onClick={ e => this.closePop(e) } href='javascript:;'>&times;</a>
                    </div>
                </div>
            </div>
        )
    }
}
