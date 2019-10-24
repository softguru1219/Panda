import React from 'react'
import {Route, Switch} from 'react-router'
import {HomeView, LoginView, NotFoundView} from './containers'
import SignUpView from './containers/SignUp'
import AccountView from './containers/Account'
import requireAuthentication from './utils/requireAuthentication'
import ContactUsView from './containers/ContactUs'
import CategoryView from './containers/Category'

import ProductDetail from './containers/Product/ProductDetail'
import CompareProductView from './containers/Product/CompareProduct'
import DiscountTodayProductsView from './containers/Product/DiscountTodayProducts'
import DiscountProductsView from './containers/Product/DiscountProducts'
import RecommendProductView from './containers/Product/RecommendProduct'
import SearchProductView from './containers/Product/SearchProduct'
import AnalysisView from './containers/Analysis'
import DiscountGeneralProductsView from './containers/Product/DiscountGeneralProducts'
import DiscountTimeProductsView from './containers/Product/DiscountTimeProducts'

// Blog
import BlogListView from './containers/Blog/BlogList'
import BlogDetail from './containers/Blog/BlogDetail'
import BlogCreateView from './containers/Blog/BlogCreate'
import BlogEditView from './containers/Blog/BlogEdit'

// Membership
import ConfirmEmailView from './containers/ConfirmEmail'
import ChangeEmailView from './containers/ChangeEmail'
import MemberShipView from './containers/MemberShip'


// Admin
import AdminView from './containers/Admin'
import DashboardView from './containers/Admin/Dashboard'
import UserListView from './containers/Admin/UserList'
import DataStatusView from './containers/Admin/DataStatus'
import AdminMembershipView from './containers/Admin/Membership'
import QuestionsView from './containers/Admin/Questions'
import PolicyView from './containers/Admin/Policy'

export default (
  <Switch>
    <Route exact path="/" component={HomeView}/>

    <Route path="/login" component={LoginView}/>
    <Route path="/member/:member(.+)/" component={SignUpView}/>
    <Route path="/signup/" component={MemberShipView}/>
    <Route path="/account" component={requireAuthentication(AccountView)}/>

    <Route path="/blog/create/" component={requireAuthentication(BlogCreateView)}/>
    <Route path="/blog/:id(\d+)/edit/" component={BlogEditView}/>
    <Route path="/blog/:id(\d+)/" component={BlogDetail}/>
    <Route path="/blog" component={BlogListView}/>

    <Route path="/contact-us" component={ContactUsView}/>

    <Route path='/category/:categoryId1(\d*)/:categoryId2(\d*)/:categoryId3(\d*)' component={CategoryView}/>
    <Route path='/category/:categoryId1(\d*)/:categoryId2(\d*)' component={CategoryView}/>
    <Route path='/category/:categoryId1(\d*)' component={CategoryView}/>

    <Route path="/discount/today/" component={DiscountTodayProductsView}/>
    <Route path="/discount/general/" component={DiscountGeneralProductsView}/>
    <Route path="/discount/time/" component={DiscountTimeProductsView}/>
    <Route path="/discount/" component={DiscountProductsView}/>

    <Route path="/compare" component={CompareProductView}/>

    <Route path="/recommend" component={RecommendProductView}/>

    <Route path="/search/:catId(\d*)/:searchText/" component={SearchProductView}/>
    <Route path="/search/:catId(\d*)/:searchText/" component={SearchProductView}/>
    <Route path="/search/" component={SearchProductView}/>

    <Route path="/product/:id" component={ProductDetail}/>
    <Route path="/analysis/" component={AnalysisView}/>

    <Route path="/confirm/email/:activationKey" component={ConfirmEmailView}/>
    <Route path="/verify-email/" component={ChangeEmailView}/>

    <Route path="/admin/dashboard" component={DashboardView}/>
    <Route path="/admin/user-list" component={UserListView}/>
    <Route path="/admin/data-status" component={DataStatusView}/>
    <Route path="/admin/membership" component={AdminMembershipView}/>
    <Route path="/admin/questions" component={QuestionsView}/>
    <Route path="/admin/policy" component={PolicyView}/>
    <Route path="/admin" component={AdminView}/>

    <Route path="*" component={NotFoundView}/>
  </Switch>
)
