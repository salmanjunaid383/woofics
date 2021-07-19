import React, { useEffect, useLayoutEffect } from 'react';
// import { useLocation } from 'react-dom'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import StazBar from "./Components/SuperPortal/Stazbar";
import Forgetpwd from "./Components/Forgetpwd";
import Confirmpassword from "./Components/Confirmpassword";
import Sidebar from "./Components/ClientPortal/Sidebar";
import ServiceSidebar from "./Components/AdminPortal/Sidebar";
import ProviderChat from "./Components/AdminPortal/Chat";
import ServiceProvider from './Components/ServiceProviderForm'
import Client from './Components/Client';
import Supplier from "./Components/Supplier";
import UpdateProfile from './Components/ClientPortal/UpdateProfile'
import AdminUpdateProfile from './Components/AdminPortal/UpdateProfile'
import SupplierUpdateProfile from './Components/SupplierPortal/UpdateProfile'
import AddService from './Components/ClientPortal/AddService';
import YourService from './Components/ClientPortal/YourService';
import AllQuotation from './Components/ClientPortal/AllQuotation';
import Feedback from './Components/ClientPortal/Feedback';
import AdminComplain from './Components/SuperPortal/AdminComplain';
import SupplierSidebar from './Components/SupplierPortal/Sidebar';
import SuperSidebar from './Components/SuperPortal/Sidebar';
import SupCoupons from './Components/SuperPortal/SupCoupons';
import Led from './Components/SuperPortal/Led';
import PaymentPhaseList from './Components/SuperPortal/PaymentPhaseList';
import PaymentPhase from './Components/SuperPortal/PaymentPhase';
import LedList from './Components/SuperPortal/LedList';
import HelpList from './Components/SuperPortal/Help';
import HelpResponse from './Components/SuperPortal/HelpResponse';
import UpdateLed from './Components/SuperPortal/UpdateLed';
import Coupons from './Components/SuperPortal/Couponslist';
import Registration from './Components/SuperPortal/Registration';
import Quotation from './Components/SupplierPortal/Quotation';
import Quote from './Components/SupplierPortal/Quote';
import Chat from './Components/ClientPortal/Chat';
import SupChat from './Components/SupplierPortal/Chat';
import Blog from './Components/SuperPortal/Blog';
import AllBlog from './Components/Blog';
import Contact from './Components/ClientPortal/Contact';
import Suppliers from './Components/ClientPortal/Suppliers';
import CreateBlog from './Components/SuperPortal/CreateBlog';
import Todo from './Components/AdminPortal/Todo';
import SupplierTodo from './Components/SupplierPortal/Todo';
import Help from './Components/ClientPortal/Help';
import Complain from './Components/ClientPortal/Complain';
import Invoice from './Components/ClientPortal/Invoice';
import Detail from './Components/ClientPortal/Detail';
import SuccessPayment from './Components/ClientPortal/SuccessPayment';
import Emailver from './Components/Emailver';
import CustomerProjects from './Components/ClientPortal/CustomerProjects';
import Project from './Components/ClientPortal/Project';
import SupplierProjects from './Components/SupplierPortal/SupplierProjects';
import SupProject from './Components/SupplierPortal/Project';
import SentQuotation from './Components/SupplierPortal/SentQuotation';
import DiscussionForum from './Components/DiscussionForum';
import Moredetailsdiscussionforum from './Components/Moredetailsdiscussionforum';
import ClientDiscussionForum from './Components/ClientPortal/DiscussionForum';
import ClientMoredetailsdiscussionforum from './Components/ClientPortal/Moredetailsdiscussionforum';
import Coupon from './Components/ClientPortal/Coupon';
import ProviderDetails from './Components/ClientPortal/ProviderDetails';
import Offers from './Components/AdminPortal/Offers';
import ClientOffers from './Components/ClientPortal/Offers';
import OfferList from './Components/AdminPortal/OfferList';
import ContactUs from './Components/ContactUs';

// Landing Pager 
import Landing from './Components/LandingPage';
import PriceCalculator from './Components/PriceCalculator';


import QuoteMain from './Components/QuoteMain';
import BlogDetail from './Components/BlogDetail';
import Aboutus from './Components/Aboutus';
import GetInspire from './Components/GetInspire';
import Advertise from './Components/Advertise';
import ViewMore from './Components/ViewMore';
import ViewService from './Components/ViewService';



//Superadmin
import AllNotification from './Components/SuperPortal/AllNotification';
import ViewServices from './Components/SuperPortal/ViewServices';
import ViewServiceMore from './Components/SuperPortal/ViewServiceMore';
import ViewReviews from './Components/SuperPortal/ViewReviews';
import Advertised from './Components/SuperPortal/Advertised';
import ViewContact from './Components/SuperPortal/ViewContact';
import GetInspired from './Components/SuperPortal/GetInspired';
import CreateImg from './Components/SuperPortal/CreateImg';
import Ledger from './Components/SuperPortal/Ledger';
import LedgerList from './Components/SuperPortal/LedgerList';
import LedgerView from './Components/SuperPortal/LedgerView';
import Charges from './Components/SuperPortal/Charges';
import OfferBadge from './Components/SuperPortal/OfferBadge';
import CreateForms from './Components/SuperPortal/CreateForms';
import ComplainResponse from './Components/SuperPortal/ComplainResponse';
import DataofInt from './Components/SuperPortal/DataofInt';


//provider
import ProviderHelp from './Components/AdminPortal/Help';
import ProviderComplain from './Components/AdminPortal/Complain';
// import ProviderCheckComplainResponse from './Components/AdminPortal/CheckComplainRespons';
import ProviderResponses from './Components/AdminPortal/Responses';
import ProviderCheckResponse from './Components/AdminPortal/CheckResponse';
import AdminComplainResponses from './Components/AdminPortal/ComplainResponses';
import ProviderAllNotification from './Components/AdminPortal/ProviderAllNotification';


//Suppplier
import SupAllNotification from './Components/SupplierPortal/SupAllNotification';
import SupHelp from './Components/SupplierPortal/Help';
import SupComplain from './Components/SupplierPortal/Complain';
import SupplierComplainResponses from './Components/SupplierPortal/ComplainResponses';
import SupResponses from './Components/SupplierPortal/Responses';
import SupCheckResponse from './Components/SupplierPortal/CheckResponse';
import SupplierLedger from './Components/SupplierPortal/SupplierLedger';


//Suppplier
import MyCoupon from './Components/ClientPortal/MyCoupons';
import ClientAllNotification from './Components/ClientPortal/ClientAllNotification';
import ComplainResponses from './Components/ClientPortal/ComplainResponses';
// import Help from './Components/SupplierPortal/Help';
// import SupHelp from './Components/SupplierPortal/Help';
// import SupComplain from './Components/SupplierPortal/Complain';
// import SupplierComplainResponses from './Components/SupplierPortal/ComplainResponses';
import Responses from './Components/ClientPortal/Responses';
import CheckResponse from './Components/ClientPortal/CheckResponse';
import ProviderLedger from './Components/AdminPortal/ProviderLedger';
import cookie from "react-cookies";
import SuperDashboard from './Components/SuperPortal/SuperDashboard';


function App() {


  

  // cookie.setRawCookie("googtrans", "es", {path: "/"});


  useEffect(() => {
    // window.addEventListener('scroll', listenScrollEvent);
  
    // return () =>
    //   window.removeEventListener('scroll', listenScrollEvent);
  }, []);


  

  return (
    <Router>
      <div className="App">
        <Switch>
          
          <Route path="/login" component={Login} />
          <Route path="/forgetpwd" component={Forgetpwd} />
          <Route path="/confirmpassword/:rid" component={Confirmpassword} />
          <Route exact path="/dashboard" component={Sidebar} />
          <Route exact path="/admindashboard" component={ServiceSidebar} />
          <Route exact path="/superdashboard" component={SuperDashboard} />
          <Route exact path="/client" component={Client} />
          <Route exact path="/serviceprovider" component={ServiceProvider} />
          <Route exact path="/supplier" component={Supplier} />
          <Route exact path="/suppliers" component={Suppliers} />
          <Route exact path="/updateprofile" component={UpdateProfile} />
          <Route exact path="/adminupdateprofile" component={AdminUpdateProfile} />
          <Route exact path="/supplierupdateprofile" component={SupplierUpdateProfile} />
          <Route exact path="/addservice" component={AddService} />
          <Route exact path="/myservice" component={YourService} />
          <Route exact path="/feedback/:fid" component={Feedback} />
          <Route exact path="/supplierdashboard" component={SupplierSidebar} />
          <Route exact path="/quotation" component={Quotation} />
          <Route exact path="/allquotation/:sid" component={AllQuotation} />
          <Route exact path="/quote/:serrid" component={Quote} />
          <Route exact path="/invoice" component={Invoice} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/chat/:cid/:name" component={Chat} />
          <Route exact path="/supchat" component={SupChat} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/createblog" component={CreateBlog} />
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/suppliertodo" component={SupplierTodo} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/complain" component={Complain} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/contact" component={ContactUs} />
          <Route exact path="/successpayment/:pid" component={SuccessPayment} />
          <Route exact path="/detail/:sid/:uid" component={Detail} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/emailver/:uuid" component={Emailver} />
          <Route exact path="/providerchat" component={ProviderChat} />
          <Route exact path="/customerprojects/:sid/:uid" component={CustomerProjects} />
          <Route exact path="/project" component={Project} />
          <Route exact path="/supplierprojects/:sid/:uid" component={SupplierProjects} />
          <Route exact path="/supproject" component={SupProject} />
          <Route exact path="/supcoupons" component={SupCoupons} />
          <Route exact path="/couponslist" component={Coupons} />
          <Route exact path="/sentquotation" component={SentQuotation} />
          <Route exact path="/discussionforum" component={DiscussionForum} />
          <Route exact path="/moredetailsdiscussionforum/:quid" component={Moredetailsdiscussionforum} />
          <Route exact path="/clientdiscussionforum" component={ClientDiscussionForum} />
          <Route exact path="/clientmoredetailsdiscussionforum/:quid" component={ClientMoredetailsdiscussionforum} />
          <Route exact path="/led" component={Led} />
          <Route exact path="/addpaymentphase" component={PaymentPhase} />
          <Route exact path="/paymentphase" component={PaymentPhaseList} />
          <Route exact path="/updateled/:ulid" component={UpdateLed} />
          <Route exact path="/ledlist" component={LedList} />
          <Route exact path="/helplist" component={HelpList} />
          <Route exact path="/pricecalculator" component={PriceCalculator} />
          <Route exact path="/admincomplain" component={AdminComplain} />
          <Route exact path="/allblog" component={AllBlog} />
          <Route exact path="/coupon" component={Coupon} />
          <Route exact path="/providerdetails/:pid" component={ProviderDetails} />
          <Route exact path="/provideroffer/:oid" component={Offers} />
          <Route exact path="/customeroffer" component={ClientOffers} />
          <Route exact path="/offerlist" component={OfferList} />
          <Route exact path="/aboutus" component={Contact} />
          <Route exact path="/complainresponse/:comid" component={ComplainResponses} />




          <Route exact path="/quotemain" component={QuoteMain} />
          <Route exact path="/blogdetail/:blid" component={BlogDetail} />

          {/* admin */}
          <Route exact path="/adminallnotification" component={AllNotification} />
          <Route exact path="/stazbar" component={StazBar} />

          {/* provider    */}
          <Route exact path="/providerhelp" component={ProviderHelp} />
          <Route exact path="/providercomplain" component={ProviderComplain} />
          <Route exact path="/providerallnotification" component={ProviderAllNotification} />
          <Route exact path="/providerresponses" component={ProviderResponses} />
          <Route exact path="/providercheckresponse/:resid" component={ProviderCheckResponse} />
          <Route exact path="/admincomplainresponse/:comid" component={AdminComplainResponses} />

          {/* supplier    */}
          <Route exact path="/suphelp" component={SupHelp} />
          <Route exact path="/supcomplain" component={SupComplain} />
          <Route exact path="/supallnotification" component={SupAllNotification} />
          <Route exact path="/supresponses" component={SupResponses} />
          <Route exact path="/supcheckresponse/:resid" component={SupCheckResponse} />
          <Route exact path="/suppliercomplainresponse/:commid" component={SupplierComplainResponses} />


          {/* supplier    */}
          <Route exact path="/mycoupon" component={MyCoupon} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/complain" component={Complain} />
          <Route exact path="/clientallnotification" component={ClientAllNotification} />
          <Route exact path="/responses" component={Responses} />
          <Route exact path="/checkresponse/:resid" component={CheckResponse} />
          <Route exact path="/checkresponse/:resid" component={CheckResponse} />
          <Route exact path="/viewservices" component={ViewServices} />
          <Route exact path="/viewservicemore/:serid" component={ViewServiceMore} />
          <Route exact path="/viewreviews" component={ViewReviews} />
          <Route exact path="/contactus" component={Aboutus} />
          <Route exact path="/getinspire" component={GetInspire} />
          <Route exact path="/advertise" component={Advertise} />



          <Route exact path="/advertised" component={Advertised} />
          <Route exact path="/getinspired" component={GetInspired} />
          <Route exact path="/createimg" component={CreateImg} />
          <Route exact path="/ledger" component={Ledger} />
          <Route exact path="/ledgerlist/:che" component={LedgerList} />
          <Route exact path="/ledgerview/:cheche/:cheid" component={LedgerView} />
          <Route exact path="/charges" component={Charges} />
          <Route exact path="/viewcontact" component={ViewContact} />
          <Route exact path="/offerbadge" component={OfferBadge} />
          <Route exact path="/createforms/:ford" component={CreateForms} />


          <Route exact path="/viewmore/:category" component={ViewMore} />
          <Route exact path="/viewservice/:servicei" component={ViewService} />
          <Route exact path="/complainresponse/:ucid/:usid" component={ComplainResponse} />
          <Route exact path="/helpresponse/:hid" component={HelpResponse} />
          <Route exact path="/dataofint" component={DataofInt} />
          <Route exact path="/providerledger" component={ProviderLedger} />
          <Route exact path="/supplierledger" component={SupplierLedger} />


        </Switch>
      </div>

    </Router>
  );
}

export default App;