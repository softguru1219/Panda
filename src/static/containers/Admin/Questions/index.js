import React from 'react'
import {push} from 'react-router-redux'
import QuestionComponent from '../../../components/Admin/Questions'


export default class Questions extends React.Component {

  render() {
    return (
      <div className={'membership-page'}>
        <QuestionComponent />
      </div>
    )
  }
}
