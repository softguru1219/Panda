import React from 'react'
import './style.scss'
import Slider from 'react-slick'
import {homeSlides1, homeSlides2} from '../../../config/images'
import HomeBanner from "../HomeBanner"

let images = require.context('../../../images/home_slides', true)

function CustomNextArrow(props) {
  const { style, onClick } = props
  return (
    <span
      className={`fa fa-chevron-right main-slider-arrow custom-arrow-next`}
      style={{ ...style}}
      onClick={onClick}
    />
  )
}

function CustomPrevArrow(props) {
  const { style, onClick } = props
  return (
    <span
      className={`fa fa-chevron-left main-slider-arrow custom-arrow-prev`}
      style={{ ...style}}
      onClick={onClick}
    />
  )
}

export default class HomeSlider extends React.Component {

  render() {
    const settings1 = {
      infinite: true,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: true,
      autoplaySpeed: 3000,
      lazyLoad: true,
      dots: false,
      pauseOnHover:true,
      arrows: true,
      nextArrow: <CustomNextArrow/>,
      prevArrow: <CustomPrevArrow/>,
    }

    const settings2 = {
      infinite: true,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: true,
      autoplaySpeed: 3000,
      lazyLoad: true,
      dots: true,
      pauseOnHover:true,
      arrows: false,
    }

    let imgPath = ''
    return (
      <div className="container-fluid home-slider clearfix">
          <div className="main">
            <Slider {...settings1} >
              {
                homeSlides1.map((imgSrc, idx) => {
                  imgPath = images(`./${imgSrc}`)
                  return <img src={imgPath} key={idx} />
                })
              }
            </Slider>
            <HomeBanner/>
          </div>
          <div className="rightside">
            <Slider {...settings2}>
              {
                homeSlides2.map((imgSrc, idx) => {
                  imgPath = images(`./${imgSrc}`)
                  return <img src={imgPath} key={idx} />
                })
              }
            </Slider>
            <div className="home-info">
              <div className="home-info-header">
                <h4><i className="fa fa-volume-up mr-2" /> 通知公告</h4>
              </div>
              <p>你好! 欢迎来到我们的网站</p>
            </div>
          </div>
        </div>
    )
  }
}