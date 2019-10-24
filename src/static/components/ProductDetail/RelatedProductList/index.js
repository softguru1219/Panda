import React from 'react'
import './style.scss'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import MiniProduct from '../../MiniProduct'


function CustomNextArrow(props) {
  const { style, onClick } = props
  return (
    <span
      className={`fa fa-chevron-up custom-arrow custom-arrow-next`}
      style={{ ...style}}
      onClick={onClick}
    />
  )
}

function CustomPrevArrow(props) {
  const { style, onClick } = props
  return (
    <span
      className={`fa fa-chevron-down custom-arrow  custom-arrow-prev`}
      style={{ ...style}}
      onClick={onClick}
    />
  )
}

export default class RelatedProductList extends React.Component {

  static propTypes = {
    products: PropTypes.array.isRequired,
  }

  render() {
    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
      lazyLoad: true,
      dots: false,
      arrows: true,
      vertical: true,
      nextArrow: <CustomNextArrow/>,
      prevArrow: <CustomPrevArrow/>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            vertical: false,
            arrows: false,
            slidesToShow: 5
          }
        },
        {
          breakpoint: 992,
          settings: {
            vertical: false,
            arrows: false,
            slidesToShow: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            vertical: false,
            arrows: false,
            slidesToShow: 3
          }
        }

      ]
    }
    return (
      <div className='related-product-list'>
        <h5 className='mb-3 text-center'>看了又看</h5>
        {
          this.props.products.length > 3 
          ? <Slider {...settings} >
            {
              this.props.products.map((prod, idx) => {
                return <MiniProduct key={idx} product={prod} />
              })
            }
          </Slider>
          : <React.Fragment>
            {
              this.props.products.map((prod, idx) => {
                return <MiniProduct key={idx} product={prod} />
              })
            }
          </React.Fragment>
        }
      </div>
    )
  }
}