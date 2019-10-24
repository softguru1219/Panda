import React from 'react'
import Header from './components/Header'

import './styles/main.scss'
import Footer from './components/Footer'
import Spinner from './components/Elems/Spinner'
import Basket from './components/CompareProduct/Basket'
import Modal from './components/Elems/Modal'
import {connect} from 'react-redux'
import {isAdmin} from './selectors/auth'
import AdminHeader from './components/Admin/AdminHeader'
import AdminSidebar from './components/Admin/AdminSidebar'


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isOpenSideBar: false
    }
  }

  toggleSidebar = (e) => {
    this.setState({
      isOpenSideBar: !this.state.isOpenSideBar
    })
  }

  sidebarOpen = (open) => {
    this.setState({
      isOpenSideBar: open
    })
  }

  render() {
    return (
      <div className="app">
        {
          !this.props.isAdmin
            ? <React.Fragment>
              <Header/>
              <div className='main-content'>
                {this.props.children}
              </div>
              <Basket/>
              <Footer/>
            </React.Fragment>
            : <React.Fragment>
              <AdminSidebar isSidebarOpen={this.state.isOpenSideBar} sidebarOpen={this.sidebarOpen}>
                <AdminHeader toggleSidebar={this.toggleSidebar}/>
                <div className='admin-content' style={{'minHeight': '100vh'}}>
                  {this.props.children}
                </div>
              </AdminSidebar>
            </React.Fragment>
        }
        <Spinner/>
        <Modal/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: isAdmin(state),
  }
}

export default connect(mapStateToProps)(App)