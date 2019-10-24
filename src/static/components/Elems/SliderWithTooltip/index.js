import React from 'react'
import Tooltip from 'rc-tooltip'
import Slider, {Range} from 'rc-slider'

const Handle = Slider.Handle

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )
}


export default class SliderWithTooltip extends React.Component {

  render() {
    return <Range {...this.props} handle={handle}/>
  }
}