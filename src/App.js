import React, { useEffect, useLayoutEffect,useState,useRef } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
// import { useLocation } from 'react-dom'
import "./App.css";
import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import ConditionTerms from "./Components/ConditionsTerms";
import Login from "./Components/Login";
import SalmanNav from "./Components/SuperPortal/salman-nav";
import StazBar from "./Components/SuperPortal/Stazbar";
import Forgetpwd from "./Components/Forgetpwd";
import Confirmpassword from "./Components/Confirmpassword";
import Sidebar from "./Components/ClientPortal/Sidebar";
import ServiceSidebar from "./Components/AdminPortal/Sidebar";
import ProviderChat from "./Components/AdminPortal/Chat";
import ServiceProvider from "./Components/ServiceProviderForm";
import Client from "./Components/Client";
import Supplier from "./Components/Supplier";
import UpdateProfile from "./Components/ClientPortal/UpdateProfile";
import AdminUpdateProfile from "./Components/AdminPortal/UpdateProfile";
import SupplierUpdateProfile from "./Components/SupplierPortal/UpdateProfile";
import AddService from "./Components/ClientPortal/AddService";
import YourService from "./Components/ClientPortal/YourService";
import AllQuotation from "./Components/ClientPortal/AllQuotation";
import Feedback from "./Components/ClientPortal/Feedback";
import AdminComplain from "./Components/SuperPortal/AdminComplain";
import SupplierDashboard from "./Components/SupplierPortal/SupplierDashboard";
import SupplierSidebar from "./Components/SupplierPortal/Sidebar";
import SuperSidebar from "./Components/SuperPortal/Sidebar";
import SupCoupons from "./Components/SuperPortal/SupCoupons";
import Led from "./Components/SuperPortal/Led";
import PaymentPhaseList from "./Components/SuperPortal/PaymentPhaseList";
import PaymentPhase from "./Components/SuperPortal/PaymentPhase";
import LedList from "./Components/SuperPortal/LedList";
import HelpList from "./Components/SuperPortal/Help";
import HelpResponse from "./Components/SuperPortal/HelpResponse";
import UpdateLed from "./Components/SuperPortal/UpdateLed";
import Coupons from "./Components/SuperPortal/Couponslist";
import Registration from "./Components/SuperPortal/Registration";
import Quotation from "./Components/SupplierPortal/Quotation";
import Quote from "./Components/SupplierPortal/Quote";
import Chat from "./Components/ClientPortal/Chat";
import SupChat from "./Components/SupplierPortal/Chat";
import Blog from "./Components/SuperPortal/Blog";
import AllBlog from "./Components/Blog";
import Contact from "./Components/ClientPortal/Contact";
import Suppliers from "./Components/ClientPortal/Suppliers";
import CreateBlog from "./Components/SuperPortal/CreateBlog";
import Todo from "./Components/AdminPortal/Todo";
import SupplierTodo from "./Components/SupplierPortal/Todo";
import Help from "./Components/ClientPortal/Help";
import Complain from "./Components/ClientPortal/Complain";
import Invoice from "./Components/ClientPortal/Invoice";
import Detail from "./Components/ClientPortal/Detail";
import SuccessPayment from "./Components/ClientPortal/SuccessPayment";
import Emailver from "./Components/Emailver";
import CustomerProjects from "./Components/ClientPortal/CustomerProjects";
import Project from "./Components/ClientPortal/Project";
import SupplierProjects from "./Components/SupplierPortal/SupplierProjects";
import SupProject from "./Components/SupplierPortal/Project";
import SentQuotation from "./Components/SupplierPortal/SentQuotation";
import DiscussionForum from "./Components/DiscussionForum";
import Moredetailsdiscussionforum from "./Components/Moredetailsdiscussionforum";
import ClientDiscussionForum from "./Components/ClientPortal/DiscussionForum";
import ClientMoredetailsdiscussionforum from "./Components/ClientPortal/Moredetailsdiscussionforum";
import Coupon from "./Components/ClientPortal/Coupon";
import ProviderDetails from "./Components/ClientPortal/ProviderDetails";
import Offers from "./Components/AdminPortal/Offers";
import ClientOffers from "./Components/ClientPortal/Offers";
import OfferList from "./Components/AdminPortal/OfferList";
import ContactUs from "./Components/ContactUs";
import StazCal from "./Components/StazCal";
import Logo from "./Components/SuperPortal/Logo";
// Landing Pager
import Landing from "./Components/LandingPage";
import PriceCalculator from "./Components/PriceCalculator";
import QuoteDetail from "./Components/ClientPortal/Quote";

import QuoteMain from "./Components/QuoteMain";
import BlogDetail from "./Components/BlogDetail";
import Aboutus from "./Components/Aboutus";
import GetInspire from "./Components/GetInspire";
import Advertise from "./Components/Advertise";
import ViewMore from "./Components/ViewMore";
import ViewService from "./Components/ViewService";

//Superadmin
import AllNotification from "./Components/SuperPortal/AllNotification";
import ViewServices from "./Components/SuperPortal/ViewServices";
import ViewServiceMore from "./Components/SuperPortal/ViewServiceMore";
import ViewReviews from "./Components/SuperPortal/ViewReviews";
import Advertised from "./Components/SuperPortal/Advertised";
import ViewContact from "./Components/SuperPortal/ViewContact";
import GetInspired from "./Components/SuperPortal/GetInspired";
import CreateImg from "./Components/SuperPortal/CreateImg";
import Ledger from "./Components/SuperPortal/Ledger";
import LedgerList from "./Components/SuperPortal/LedgerList";
import LedgerView from "./Components/SuperPortal/LedgerView";
import Charges from "./Components/SuperPortal/Charges";
import OfferBadge from "./Components/SuperPortal/OfferBadge";
import CreateForms from "./Components/SuperPortal/CreateForms";
import ComplainResponse from "./Components/SuperPortal/ComplainResponse";
import DataofInt from "./Components/SuperPortal/DataofInt";
import description from "./Components/SuperPortal/description";
import superinvoice from "./Components/SuperPortal/SuperInvoice";

//provider
import ProviderHelp from "./Components/AdminPortal/Help";
import ProviderComplain from "./Components/AdminPortal/Complain";
// import ProviderCheckComplainResponse from './Components/AdminPortal/CheckComplainRespons';
import ProviderResponses from "./Components/AdminPortal/Responses";
import ProviderCheckResponse from "./Components/AdminPortal/CheckResponse";
import AdminComplainResponses from "./Components/AdminPortal/ComplainResponses";
import ProviderAllNotification from "./Components/AdminPortal/ProviderAllNotification";

//Suppplier
import SupAllNotification from "./Components/SupplierPortal/SupAllNotification";
import SupHelp from "./Components/SupplierPortal/Help";
import SupComplain from "./Components/SupplierPortal/Complain";
import SupplierComplainResponses from "./Components/SupplierPortal/ComplainResponses";
import SupResponses from "./Components/SupplierPortal/Responses";
import SupCheckResponse from "./Components/SupplierPortal/CheckResponse";
import SupplierLedger from "./Components/SupplierPortal/SupplierLedger";

//Suppplier
import MyCoupon from "./Components/ClientPortal/MyCoupons";
import ClientAllNotification from "./Components/ClientPortal/ClientAllNotification";
import ComplainResponses from "./Components/ClientPortal/ComplainResponses";
// import Help from './Components/SupplierPortal/Help';
// import SupHelp from './Components/SupplierPortal/Help';
// import SupComplain from './Components/SupplierPortal/Complain';
// import SupplierComplainResponses from './Components/SupplierPortal/ComplainResponses';
import Responses from "./Components/ClientPortal/Responses";
import CheckResponse from "./Components/ClientPortal/CheckResponse";
import ProviderLedger from "./Components/AdminPortal/ProviderLedger";
import cookie from "react-cookies";
import SuperDashboard from "./Components/SuperPortal/SuperDashboard";
import Dashboard from "./Components/ClientPortal/Dashboard";
import ProviderDashboard from "./Components/AdminPortal/AdminDashboard";
import TestCalulator from "./Components/TestCalculator";
import forum from "./Components/forum";
import detailforum from "./Components/detailforum";
import invoice from "./Components/SupplierPortal/SupplierInvoice";
import invoicedetail from "./Components/SupplierPortal/InvoiceDetail";
import superinvoicedetail from "./Components/SuperPortal/SuperInvoiceDetail";
import editquote from "./Components/SupplierPortal/editQuote";
import PrivacyPolicy  from "./Components/PrivacyPolicy";
function App() {
 

  
  useEffect(() => {
     
  },[]);
  function supplierAuth(){
    var authenticated = false;
    try {
      let currentDate = new Date();
      const token = localStorage.getItem("user_token")
      const role = jwt_decode(localStorage.getItem("user_token"));
      if (!localStorage.getItem('user_token')) {
        authenticated = false;
    }
    else{
      if(role.exp * 1000 < currentDate.getTime() )
      {
        localStorage.clear(); this.authenticated = false;
      }
      if(role.role === "Supplier"){
        authenticated = true;
      }
      else{
        authenticated = false;
      }
      
    }
      return authenticated  
    }
     catch {
      localStorage.clear(); authenticated = false;
      return authenticated
    }
  }

  function customerAuth(){
    var authenticated = false;
    try {
      let currentDate = new Date();
      const token = localStorage.getItem("user_token")
      const role = jwt_decode(localStorage.getItem("user_token"));
      if (!localStorage.getItem('user_token')) {
        authenticated = false;
    }
    else{
      if(role.exp * 1000 < currentDate.getTime() )
      {
        localStorage.clear(); this.authenticated = false;
      }
      if(role.role === "Client"){
        authenticated = true;
      }
      else{
        authenticated = false;
      }
      
    }
      return authenticated  
    }
     catch {
      localStorage.clear(); authenticated = false;
      return authenticated
    }
  }
  function adminAuth(){
    var authenticated = false;
    try {
      let currentDate = new Date();
      const token = localStorage.getItem("user_token")
      const role = jwt_decode(localStorage.getItem("user_token"));
      if (!localStorage.getItem('user_token')) {
        authenticated = false;
    }
    else{
      if(role.exp * 1000 < currentDate.getTime() )
      {
        localStorage.clear(); this.authenticated = false;
      }
      if(role.role === "Administrator"){
        authenticated = true;
      }
      else{
        authenticated = false;
      }
      
    }
      return authenticated  
    }
     catch {
      localStorage.clear(); authenticated = false;
      return authenticated
    }
  }
  function providerAuth(){
    var authenticated = false;
    try {
      let currentDate = new Date();
      const token = localStorage.getItem("user_token")
      const role = jwt_decode(localStorage.getItem("user_token"));
      if (!localStorage.getItem('user_token')) {
        authenticated = false;
    }
    else{
      if(role.exp * 1000 < currentDate.getTime() )
      {
        localStorage.clear(); this.authenticated = false;
      }
      if(role.role === "Provider"){
        authenticated = true;
      }
      else{
        authenticated = false;
      }
      
    }
      return authenticated  
    }
     catch {
      localStorage.clear(); authenticated = false;
      return authenticated
    }
  }
  function customAuth()
  {
    var authenticated = false; 
    try{
      const token = localStorage.getItem("user_token");
      if(token === null)
      {
          localStorage.clear(); 
          authenticated=false;
      }
      else{
          authenticated=true
      }
      return authenticated
  }
  catch{
      localStorage.clear(); authenticated=false
      return authenticated;
  }
  }
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Condition-Terms"  component={ConditionTerms} /> 
          <Route  path="/Privacy-Policy" component={PrivacyPolicy}/>
          <Route path="/login" component={Login} />
          <Route path="/forgetpwd" component={Forgetpwd} />
          <Route path="/forum" component={forum}></Route>
          <Route path="/detailforum/:quid" component={detailforum}></Route>
          <Route path="/confirmpassword/:rid" component={Confirmpassword} />
          <Route exact path="/serviceprovider" component={ServiceProvider} />
          <Route exact path="/supplier" component={Supplier} />
          <PrivateRoute path="/invoicedetail/:quid" authed={supplierAuth()} redirectTo={"/login"}   component={invoicedetail}></PrivateRoute>

          {/* checkLater */}
          <Route path="/supplierinvoice" component={invoice}></Route> 

          
          
          <PrivateRoute exact path="/dashboard" authed={customerAuth()} redirectTo={"/"} component={Dashboard} />
          <PrivateRoute exact path="/admindashboard" authe={providerAuth()} redirectTo={"/"} component={ProviderDashboard} />
          <Route exact path="/superdashboard" authed={adminAuth()} redirectTo={"/"} component={SuperDashboard} />
          {/* <Route exact path="/client" component={Client} /> */}

          
          <PrivateRoute exact path="/description" authed={adminAuth()} redirectTo={"/"} component={description}></PrivateRoute>

          <PrivateRoute exact path="/providers" authed={customerAuth()} redirectTo={"/"} component={Suppliers} />
          <PrivateRoute exact path="/updateprofile" authed={customerAuth()} redirectTo={"/"} component={UpdateProfile} />
          
          {/* <Route
            exact
            path="/adminupdateprofile"
            component={AdminUpdateProfile}
          /> */}
          <PrivateRoute
            exact
            path="/supplierupdateprofile"
            authed={supplierAuth()} redirectTo={"/"}
            component={SupplierUpdateProfile}
          />
          <PrivateRoute exact path="/addservice" authed={customerAuth()} redirectTo={"/"} component={AddService} />
          <PrivateRoute exact path="/myservice" authed={customerAuth()} redirectTo={"/"} component={YourService} />
          <PrivateRoute exact path="/feedback/:fid" authed={customerAuth()} redirectTo={"/"} component={Feedback} />
          <PrivateRoute exact path="/logo" authed={adminAuth()} redirectTo={"/"} component={Logo} />

          <PrivateRoute
            exact
            path="/supplierdashboard"
            authed={supplierAuth()} redirectTo={"/"}
            component={SupplierDashboard}
          />
          <PrivateRoute exact path="/quotation" authed={supplierAuth()} redirectTo={"/"} component={Quotation} />

          <PrivateRoute exact path="/allquotation/:sid" authed={customerAuth()} redirectTo={"/"} component={AllQuotation} />

          <PrivateRoute exact path="/editquote/:serrid" authed={supplierAuth()} redirectTo={"/"} component={editquote}/>
          <PrivateRoute exact path="/quote/:serrid" authed={supplierAuth()} redirectTo={"/"} component={Quote} />
          {/* <PrivateRoute exact path="/invoice" component={Invoice} /> */}
          <PrivateRoute exact path="/chat" authed={customerAuth()} redirectTo={"/"} component={Chat} />
          <PrivateRoute exact path="/chat/:cid/:name" authed={customerAuth()} redirectTo={"/"} component={Chat} />

          <PrivateRoute exact path="/supchat" authed={supplierAuth()} redirectTo={"/"} component={SupChat} />
          <PrivateRoute exact path="/blog" authed={adminAuth()} redirectTo={"/"} component={Blog} />
          <providerAuth exact path="/createblog" authed={adminAuth()} redirectTo={"/"} component={CreateBlog} />
          <providerAuth exact path="/todo" authed={providerAuth()} redirectTo={"/"} component={Todo} />
          <PrivateRoute exact path="/suppliertodo"  authed={supplierAuth()} redirectTo={"/"}component={SupplierTodo} />
          <PrivateRoute exact path="/help" authed={customerAuth()} redirectTo={"/"} component={Help} />
          <PrivateRoute exact path="/complain" authed={customerAuth()} redirectTo={"/"}  component={Complain} />
          <PrivateRoute exact path="/registration" authed={adminAuth()} redirectTo={"/"} component={Registration} />
          <Route exact path="/contact" component={ContactUs} />
          <Route exact path="/successpayment/:pid" component={SuccessPayment} />
          {/* <Route exact path="/detail/:sid/:uid" component={Detail} /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/emailver/:uuid" component={Emailver} />
          <PrivateRoute exact path="/providerchat" authed={providerAuth()} redirectTo={"/"} component={ProviderChat} />

          <PrivateRoute
            exact
            path="/customerprojects/:sid/:uid"
            authed={customerAuth()} redirectTo={"/"}
            component={CustomerProjects}
          />

          <PrivateRoute exact path="/project" authed={customerAuth()} redirectTo={"/"} component={Project} />
          <PrivateRoute
            exact
            path="/supplierprojects/:sid/:uid"
            authed={supplierAuth()} redirectTo={"/"}
            component={SupplierProjects}
          />

          <PrivateRoute exact path="/supproject" authed={supplierAuth()} redirectTo={"/"} component={SupProject} />
          {/* <PrivateRoute exact path="/supcoupons" component={SupCoupons} /> */}
          {/* <PrivateRoute exact path="/couponslist" component={Coupons} /> */}
          <PrivateRoute exact path="/sentquotation" authed={supplierAuth()} redirectTo={"/"} component={SentQuotation} />
          <Route exact path="/discussionforum" component={DiscussionForum} />
          <Route
            exact
            path="/moredetailsdiscussionforum/:quid"
            component={Moredetailsdiscussionforum}
          />
          <PrivateRoute
            exact
            path="/clientdiscussionforum"
            authed={customAuth()} redirectTo={"/"}
            component={ClientDiscussionForum}
          />
          <PrivateRoute
            exact
            path="/clientmoredetailsdiscussionforum/:quid"
            authed={customAuth()} redirectTo={"/"}
            component={ClientMoredetailsdiscussionforum}
          />
          <PrivateRoute exact path="/led"  authed={adminAuth()} redirectTo={"/"}  component={Led} />
          {/* <Route exact path="/addpaymentphase" component={PaymentPhase} /> */}
          {/* <Route exact path="/paymentphase" component={PaymentPhaseList} /> */}
          <PrivateRoute exact path="/updateled/:ulid"  authed={adminAuth()} redirectTo={"/"} component={UpdateLed} />
          <PrivateRoute exact path="/ledlist" authed={adminAuth()} redirectTo={"/"} component={LedList} />
          <PrivateRoute exact path="/helplist" authed={adminAuth()} redirectTo={"/"} component={HelpList} />
          <Route exact path="/pricecalculator" component={PriceCalculator} />
          <PrivateRoute exact path="/admincomplain" authed={adminAuth()} redirectTo={"/"} component={AdminComplain} />
          <Route exact path="/allblog" component={AllBlog} />
          {/* <Route exact path="/coupon" component={Coupon} /> */}
          <PrivateRoute
            exact
            path="/providerdetails/:pid"
            authed={customerAuth()} redirectTo={"/"}
            component={ProviderDetails}
          />
          <PrivateRoute exact path="/provideroffer/:oid" authed={providerAuth()} redirectTo={"/"} component={Offers} />
          <PrivateRoute exact path="/customeroffer" authed={customerAuth()} redirectTo={"/"} component={ClientOffers} />
          <PrivateRoute exact path="/offerlist" authed={customerAuth()} redirectTo={"/"} component={OfferList} />
          <Route exact path="/aboutus/:fid?" component={Contact} />

          <PrivateRoute
            exact
            path="/complainresponse/:comid"
            authed={customerAuth()} redirectTo={"/"}
            component={ComplainResponses}
          />

          {/* <Route
            exact
            path="/QuoteDetail/:qid"
            componenet={QuoteDetail}
          ></Route> */}

          <Route exact path="/quotemain" component={QuoteMain} />
          <Route exact path="/blogdetail/:blid" component={BlogDetail} />

          {/* admin */}
          <PrivateRoute
            exact
            path="/adminallnotification"
            authed={adminAuth()} redirectTo={"/"}
            component={AllNotification}
          />
          {/* <Route exact path="/stazbar" component={StazBar} /> */}
          <PrivateRoute exact path="/admininvoice" authed={supplierAuth()|| providerAuth() || adminAuth() } redirectTo={"/"} component={superinvoice}></PrivateRoute>
          <PrivateRoute
            exact
            path="/superinvoicedetail/:quid"
            authed={supplierAuth()|| providerAuth() || adminAuth() } redirectTo={"/"}
            component={superinvoicedetail}
          ></PrivateRoute>

          {/* provider    */}
          <PrivateRoute exact path="/providerhelp" authed={providerAuth()} redirectTo={"/"} component={ProviderHelp} />
          <PrivateRoute exact path="/providercomplain" authed={providerAuth()} redirectTo={"/"} component={ProviderComplain} />
          <PrivateRoute
            exact
            path="/providerallnotification"
            component={ProviderAllNotification}
            authed={providerAuth()} redirectTo={"/"}
          />
          <PrivateRoute
            exact
            path="/providerresponses"
            authed={providerAuth()} redirectTo={"/"}
            component={ProviderResponses}
          />
          <PrivateRoute
            exact
            path="/providercheckresponse/:resid"
            authed={providerAuth()} redirectTo={"/"}
            component={ProviderCheckResponse}
          />
          <providerAuth
            exact
            path="/admincomplainresponse/:comid"
            component={AdminComplainResponses}
            authed={providerAuth()} redirectTo={"/"}
          />

          {/* supplier    */}
          <PrivateRoute exact path="/suphelp" authed={supplierAuth()} redirectTo={"/"} component={SupHelp} />
          <PrivateRoute exact path="/supcomplain" authed={supplierAuth()} redirectTo={"/"} component={SupComplain} />
          <PrivateRoute
            exact
            path="/supallnotification"
            authed={supplierAuth()} redirectTo={"/"}
            component={SupAllNotification}
          />
          <PrivateRoute exact path="/supresponses" authed={supplierAuth()} redirectTo={"/"} component={SupResponses} />
          <PrivateRoute
            exact
            path="/supcheckresponse/:resid"
            authed={supplierAuth()} redirectTo={"/"}
            component={SupCheckResponse}
          />
          <PrivateRoute
            exact
            path="/suppliercomplainresponse/:commid"
            authed={supplierAuth()} redirectTo={"/"}
            component={SupplierComplainResponses}
          />

          {/* supplier    */}
          {/* <Route exact path="/mycoupon" component={MyCoupon} /> */}
          <PrivateRoute exact path="/help" authed={customerAuth()} redirectTo={"/"} component={Help} />
          <PrivateRoute exact path="/complain" authed={customerAuth()} redirectTo={"/"} component={Complain} />
          <PrivateRoute
            exact
            path="/clientallnotification"
            authed={customerAuth()} redirectTo={"/"}
            component={ClientAllNotification}
          />
          <PrivateRoute exact path="/responses" authed={customerAuth()} redirectTo={"/"} component={Responses} />
          <PrivateRoute exact path="/checkresponse/:resid" authed={customerAuth()} redirectTo={"/"} component={CheckResponse} />
          <PrivateRoute exact path="/checkresponse/:resid" authed={customerAuth()} redirectTo={"/"} component={CheckResponse} />
          <PrivateRoute exact path="/viewservices" authed={adminAuth()} redirectTo={"/"} component={ViewServices} />
          <PrivateRoute
            exact
            path="/viewservicemore/:serid"
            authed={adminAuth()} redirectTo={"/"}
            component={ViewServiceMore}
          />
          <PrivateRoute exact path="/viewreviews" authed={adminAuth()} redirectTo={"/"} component={ViewReviews} />
          {/* <Route exact path="/contactus" component={Aboutus} /> */}
          <Route exact path="/getinspire" component={GetInspire} />
          <Route exact path="/advertise" component={Advertise} />

          <PrivateRoute exact path="/advertised" authed={adminAuth()} redirectTo={"/"} component={Advertised} />
          <PrivateRoute exact path="/getinspired" authed={adminAuth()} redirectTo={"/"} component={GetInspired} />
          <PrivateRoute exact path="/createimg" authed={adminAuth()} redirectTo={"/"} component={CreateImg} />
          <PrivateRoute exact path="/ledger" authed={adminAuth()} redirectTo={"/"} component={Ledger} />
          <PrivateRoute exact path="/ledgerlist/:che" authed={adminAuth()} redirectTo={"/"} component={LedgerList} />
          <PrivateRoute
            exact
            path="/ledgerview/:cheche/:cheid"
            authed={adminAuth()} redirectTo={"/"}
            component={LedgerView}
          />
          <PrivateRoute exact path="/charges" authed={adminAuth()} redirectTo={"/"} component={Charges} />
          <PrivateRoute exact path="/viewcontact" authed={adminAuth()} redirectTo={"/"} component={ViewContact} />

          {/* CHECK LATER */}
          <Route exact path="/offerbadge" component={OfferBadge} />  
          <PrivateRoute exact path="/createforms/:ford" authed={adminAuth()} redirectTo={"/"} component={CreateForms} />
          <Route exact path="/viewmore/:category" component={ViewMore} />
          <Route exact path="/viewservice/:servicei" component={ViewService} />
          <PrivateRoute
            exact
            path="/complainresponse/:ucid/:usid"
            authed={adminAuth()} redirectTo={"/"}
            component={ComplainResponse}
          />
          <PrivateRoute exact path="/helpresponse/:hid" authed={adminAuth()} redirectTo={"/"} component={HelpResponse} />
          <PrivateRoute exact path="/dataofint" authed={adminAuth()} redirectTo={"/"} component={DataofInt} />
          <PrivateRoute exact path="/providerledger" authed={providerAuth()} redirectTo={"/"} component={ProviderLedger} />
          <PrivateRoute exact path="/supplierledger" authed={supplierAuth()} redirectTo={"/"} component={SupplierLedger} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
