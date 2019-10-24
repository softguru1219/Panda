import React from 'react'
import './style.scss'
import {homeBanners} from '../../../config/images'
let images = require.context('../../../images/home_banners', true)

export default class HomeBanner extends React.Component {

  render() {
    let imgPath = ''
    return (
      <div className='banner clearfix'>
        {
          homeBanners.map((image, idx) => {
            imgPath = images(`./${image}`)
            return <div className='banner-image' key={idx}><img src={imgPath}/> </div>
          })
        }
      </div>
    )
  }
}