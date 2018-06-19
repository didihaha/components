import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Input extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,            // 修改value事件
        value: PropTypes.string.isRequired,             // 绑定的value值
        reg: PropTypes.instanceOf(RegExp),              // 输入值匹配正则
        className: PropTypes.string,
        style: PropTypes.object
    }
    static defaultProps = {
        reg: /^(\s|\S){0,}$/,                           // 默认为任意字符
        className: '',
        style: {}
    }
    changeValue (e) {
        const { reg, onChange } = this.props,
            value = e.target.value

        // 与定义的正则不匹配禁止输入
        if ( reg.test(value) ) {
            onChange(value.trim())
        }
    }
    render() {
        const { value, className, style } = this.props
        return (
            <input className={ className } value={ value } onChange={ e => this.changeValue(e) } style={ style } />
        )
    }
}
