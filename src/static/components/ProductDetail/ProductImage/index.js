import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import {imageBasePath} from "../../../config/images"
import {Player} from 'video-react'


function SampleNextArrow(props) {
  const { style, onClick } = props
  return (
    <span
      className={`fa fa-chevron-right custom-arrow custom-arrow-next`}
      style={{ ...style}}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { style, onClick } = props
  return (
    <span
      className={`fa fa-chevron-left custom-arrow  custom-arrow-prev`}
      style={{ ...style}}
      onClick={onClick}
    />
  )
}

export default class ProductImage extends React.Component {

  static propTypes = {
    images: PropTypes.array,
    videos: PropTypes.array,
    brand: PropTypes.string,
    brand_logo: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  selectImage = (index) => {
    this.setState({
      index: index
    })
  }

  render() {
    let images = this.props.images
    let videos  = this.props.videos
    let imgPath = this.state.index < images.length ? `${imageBasePath}/${images[this.state.index]}` : null
    let videoPath = this.state.index >= images.length ? videos[this.state.index - images.length] : null
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      focusOnSelect: true,
      centerMode: true,      
      nextArrow: <SampleNextArrow/>,
      prevArrow: <SamplePrevArrow/>
    }
    return (
      <div className='product-image'>
        <div className='large'>
          {
            imgPath && <React.Fragment>
                {
                  imgPath.indexOf('.mp4') < 0
                    ?  <img src={imgPath} />
                    : <Player>
                      <source src={imgPath} />
                    </Player>
                }
              </React.Fragment>
          }
          {
            videoPath && <Player>
              <source src={videoPath} />
            </Player>
          }
          {
            (this.props.brand_logo || this.props.brand ) &&
            <div className="brand">
            {
              this.props.brand_logo
                ? <img src={this.props.brand_logo} />
                : <span>{this.props.brand}</span>
            }
            </div>
          }

        </div>
        <Slider {...settings} afterChange={this.selectImage}>
          {
            images.map((image, idx) => {
              let imgSrc = `${imageBasePath}/${image}`
              return image.indexOf('.mp4') < 0
                ? <img src={imgSrc} key={idx}/>
                : <Player key={idx}>
                  <source src={imgSrc} />
                </Player>
            })
          }
          {
            videos && videos.map((video, idx) => {
              return <Player key={idx}>
                <source src={video} />
              </Player>
            })
          }
        </Slider>
      </div>
    )
  }
}