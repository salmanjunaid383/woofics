import jwt_decode from "jwt-decode";
// import { useLocation } from 'react-dom'
import "./App.css";
import { PrivateRoute } from 'react-router-with-props';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import ConditionTerms from "./Components/ConditionsTerms";
import Login from "./Components/Login";
import Forgetpwd from "./Components/Forgetpwd";
import Confirmpassword from "./Components/Confirmpassword";
import ProviderChat from "./Components/AdminPortal/Chat";
import ServiceProvider from "./Components/ServiceProviderForm";
import UpdateProfile from "./Components/ClientPortal/UpdateProfile";
import AdminUpdateProfile from "./Components/AdminPortal/UpdateProfile";
import SupplierUpdateProfile from "./Components/SupplierPortal/UpdateProfile";
import AddService from "./Components/ClientPortal/AddService";
import YourService from "./Components/ClientPortal/YourService";
import AllQuotation from "./Components/ClientPortal/AllQuotation";
import AdminComplain from "./Components/SuperPortal/AdminComplain";
import SupplierDashboard from "./Components/SupplierPortal/SupplierDashboard";
import Led from "./Components/SuperPortal/Led";
import LedList from "./Components/SuperPortal/LedList";
import HelpList from "./Components/SuperPortal/Help";
import HelpResponse from "./Components/SuperPortal/HelpResponse";
import UpdateLed from "./Components/SuperPortal/UpdateLed";
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
import ProviderDetails from "./Components/ClientPortal/ProviderDetails";
import Offers from "./Components/AdminPortal/Offers";
import ClientOffers from "./Components/ClientPortal/Offers";
import OfferList from "./Components/AdminPortal/OfferList";
import ContactUs from "./Components/ContactUs";
import Logo from "./Components/SuperPortal/Logo";
// Landing Pager
import Landing from "./Components/LandingPage";
import PriceCalculator from "./Components/PriceCalculator";

import QuoteMain from "./Components/QuoteMain";
import BlogDetail from "./Components/BlogDetail";
import GetInspire from "./Components/GetInspire";
import Advertise from "./Components/Advertise";
import ViewMore from "./Components/ViewMore";
import ViewService from "./Components/ViewService";

//Superadmin
import AllNotification from "./Components/SuperPortal/AllNotification";
import ViewServices from "./Components/SuperPortal/ViewServices";
import ViewServiceMore from "./Components/SuperPortal/ViewServiceMore";
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
import ClientAllNotification from "./Components/ClientPortal/ClientAllNotification";
import ComplainResponses from "./Components/ClientPortal/ComplainResponses";
// import Help from './Components/SupplierPortal/Help';
// import SupHelp from './Components/SupplierPortal/Help';
// import SupComplain from './Components/SupplierPortal/Complain';
// import SupplierComplainResponses from './Components/SupplierPortal/ComplainResponses';
import Responses from "./Components/ClientPortal/Responses";
import CheckResponse from "./Components/ClientPortal/CheckResponse";
import ProviderLedger from "./Components/AdminPortal/ProviderLedger";
import SuperDashboard from "./Components/SuperPortal/SuperDashboard";
import Dashboard from "./Components/ClientPortal/Dashboard";
import ProviderDashboard from "./Components/AdminPortal/AdminDashboard";
import forum from "./Components/forum";
import detailforum from "./Components/detailforum";
import invoice from "./Components/SupplierPortal/SupplierInvoice";
import invoicedetail from "./Components/SupplierPortal/InvoiceDetail";
import superinvoicedetail from "./Components/SuperPortal/SuperInvoiceDetail";
import editquote from "./Components/SupplierPortal/editQuote";
import PrivacyPolicy  from "./Components/PrivacyPolicy";

function App() {
 
  

  
  function supplierAuth(){
    var authenticated = false;
    try {
      let currentDate = new Date();
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
      const role = jwt_decode(localStorage.getItem("user_token"));
      if (!localStorage.getItem('user_token')) {
        authenticated = false;
    }
    else{
      if(role.exp * 1000 < currentDate.getTime() )
      {
        localStorage.clear(); this.authenticated = false;
      }
      console.log("role is" +role.role)
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
          <Route exact path="/Condiciones-Términos"  component={ConditionTerms} /> 
          <Route  path="/Política-de-privacidad" component={PrivacyPolicy}/>
          <Route path="/login" component={Login} />
          <Route path="/forgetpwd" component={Forgetpwd} />
          <Route path="/foro" component={forum}></Route>
          <Route path="/forodedetalles/:quid" component={detailforum}></Route>
          <Route path="/confirmpassword/:rid" component={Confirmpassword} />
          <Route exact path="/proveedordeservicio" component={ServiceProvider} />
          {/* <Route exact path="/supplier" component={Supplier} /> */}
          <Route path="/invoicedetail/:quid" authed={supplierAuth} redirectTo={"/login"}   component={invoicedetail}></Route>

          {/* checkLater */}
          <Route path="/supplierinvoice" component={invoice}></Route> 

          
          
          <PrivateRoute exact path="/tablero" authed={customerAuth} redirectTo={"/"} component={Dashboard} />
          <PrivateRoute exact path="/tablerodeadministración" authed={providerAuth} redirectTo={"/"} component={ProviderDashboard} />
          <PrivateRoute exact path="/tablerodemandos" authed={adminAuth} redirectTo={"/"} component={SuperDashboard} />
          {/* <Route exact path="/client" component={Client} /> */}

          
          <PrivateRoute exact path="/descripción" authed={adminAuth} redirectTo={"/"} component={description}></PrivateRoute>

          <PrivateRoute exact path="/proveedores" authed={customerAuth} redirectTo={"/"} component={Suppliers} />
          <PrivateRoute exact path="/actualización_del_perfil" authed={customerAuth} redirectTo={"/"} component={UpdateProfile} />
          
          <Route
            exact
            path="/adminupdateprofile"
            component={AdminUpdateProfile}
          />
          <PrivateRoute
            exact
            path="/proveedorupdateprofile"
            authed={supplierAuth} redirectTo={"/"}
            component={SupplierUpdateProfile}
          />
          <PrivateRoute exact path="/servicio_adicional" authed={customerAuth} redirectTo={"/"} component={AddService} />
          <PrivateRoute exact path="/miservicio" authed={customerAuth} redirectTo={"/"} component={YourService} />
          {/* <Route exact path="/feedback/:fid" authed={customerAuth} redirectTo={"/"} component={Feedback} /> */}
          <PrivateRoute exact path="/logo" authed={adminAuth} redirectTo={"/"} component={Logo} />

          <PrivateRoute
            exact
            path="/tablero_de_proveedores"
            authed={supplierAuth} redirectTo={"/"}
            component={SupplierDashboard}
          />
          <PrivateRoute exact path="/cotización" authed={supplierAuth} redirectTo={"/"} component={Quotation} />

          <Route exact path="/toda_cotización/:sid" authed={customerAuth} redirectTo={"/"} component={AllQuotation} />

          <Route exact path="/editar_cita/:serrid" authed={supplierAuth} redirectTo={"/"} component={editquote}/>
          <Route exact path="/cita/:serrid" authed={supplierAuth} redirectTo={"/"} component={Quote} />
          {/* <PrivateRoute exact path="/invoice" component={Invoice} /> */}
          <PrivateRoute exact path="/chat" authed={customerAuth} redirectTo={"/"} component={Chat} />
          <Route exact path="/chat/:cid/:name" authed={customerAuth} redirectTo={"/"} component={Chat} />

          <PrivateRoute exact path="/supchat" authed={supplierAuth} redirectTo={"/"} component={SupChat} />
          <PrivateRoute exact path="/blog" authed={adminAuth} redirectTo={"/"} component={Blog} />
          <PrivateRoute exact path="/createblog" authed={adminAuth} redirectTo={"/"} component={CreateBlog} />
          <PrivateRoute exact path="/todo" authed={providerAuth} redirectTo={"/"} component={Todo} />
          <PrivateRoute exact path="/suppliertodo"  authed={supplierAuth} redirectTo={"/"}component={SupplierTodo} />
          <PrivateRoute exact path="/ayuda" authed={customerAuth} redirectTo={"/"} component={Help} />
          <PrivateRoute exact path="/quejar" authed={customerAuth} redirectTo={"/"}  component={Complain} />
          <PrivateRoute exact path="/registration" authed={adminAuth} redirectTo={"/"} component={Registration} />
          <Route exact path="/contacto" component={ContactUs} />
          {/* <Route exact path="/successpayment/:pid" component={SuccessPayment} /> */}
          {/* <Route exact path="/detail/:sid/:uid" component={Detail} /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/emailver/:uuid" component={Emailver} />
          <PrivateRoute exact path="/providerchat" authed={providerAuth} redirectTo={"/"} component={ProviderChat} />

          <Route
            exact
            path="/proyectos_de_clientes/:sid/:uid"
            authed={customerAuth} redirectTo={"/"}
            component={CustomerProjects}
          />

          <PrivateRoute exact path="/proyecto" authed={customerAuth} redirectTo={"/"} component={Project} />
          <Route
            exact
            path="/proyectos_de_proveedores/:sid/:uid"
            authed={supplierAuth} redirectTo={"/"}
            component={SupplierProjects}
          />

          <PrivateRoute exact path="/supproject" authed={supplierAuth} redirectTo={"/"} component={SupProject} />
          {/* <PrivateRoute exact path="/supcoupons" component={SupCoupons} /> */}
          {/* <PrivateRoute exact path="/couponslist" component={Coupons} /> */}
          <PrivateRoute exact path="/cotización_enviada" authed={supplierAuth} redirectTo={"/"} component={SentQuotation} />
          {/* <Route exact path="/foro_de_discusion" component={DiscussionForum} /> */}
          <Route
            exact
            path="/másdetallesforumdiscussion/:quid"
            component={Moredetailsdiscussionforum}
          />
          <PrivateRoute
            exact
            path="/foro_de_discusión_del_cliente"
            authed={customAuth} redirectTo={"/"}
            component={ClientDiscussionForum}
          />
          <Route
            exact
            path="/clientemásdetallesforumdiscussion/:quid"
            authed={customAuth} redirectTo={"/"}
            component={ClientMoredetailsdiscussionforum}
          />
          <PrivateRoute exact path="/led"  authed={adminAuth} redirectTo={"/"}  component={Led} />
          {/* <Route exact path="/addpaymentphase" component={PaymentPhase} /> */}
          {/* <Route exact path="/paymentphase" component={PaymentPhaseList} /> */}
          <Route exact path="/updateled/:ulid"  authed={adminAuth} redirectTo={"/"} component={UpdateLed} />
          <PrivateRoute exact path="/ledlist" authed={adminAuth} redirectTo={"/"} component={LedList} />
          <PrivateRoute exact path="/lista_de_ayuda" authed={adminAuth} redirectTo={"/"} component={HelpList} />
          <Route exact path="/calculadora_de_precios" component={PriceCalculator} />
          <PrivateRoute exact path="/admin_quejarse" authed={adminAuth} redirectTo={"/"} component={AdminComplain} />
          <Route exact path="/allblog" component={AllBlog} />
          {/* <Route exact path="/coupon" component={Coupon} /> */}
          <Route
            exact
            path="/detalles_del_proveedor/:pid"
            authed={customerAuth} redirectTo={"/"}
            component={ProviderDetails}
          />
          <Route exact path="/oferta_de_proveedor/:oid" authed={providerAuth} redirectTo={"/"} component={Offers} />
          <PrivateRoute exact path="/oferta_al_cliente" authed={customerAuth} redirectTo={"/"} component={ClientOffers} />
          <PrivateRoute exact path="/lista_de_ofertas" authed={customerAuth} redirectTo={"/"} component={OfferList} />
          <Route exact path="/sobre_nosotros/:fid?" component={Contact} />

          <Route
            exact
            path="/quejarse_respuesta/:comid"
            authed={customerAuth} redirectTo={"/"}
            component={ComplainResponses}
          />

          {/* <Route
            exact
            path="/QuoteDetail/:qid"
            componenet={QuoteDetail}
          ></Route> */}

          <Route exact path="/cita_principal" component={QuoteMain} />
          <Route exact path="/blogdetalle/:blid" component={BlogDetail} />

          {/* admin */}
          <PrivateRoute
            exact
            path="/notificación_de_administrador"
            authed={adminAuth} redirectTo={"/"}
            component={AllNotification}
          />
          {/* <Route exact path="/stazbar" component={StazBar} /> */}
          <PrivateRoute exact path="/admininvoice" authed={supplierAuth|| providerAuth || adminAuth } redirectTo={"/"} component={superinvoice}></PrivateRoute>
          <Route
            exact
            path="/superfacturadetalle/:quid"
            authed={supplierAuth|| providerAuth || adminAuth } redirectTo={"/"}
            component={superinvoicedetail}
          ></Route>

          {/* provider    */}
          <PrivateRoute exact path="/proveedor_de_ayuda" authed={providerAuth} redirectTo={"/"} component={ProviderHelp} />
          <PrivateRoute exact path="/proveedor_quejarse" authed={providerAuth} redirectTo={"/"} component={ProviderComplain} />
          <PrivateRoute
            exact
            path="/notificación_al_proveedor"
            component={ProviderAllNotification}
            authed={providerAuth} redirectTo={"/"}
          />
          <PrivateRoute
            exact
            path="/respuestas_del_proveedor"
            authed={providerAuth} redirectTo={"/"}
            component={ProviderResponses}
          />
          <Route
            exact
            path="/providercheckresponse/:resid"
            authed={providerAuth} redirectTo={"/"}
            component={ProviderCheckResponse}
          />
          <Route
            exact
            path="/admin_quejarse_respuesta/:comid"
            component={AdminComplainResponses}
            authed={providerAuth} redirectTo={"/"}
          />

          {/* supplier    */}
          <PrivateRoute exact path="/ayudar" authed={supplierAuth} redirectTo={"/"} component={SupHelp} />
          <PrivateRoute exact path="/suplicar" authed={supplierAuth} redirectTo={"/"} component={SupComplain} />
          <PrivateRoute
            exact
            path="/supallnotification"
            authed={supplierAuth} redirectTo={"/"}
            component={SupAllNotification}
          />
          <PrivateRoute exact path="/supresponses" authed={supplierAuth} redirectTo={"/"} component={SupResponses} />
          <Route
            exact
            path="/supcheckresponse/:resid"
            authed={supplierAuth} redirectTo={"/"}
            component={SupCheckResponse}
          />
          <Route
            exact
            path="/suppliercomplainresponse/:commid"
            authed={supplierAuth} redirectTo={"/"}
            component={SupplierComplainResponses}
          />

          {/* supplier    */}
          {/* <Route exact path="/mycoupon" component={MyCoupon} /> */}
          {/* <PrivateRoute exact path="/ayuda" authed={customerAuth} redirectTo={"/"} component={Help} /> */}
          {/* <PrivateRoute exact path="/quejar" authed={customerAuth} redirectTo={"/"} component={Complain} /> */}
          <PrivateRoute
            exact
            path="/clientallnotification"
            authed={customerAuth} redirectTo={"/"}
            component={ClientAllNotification}
          />
          <PrivateRoute exact path="/respuestas" authed={customerAuth} redirectTo={"/"} component={Responses} />
          <Route exact path="/checkresponse/:resid" authed={customerAuth} redirectTo={"/"} component={CheckResponse} />
          <PrivateRoute exact path="/ver_servicios" authed={adminAuth} redirectTo={"/"} component={ViewServices} />
          <Route
            exact
            path="/ver_servicio_más/:serid"
            authed={adminAuth} redirectTo={"/"}
            component={ViewServiceMore}
          />
          {/* <PrivateRoute exact path="/viewreviews" authed={adminAuth} redirectTo={"/"} component={ViewReviews} />
          {/* <Route exact path="/contactus" component={Aboutus} /> */}
          {/* <PrivateRoute exact path="/viewreviews" authed={adminAuth()} redirectTo={"/"} component={ViewReviews} />  */}
          {/* <Route exact path="/contactus" component={Aboutus} /> */}
          <Route exact path="/inspirada" component={GetInspire} />
          <Route exact path="/anunciar" component={Advertise} />

          <PrivateRoute exact path="/anunciada" authed={adminAuth} redirectTo={"/"} component={Advertised} />
          <PrivateRoute exact path="/getinspired" authed={adminAuth} redirectTo={"/"} component={GetInspired} />
          <PrivateRoute exact path="/createimg" authed={adminAuth} redirectTo={"/"} component={CreateImg} />
          <PrivateRoute exact path="/libro_mayor" authed={adminAuth} redirectTo={"/"} component={Ledger} />
          <Route exact path="/lista_de_contabilidad/:che" authed={adminAuth} redirectTo={"/"} component={LedgerList} />
          <Route
            exact
            path="/ledgerview/:cheche/:cheid"
            authed={adminAuth} redirectTo={"/"}
            component={LedgerView}
          />
          <PrivateRoute exact path="/cargos" authed={adminAuth} redirectTo={"/"} component={Charges} />
          <PrivateRoute exact path="/ver_contacto" authed={adminAuth} redirectTo={"/"} component={ViewContact} />

          {/* CHECK LATER */}
          <Route exact path="/offerbadge" component={OfferBadge} />  
          <Route  path="/crear_formas/:ford" authed={adminAuth} redirectTo={"/"} component={CreateForms} />
          <Route exact path="/ver_más/:category" component={ViewMore} />
          <Route exact path="/servicio_de_vista/:servicei" component={ViewService} />
          <Route
            exact
            path="/quejarse_respuesta/:ucid/:usid"
            authed={adminAuth} redirectTo={"/"}
            component={ComplainResponse}
          />
          <Route exact path="/respuesta_de_ayuda/:hid" authed={adminAuth} redirectTo={"/"} component={HelpResponse} />
          <PrivateRoute exact path="/dataofint" authed={adminAuth} redirectTo={"/"} component={DataofInt} />
          <PrivateRoute exact path="/provider_libro_mayor/" authed={providerAuth} redirectTo={"/"} component={ProviderLedger} />
          <PrivateRoute exact path="/supplier_libro_mayor/" authed={supplierAuth} redirectTo={"/"} component={SupplierLedger} />
        </Switch>
      </div>
    </Router>
    
  );
  
}

export default App;
