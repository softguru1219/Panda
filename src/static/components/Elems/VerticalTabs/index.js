import React, { Component} from 'react'
import PropTypes from 'prop-types'

import Tab from '../Tabs/Tab'
import './style.scss'

class VerticalTabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      activeTab: this.props.children[0].props.label,
    }
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab })
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children
      },
      state: {
        activeTab,
      }
    } = this

    return (
      <div className="vertical-tabs">
        <div className='row row-eq-height'>
          <div className='col-lg-3 col-md-4 pb-md-0 col-12 pb-4'>
            <ol className="tab-list clearfix">
              {children.map((child) => {
                const { label,icon } = child.props
                return (
                  <Tab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    onClick={onClickTabItem}
                    icon={icon}
                  />
                )
              })}
            </ol>
          </div>
          <div className="col-lg-9 col-md-8 col-12">
            <div className='tab-content'>
              {children.map((child) => {
                if (child.props.label !== activeTab) return undefined
                return child.props.children
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VerticalTabs