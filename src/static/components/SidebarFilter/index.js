import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Rating from 'react-rating'
import Select from 'react-select'
import DatePicker from "react-datepicker"

import SliderWithTooltip from '../../components/Elems/SliderWithTooltip'
import {selFilters} from '../../selectors/product'
import {updateFilters} from '../../actions/product'

import './style.scss'


class SidebarFilter extends React.Component {

  static propTypes = {
    updateFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    showTime: PropTypes.bool
  }

  static defaultValue = {
    showTime: false
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.convertPropsToState()
  }

  convertPropsToState = () => {
    let newState = {
      ...this.props.filters,
      review_score_min: {
        value: 0.0,
      },
      review_score_max: {
        value: 5.0,
      },
      price_min: {
        value: 0
      },
      price_max: {
        value: 1000000
      },
      show_filters: {
        color_and_sizes: [],
        item_properties: []
      }
    }

    if (this.props.showTime) {
      newState['discount_time_start'] = null
      newState['discount_time_end'] = null
    }

    this.setState(newState)
  }

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)) {
      this.convertPropsToState()
    }
  }

  setRatingFilter = (key, value) => {
    this.setState({
      review_score_min: {
        value: value
      }
    })
  }

  setVaraintsFilter = (key, value) => {
    this.setState({
      color_and_sizes: {
        ...this.state.color_and_sizes,
        [key]: {
          ...this.state[key],
          'value': value
        }
      }
    })
  }

  setSpecificationsFilter = (key, value) => {
    this.setState({
      item_properties: {
        ...this.state.item_properties,
        [key]: {
          ...this.state[key],
          'value': value
        }
      }
    })
  }

  handleColorAndSizesShow = (selectedOption) => {
    this.setState({
      show_filters: {
        ...this.state.show_filters,
        color_and_sizes: selectedOption.map(k => k.value)
      }
    })
  }

  handleSpecificationsShow = (selectedOption) => {
    this.setState({
      show_filters: {
        ...this.state.show_filters,
        item_properties: selectedOption.map(k => k.value)
      }
    })
  }

  setPriceFilter = (value) => {
    this.setState({
      price_min: {
        value: value[0]
      },
      price_max: {
        value: value[1]
      }
    })
  }

  setDiscountStartDate = (value) => {
    this.setState({
      discount_time_start: value
    })
  }

  setDiscountEndDate = (value) => {
    this.setState({
      discount_time_end: value
    })
  }

  filter = (e) => {
    this.props.updateFilters(this.state)
  }

  reset = (e) => {
    this.convertPropsToState()
  }

  changeBrand = (e) => {
    this.setState({
      ...this.state,
      brand: {
        ...this.state.brand,
        value: e.target.value
      }
    })
  }


  render() {
    return (
      <div className='sidebar-filter clearfix'>
        <h5 className='sub-title'>过滤</h5>
        <div className='row'>
          {
            this.state.review_score_min &&
            <div className='mb-4 form-group col-md-12 col-sm-6 col-12'>
              <label>速率</label>
              <div className='reviews mt-2 mb-4'>
                <Rating
                  onChange={this.setRatingFilter}
                  initialRating={this.state.review_score_min.value}
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x"
                  fractions={2} /> <span>&amp 向上</span>
              </div>
            </div>
          }
          {
            this.state.price_min && 
            <div className='mb-4 form-group col-md-12 col-sm-6 col-12'>
              <label>价钱</label>
              <div className='price mt-2 mb-4'>
                <SliderWithTooltip 
                  min={0}
                  max={1000000} 
                  defaultValue={[this.state.price_min.value, this.state.price_max.value]}
                  step={1} 
                  onChange={this.setPriceFilter}/>
              </div>
            </div>
          }
          {
            this.props.showTime 
            && <React.Fragment>
              <div className='mb-4 form-group col-md-12 col-sm-6 col-12'>
                <label>折扣时间</label>
                <div className='discount-time mt-2'>
                  <DatePicker 
                    selected={this.state.discount_time_start} 
                    dateFormat="yyyy-M-d"
                    onChange={this.setDiscountStartDate}
                    className="form-control"/>
                </div>
                <div className='discount-time mt-2 mb-4'>
                  <DatePicker 
                    selected={this.state.discount_time_end} 
                    dateFormat="yyyy-M-d"
                    onChange={this.setDiscountEndDate}
                    className="form-control"
                    minTime={this.state.discount_time_start}/>
                </div>
              </div>
            </React.Fragment>
          }
          {
            this.state.brand &&
            <div className='mb-4 form-group col-md-12 col-sm-6 col-12'>
              <label>品牌</label>
              <select value={this.state.brand.value} className='form-control' onChange={this.changeBrand}>
                <option value=''>选择品牌</option>
                {
                  this.state.brand.options.map((opt, idx) => {
                    return <option key={idx}>{opt}</option>
                  })
                }
              </select>
            </div>
          }
          {
            this.state.show_filters 
            && this.state.show_filters.color_and_sizes !== undefined
            && this.props.filters.color_and_sizes
            && <div className='mb-4 form-group col-md-12 col-sm-6 col-12'>
              <label>选择变体</label>
              <div className='show-color_and_sizes'>
                <Select 
                  isMulti={true}
                  isSearchable={true} 
                  options={
                    Object.keys(this.props.filters.color_and_sizes).filter(v => {
                      return this.state.show_filters.color_and_sizes.indexOf(v) < 0 && v !== 'image'
                    }).map(k => {
                      return {
                        value: k,
                        label: k
                      }
                    })
                  }
                  placeholder='选择变体'
                  onChange={this.handleColorAndSizesShow}/>
              </div>
            </div>
          }
          
          {
            this.state.show_filters 
            && this.state.show_filters.color_and_sizes
            && this.state.show_filters.color_and_sizes.map((key, idx) => {
              let filter = this.props.filters['color_and_sizes'][key]
              if (this.state['color_and_sizes'][key] && 'value' in this.state['color_and_sizes'][key])
                return <div key={idx} className='mb-4 form-group col-md-12 col-sm-6 col-12'>
                  <label>{filter.title}:</label>
                  {
                    filter.options &&
                    <select value={this.state['color_and_sizes'][key].value} onChange={(e) => this.setVaraintsFilter(key, e.target.value)} className='form-control'>
                        <option value=''></option>
                        {
                          filter.options.map((opt, idx1) => {
                            return <option key={idx1}>{opt}</option>
                          })
                        }
                      </select>
                  }
              </div>
            })
          }
          {
            this.state.show_filters 
            && this.state.show_filters.item_properties !== undefined
            && this.props.filters.item_properties
            && <div className='mb-4 form-group col-md-12 col-sm-6 col-12'>
              <label>选择规格</label>
              <div className='show-item_properties'>
                <Select 
                  isMulti={true}
                  isSearchable={true} 
                  options={
                    Object.keys(this.props.filters.item_properties).filter(v => {
                      return this.state.show_filters.item_properties.indexOf(v) < 0
                    }).map(k => {
                      return {
                        value: k,
                        label: k
                      }
                    })
                  }
                  placeholder='选择规格'
                  onChange={this.handleSpecificationsShow}/>
              </div>
            </div>
          }
          {
            this.state.show_filters 
            && this.state.show_filters.item_properties
            && this.state.show_filters.item_properties.map((key, idx) => {
              let filter = this.props.filters['item_properties'][key]
              if (this.state['item_properties'][key] && 'value' in this.state['item_properties'][key])
                return <div key={idx} className='mb-4 form-group col-md-12 col-sm-6 col-12'>
                  <label>{filter.title}:</label>
                  {
                    filter.options &&
                    <select value={this.state['item_properties'][key].value} onChange={(e) => this.setSpecificationsFilter(key, e.target.value)} className='form-control'>
                        <option value=''></option>
                        {
                          filter.options.map((opt, idx1) => {
                            return <option key={idx1}>{opt}</option>
                          })
                        }
                      </select>
                  }
              </div>
            })
          }
        </div>
        <div className='btn-groups text-right py-4'>
          <button className='btn btn-default mr-2' onClick={this.filter}>更新</button>
          <button className='btn btn-reset' onClick={this.reset}>重启</button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    filters: selFilters(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilters : (data) => {
      dispatch(updateFilters(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarFilter)
export {SidebarFilter as SidebarFilterNotConnected}
