import React from 'react'
import './style.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { currentUser} from '../../../selectors/auth'
import classNames from 'classnames'


class MemberShip extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      member: 'F'
    }
  }

  componentWillMount = () => {
    this.setState({
      member: this.props.user.member
    })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.user.member !== this.props.user.member) {
      this.setState({
        member: this.props.user.member
      })
    }
  }

  onChangeMember = (value) => {
    this.setState({
      member: value
    })
  }
  
  render() {
    const clsNames = {
      'F': classNames({
        'active': this.state.member === 'F',
        'member-line row align-items-center': true,
      }),
      'B': classNames({
        'active': this.state.member === 'B',
        'member-line row align-items-center': true,
      }),
      'P': classNames({
        'active': this.state.member === 'P',
        'member-line row align-items-center': true,
      })
    }
    return (
      <div className='membership clearfix'>
        <div className='row member-line-header my-3'>
          <div className='col-3'>会籍</div>
          <div className='col-3'>价钱</div>
          <div className='col-6'>特征</div>
        </div>
        <div className={clsNames['F']} onClick={e => this.onChangeMember('F')}>
          <div className='check-mark'><i className='fa fa-check' /></div>
          <div className='col-3'>
            <h5>免费会员</h5>
          </div>
          <div className='col-3'>
            <span className='price'>
              免费
            </span>
          </div>
          <div className='col-6'>
            <ul className='member-features'>
              <li>您可以要求无限制地比较产品.</li>
              <li>您可以每天10次请求搜索产品.</li>
              <li>你不能要求分析产品.</li>
            </ul>
          </div>
        </div>
        <div className={clsNames['B']} onClick={e => this.onChangeMember('B')}>
          <div className='check-mark'><i className='fa fa-check' /></div>
          <div className='col-3'>
            <h5>基本会员</h5>
          </div>
          <div className='col-3'>
            <span className='price'>
              29.9 &yen;
            </span>
          </div>
          <div className='col-6'>
            <ul className='member-features'>
              <li>您可以要求无限制地比较产品.</li>
              <li>您可以要求搜索产品没有限制.</li>
              <li>您可以每月30次请求分析产品.</li>
            </ul>
          </div>
        </div>
        <div className={clsNames['P']} onClick={e => this.onChangeMember('P')}>
          <div className='check-mark'><i className='fa fa-check' /></div>
          <div className='col-3'>
            <h5>专业会员</h5>
          </div>
          <div className='col-3'>
            <span className='price'>
              49.9 &yen;
            </span>
          </div>
          <div className='col-6'>
            <ul className='member-features'>
              <li>您可以要求无限制地比较产品.</li>
              <li>您可以要求搜索产品没有限制.</li>
              <li>您可以无限制地请求分析产品.</li>
            </ul>
          </div>
        </div>
        <div className='btn-groups text-right mt-4'>
          <button type="submit" className="btn btn-default mr-4" disabled={this.props.user.member === this.state.member }>现代化</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: currentUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberShip)
export {MemberShip as MemberShipNotConnected}