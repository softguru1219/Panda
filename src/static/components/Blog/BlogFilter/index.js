import React from 'react'
import './style.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateFilters, updateSorts} from '../../../actions/product'
import { selSorts} from '../../../selectors/product'
import { isAuthenticated} from '../../../selectors/auth'

class BlogFilter extends React.Component {

  static propTypes = {
    sorts: PropTypes.object.isRequired,
    updateSorts: PropTypes.func.isRequired,
    updateFilters: PropTypes.func.isRequired
  }

  static defatulProps = {
    showFilters: false
  }

  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  setSort = (field) => {
    this.props.updateSorts(field)
  }

  changeTitle = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  search = (e) => {
    this.props.updateFilters({'search': {value: this.state.searchText}})
  }

  keyPress = (e) => {
    if(e.keyCode == 13) {
      this.search(e)
   }
  }
  
  render() {
    return (
      <div className='blog-filter clearfix'>
        <ul className='sort'>
          {
            Object.keys(this.props.sorts).map((st, idx) => {
              let sort = this.props.sorts[st]
              return <li key={idx}>
                <button onClick={(e) => this.setSort(st)} className='btn btn-no-border btn-icon-text type2'>
                  <span>{sort.title}</span>
                  {sort.value == 1 && <i className='fa fa-sort-up' />}
                  {sort.value == 0 && <i className='fa fa-sort' />}
                  {sort.value == -1 && <i className='fa fa-sort-down' />}
                </button>
              </li>
            })
          }
          <li style={{'float': 'right', 'marginRight': '1rem'}}>
            <div className='input-group'>
              <input className='form-control' value={this.state.search} onChange={this.changeSearchKey} onKeyDown={this.keyPress}/>
              <div className="input-group-append">
                <button className='btn btn-default' onClick={this.search}>搜索</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sorts: selSorts(state),
    isAuthenticated: isAuthenticated(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateSorts: (key) => {
        dispatch(updateSorts(key))
      },
      updateFilters: (data) => {
        dispatch(updateFilters(data))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogFilter)
export {BlogFilter as BlogFilterNotConnected}