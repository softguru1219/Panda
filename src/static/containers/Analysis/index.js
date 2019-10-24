import React from 'react'
import AnalysisProductList from '../../components/AnalysisProductList'

export default class AnalysisView extends React.Component {
  render() {
    return (
      <div className='container-fluid wish-page my-4'>
        <AnalysisProductList />
      </div>
    )
  }
}
