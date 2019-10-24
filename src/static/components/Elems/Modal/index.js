import React from 'react'
import './style.scss'
import {hideModal} from '../../../actions/common'
import {isAuthenticated} from '../../../selectors/auth'
import {authLogout} from '../../../actions/auth'
import {isShowModal, selErrorAction, selStatusText, selStatusType} from '../../../selectors/common'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import ReactModal from 'react-responsive-modal'
import {push} from 'react-router-redux'


class Modal extends React.Component {

  static propTypes = {
    statusText: PropTypes.string,
    statusType: PropTypes.string,
    showModal: PropTypes.bool,
    errAction: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    path: PropTypes.string,
    authLogout: PropTypes.func,
    hideModal: PropTypes.func.isRequired
  }

  action = (link) => {
    this.props.hideModal()

    if (this.props.isAuthenticated && link.indexOf('/login') === 0)
      this.props.authLogout()

    this.props.push(link)
  }

  render() {
    const clsNames = classNames({
      'fa': true,
      'fa-exclamation-triangle': this.props.statusType === 'danger',
      'fa-check': this.props.statusType === 'success',
    })

    const btnClsNames = classNames({
      'btn btn-default': true,
      'full-width': this.props.errAction ? false : true
    })
    return (
      <ReactModal
        open={this.props.showModal}
        onClose={this.props.hideModal}
        classNames={{
          modal: 'notification-modal'
        }}
        center
        showCloseIcon={false}
        closeOnEsc={true}>
        <i className={clsNames}/>
        <h2 className='mt-4 mb-2'>
          {
            this.props.statusType === 'danger'
              ? `错误`
              : `成功`
          }
        </h2>
        <div className='error-modal-content'>
          <p className='mb-4 modal-text text-center'>
            {this.props.statusText}
          </p>
          <div className='btn-groups text-center p-2'>
            {
              this.props.errAction
              && <React.Fragment>
                {
                  this.props.errAction === 'login'
                  && <button
                    className={btnClsNames}
                    onClick={e => this.action(`/login?next=${this.props.path === '/' ? '' : this.props.path}/`)}>
                    登录</button>
                }
                {
                  this.props.errAction === 'email-verify'
                  && <button className={btnClsNames} onClick={e => this.action(`/verify-email/`)}>验证邮件</button>
                }
              </React.Fragment>
            }
            <button className={btnClsNames} onClick={e => this.props.hideModal()}>好的</button>
          </div>
        </div>
      </ReactModal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    statusText: selStatusText(state),
    statusType: selStatusType(state),
    showModal: isShowModal(state),
    errAction: selErrorAction(state),
    path: state.routing.location ? state.routing.location.pathname : undefined,
    isAuthenticated: isAuthenticated(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => {
      dispatch(hideModal())
    },
    push: (link) => {
      dispatch(push(link))
    },
    authLogout: () => {
      dispatch(authLogout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)