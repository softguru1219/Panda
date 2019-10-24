import React from 'react'
import './style.scss'
import NavLink from '../../components/Elems/NavLink'

export default class Footer extends React.Component {

  render() {
    return (
      <div className='footer'>
        <div className='container-fluid'>
          <div className='row' >
            <div className='col-sm col-12' >
              <h4><NavLink href='/discount'>白菜价</NavLink></h4>
              <ul className='list mb-4'>
                <li><NavLink href='/discount/time'>时间白菜价</NavLink></li>
                <li><NavLink href='/discount/general'>一般白菜价</NavLink></li>
              </ul>
            </div>
            <div className='col-sm col-12' >
              <h4><NavLink href='/recommend'>推荐</NavLink></h4>
              {/* <ul className='list mb-4'>
                <li><NavLink href='/service/general'>一般</NavLink></li>
                <li><NavLink href='/serivce/time'>时间</NavLink></li>
              </ul> */}
            </div>
            <div className='col-sm col-12' >
              <h4><NavLink href='/compare'>服务</NavLink></h4>
              <ul className='list mb-4'>
                <li><NavLink href='/analysis'>联系我们</NavLink></li>
                <li><NavLink href='/compare'>对比</NavLink></li>
              </ul>
            </div>
            <div className='col-sm col-12' >
              <h4><NavLink href='/contact-us'>联系我们</NavLink></h4>
              <ul className='list mb-4'>
                <li><span>电子邮件:</span><span> test@gmail.com</span></li>
                <li><span>手机号码:</span><span> +86 12345678901</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}