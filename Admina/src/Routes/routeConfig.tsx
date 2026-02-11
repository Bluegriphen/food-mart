import { Navigate } from "react-router-dom";
import SupportTeamTable from "features/SupportTeam";
import AddSupportTeam from "features/SupportTeam/AddSupportTeam";
import EditSupportTeam from "features/SupportTeam/EditSupportTeam";
import InquiryTable from "features/Inquiry";
import Board from "features/Board";
import OurService from "features/OurService";
import Settings from "../features/Settings/Settings";
import ComingSoon from "../features/ComingSoon/ComingSoon";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Cover401 from "../pages/AuthenticationInner/Errors/Cover401";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";
import Login from "../features/Authentication/Login";
import ForgetPasswordPage from "../features/Authentication/ForgetPassword";
import Logout from "../features/Authentication/Logout";
import DashboardEcommerce from "features/DashboardEcommerce";
import PrivacyPolicy from "features/PrivacyPolicy";
import TermsCondition from "features/TermsCondition";
import CalenderScheduleInfo from "features/CalenderSchedule";
import BasicPasswReset from "features/Authentication/BasicPasswReset";
import SelectRole from "features/Authentication/SelectRole";
import StaffList from "features/Staff";
import StoreList1 from "features/Store1";
import ArchivedList from "features/Store1/ArchivedList";
import OtpVerification from "features/Authentication/OtpVerification";
import RoleList from "features/AccessRight/RoleList";
import SelectSubRole from "features/Authentication/SelectSubRole";
import Outlets from "features/Outlets";
import Tax from "features/Tax";
import StaffTypeMaster from "features/StaffType";
import SupportList from "features/Support";
import CustomerDataList from "features/CustomerList";
import MyLeaveList from "features/ApplyLeave";
import MyWorkList from "features/MyWork";
import Appointment from "features/CustomerList/Appointment";
import CheckInsAppointment from "features/CustomerList/CheckInsAppointment";
import ClockInOut from "features/ClockInOut";
import MembershipList from "features/Membership";
import MembershipDetail from "features/Membership/MembershipDetail";
import AddOrDuplicateMembership from "features/Membership/AddOrDuplicateMembership";
import SuperAdmin from "features/SuperAdmin";
import AddSystemAdmin from "features/SuperAdmin/AddSystemAdmin";
import ViewEditAdmin from "features/SuperAdmin/ViewEditAdmin";
import AuditLog from "features/AuditLog";
import FullSchedulePage from "features/CalenderSchedule/FullScheduleModal";
import TicketManagement from "features/TicketManagement";
import AddNewTicket from "features/TicketManagement/AddNewTicket";
import PayrollList from "features/Payroll/Payroll";
import RevenueReport from "features/Reports/Revenue";
import RegionWiseReport from "features/Reports/RegionWiseReport";
import RefundAndChargeBack from "features/Reports/RefundAndChargeBack";
import PaymentHistory from "features/PaymentHistory/PaymentHistory";
import BugAndIssues from "features/Reports/BugAndIssues";
import SalesReport from "features/Reports/SalesReport";
import SupportTeamReport from "features/Reports/Support";
import LeaveManagement from "features/LeaveManagement";
import LeaveHistory from "features/LeaveManagement/LeaveHistory";
import LeaveDetails from "features/LeaveManagement/LeaveDetails";
import Clusterindex from "features/Cluster";
import StoreUpsert from "features/Store1/StoreUpsert";
import CheckOut from "features/CheckOut";
import Product from "features/CheckOut/Product";
import Service from "features/CheckOut/Services";
import Inventory from "features/Inventory";
import AddInventory from "features/Inventory/AddInventory";
import EditInventory from "features/Inventory/EditInventory";
import Restock from "features/Inventory/Restock";
import InventorySetDiscount from "features/Inventory/InventorySetDiscount";
import Discount from "features/Discount";
import AddDiscount from "features/Discount/AddDiscount";
import ViewDiscount from "features/Discount/ViewDiscount";
import EditDiscount from "features/Discount/EditDiscount";
import TransactionHistory from "features/CheckOut/TransactionHistory";
import EndOfDayReport from "features/Reports/EndOfDayReport";
import QuickCheckOut from "features/QuickCheckOut";
import ArchivedOutletList from "features/Outlets/ArchivedOutletList";
import Kiosk from "features/kiosk";
import AddKiosk from "features/kiosk/AddKiosk";
import EditKiosk from "features/kiosk/EditKiosk";
import TimeClock from "features/Reports/TimeClock";
import OnlineBooking from "features/OnlineBooking";
import DepositSettings from "features/OnlineBooking/DepositSettings";
import RefundRules from "features/OnlineBooking/RefundRules";
import OnlineBookingOutletManagement from "features/OnlineBooking/OnlineBookingOutletManagement";
import OutletServicesproviederstaff from "features/OnlineBooking/OutletServicesProviederStaff";
import OnlineBookingServices from "features/OnlineBooking/OnlineBookingServices";
import OnlineBookingServicesByStaff from "features/OnlineBooking/OnlineBookingServicesByStaff";
import NotificationModule from "features/NotificationModule";
import CustomerAppointmentNotification from "features/NotificationModule/CustomerAppointmentNotification";
import CustomerPaymentNotification from "features/NotificationModule/CustomerPaymentNotification";
import CustomerMembershipNotification from "features/NotificationModule/CustomerMembershipNotification";
import CustomerMarketingNotification from "features/NotificationModule/CustomerMarketingNotification";
import OwnerNotification from "features/NotificationModule/OwnerNotification";
import StaffAppointmentNotification from "features/NotificationModule/StaffAppointmentNotification";
import StaffScheduleNotification from "features/NotificationModule/StaffScheduleNotification";
import StaffPayrollNotification from "features/NotificationModule/StaffPayrollNotification";
import CreateStaffType from "features/StaffType/CreateStaffType";
import UpdateStaffType from "features/StaffType/UpdateStaffType";
import CustomerForm from "features/CustomerList/CustomerForm";
// Inventory Module
import InventoryModule from "features/InventoryModule";
import RetailProduct from "features/InventoryModule/RetailProduct/RetailProduct";
import StoreProduct from "features/InventoryModule/StoreUseProduct/StoreUseProduct";
import VendorManagement from "features/InventoryModule/VendorManagement/VendorManagement";
import AddVendor from "features/InventoryModule/VendorManagement/AddVendor";
import Deliveries from "features/InventoryModule/Deliveries/Deliveries";
import AddDeliveries from "features/InventoryModule/Deliveries/AddDeliveries";
import RestockCenter from "features/InventoryModule/RestockCenter/RestockCenter";
import AddRestockCenter from "features/InventoryModule/RestockCenter/AddRestockCenter";
import ViewRestockCenter from "features/InventoryModule/RestockCenter/ViewRestockCenter";
import Products from "features/InventoryModule/Deliveries/Products";
import AddProduct from "features/InventoryModule/Deliveries/AddProduct";
import DeliveriesDetail from "features/InventoryModule/Deliveries/DeliveriesDetail";
import CategoryManagement from "features/InventoryModule/CategoryManagement/CategoryManagement";
import SubCategoryManagement from "features/InventoryModule/CategoryManagement/SubCategoryManagement";
// Consent Management
import ConsentManagement from "features/ConsentManagement";

const authProtectedRoutes = [
  // Dashboard
  {
    path: "/dashboard",
    component: <DashboardEcommerce />,
    requiredPermissions: ["VIEW_DASHBOARD"],
  },
  // Today's board and calendar
  {
    path: "/board",
    component: <Board />,
    requiredPermissions: ["TODAY'S_BOARD"],
  },
  {
    path: "/calender-schedule",
    component: <CalenderScheduleInfo />,
    requiredPermissions: ["CALENDAR"],
  },
  {
    path: "/full-schedule/:staffId",
    component: <FullSchedulePage />,
    requiredPermissions: ["CALENDAR"],
  },
  // Cart & quick check out
  {
    path: "/QuickCheckOut",
    component: <QuickCheckOut />,
    requiredPermissions: ["QUICK_CHECK_OUT"],
  },
  {
    path: "/Check-Out",
    component: <CheckOut />,
    requiredPermissions: ["CART"],
  },
  {
    path: "/Product",
    component: <Product />,
    requiredPermissions: ["CART"],
  },
  {
    path: "/Service",
    component: <Service />,
    requiredPermissions: ["CART"],
  },
  {
    path: "/transaction-history",
    component: <TransactionHistory />,
    requiredPermissions: ["CART", "QUICK_CHECK_OUT"],
  },
  //Clock In Out
  {
    path: "/clock-in-out",
    component: <ClockInOut />,
    requiredPermissions: ["CLOCK_IN_OUT"],
  },
  // Membership
  {
    path: "/membership-management",
    component: <MembershipList />,
    requiredPermissions: ["MEMBERSHIP_MANAGEMENT"],
  },
  {
    path: "/membership-management/add",
    component: <AddOrDuplicateMembership />,
    requiredPermissions: ["MEMBERSHIP_MANAGEMENT"],
  },
  {
    path: "/membership-management/duplicate/:id",
    component: <AddOrDuplicateMembership />,
    requiredPermissions: ["MEMBERSHIP_MANAGEMENT"],
  },
  {
    path: "/membership-management/view/:id",
    component: <MembershipDetail />,
    requiredPermissions: ["MEMBERSHIP_MANAGEMENT"],
  },
  {
    path: "/membership-management/edit/:id",
    component: <MembershipDetail />,
    requiredPermissions: ["MEMBERSHIP_MANAGEMENT"],
  },
  //Discount
  {
    path: "/Discount",
    component: <Discount />,
    requiredPermissions: ["DISCOUNT"],
  },
  {
    path: "/Discount/Add-Discount",
    component: <AddDiscount />,
    requiredPermissions: ["DISCOUNT"],
  },
  {
    path: "Discount/view-Discount/:id",
    component: <ViewDiscount />,
    requiredPermissions: ["DISCOUNT"],
  },
  {
    path: "Discount/edit-Discount/:id",
    component: <EditDiscount />,
    requiredPermissions: ["DISCOUNT"],
  },
  // Customer List
  {
    path: "/customerList",
    component: <CustomerDataList />,
    requiredPermissions: ["CUSTOMER_MANAGEMENT"],
  },
  {
    path: "/customerList/addCustomer",
    component: <CustomerForm />,
    requiredPermissions: ["ADD_CUSTOMER"],
  },
  {
    path: "/customerList/edit/:id",
    component: <CustomerForm />,
    requiredPermissions: ["CUSTOMER_MANAGEMENT"],
  },
  {
    path: "/customerList/appointment/:id",
    component: <Appointment />,
    requiredPermissions: ["CUSTOMER_MANAGEMENT"],
  },
  {
    path: "/customerList/CheckInsAppointment/:id",
    component: <CheckInsAppointment />,
    requiredPermissions: ["CUSTOMER_MANAGEMENT"],
  },
  // Staff Type
  {
    path: "/staffType",
    component: <StaffTypeMaster />,
    requiredPermissions: ["STAFF_MASTER"],
  },
  {
    path: "/staffType/create",
    component: <CreateStaffType />,
    requiredPermissions: ["STAFF_MASTER"],
  },
  {
    path: "/staffType/edit/:id",
    component: <UpdateStaffType />,
    requiredPermissions: ["STAFF_MASTER"],
  },
  // Staff Member
  {
    path: "/staff",
    component: <StaffList />,
    requiredPermissions: ["STAFF_MEMBER"],
  },
  // Payroll
  {
    path: "/payroll",
    component: <PayrollList />,
    requiredPermissions: ["PAYROLL"],
  },
  // Apply Leave
  {
    path: "/myLeaveList",
    component: <MyLeaveList />,
    requiredPermissions: ["APPLY_LEAVE"],
  },
  // Manage Leave
  {
    path: "/leavemanagement",
    component: <LeaveManagement />,
    requiredPermissions: ["MANAGE_LEAVE"],
  },
  {
    path: "/leavehistory",
    component: <LeaveHistory />,
    requiredPermissions: ["MANAGE_LEAVE"],
  },
  {
    path: "/leavedetails/:leaveId",
    component: <LeaveDetails />,
    requiredPermissions: ["MANAGE_LEAVE"],
  },
  // Outlet Management
  {
    path: "/outlet",
    component: <Outlets />,
    requiredPermissions: ["OUTLET_MANAGEMENT"],
  },
  {
    path: "/outlet/archivedlist",
    component: <ArchivedOutletList />,
    requiredPermissions: ["UPDATE_OR_ARCHIVE_OUTLET"],
  },
  // Inventory Management
  {
    path: "/Inventory",
    component: <Inventory />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "/Inventory/add-item",
    component: <AddInventory />,
    requiredPermissions: ["ADD_PRODUCT"],
  },
  {
    path: "/Inventory/edit/:id",
    component: <EditInventory />,
    requiredPermissions: ["UPDATE_OR_DELETE_PRODUCT"],
  },
  {
    path: "/Inventory/restock",
    component: <Restock />,
    requiredPermissions: ["RESTOCK_INVENTORY"],
  },
  {
    path: "/Inventory/discount",
    component: <InventorySetDiscount />,
    requiredPermissions: ["DISCOUNT_ON_INVENTORY"],
  },
  // Tax Management
  {
    path: "/tax",
    component: <Tax />,
    requiredPermissions: ["TAX_MANAGEMENT"],
  },
  // Service Management
  {
    path: "/services",
    component: <OurService />,
    requiredPermissions: ["SERVICE_MANAGEMENT"],
  },
  // Kiosk Management
  {
    path: "/kiosk",
    component: <Kiosk />,
    requiredPermissions: ["KIOSK_MANAGEMENT"],
  },
  {
    path: "/kiosk/:outletId",
    component: <Kiosk />,
    requiredPermissions: ["KIOSK_MANAGEMENT"],
  },
  {
    path: "/kiosk/:outletId/add-kiosk",
    component: <AddKiosk />,
    requiredPermissions: ["ADD_KIOSK"],
  },
  {
    path: "/kiosk/:outletId/edit-kiosk/:id",
    component: <EditKiosk />,
    requiredPermissions: ["UPDATE_OR_ARCHIVE_KIOSK"],
  },
  // My Work
  {
    path: "/myWorkList",
    component: <MyWorkList />,
    requiredPermissions: ["MY_WORK"],
  },
  // Payment-history
  {
    path: "/payment-history",
    component: <PaymentHistory />,
    requiredPermissions: ["PAYMENT"],
  },
  // Store Management
  {
    path: "/store",
    component: <StoreList1 />,
    requiredPermissions: ["STORE_MANAGEMENT"],
  },
  {
    path: "/store/add",
    component: <StoreUpsert />,
    requiredPermissions: ["ADD_NEW_STORE"],
  },
  {
    path: "/store/edit/:id",
    component: <StoreUpsert />,
    requiredPermissions: ["STORE_MANAGEMENT"],
  },
  {
    path: "/archivedlist",
    component: <ArchivedList />,
    requiredPermissions: ["STORE_MANAGEMENT"],
  },
  //Cluster Management
  {
    path: "/cluster",
    component: <Clusterindex />,
    requiredPermissions: ["CLUSTER_MANAGEMENT"],
  },
  // Access Rights
  {
    path: "/access-right",
    component: <RoleList />,
    requiredPermissions: ["ACCESS_RIGHTS"],
  },
  // Ticket management
  {
    path: "/ticket-management",
    component: <TicketManagement />,
    requiredPermissions: ["TICKET_MANAGEMENT"],
  },
  {
    path: "/ticket-management/add-new-ticket",
    component: <AddNewTicket />,
    requiredPermissions: ["TICKET_MANAGEMENT"],
  },
  //Support team
  {
    path: "/support-team",
    component: <SupportTeamTable />,
    requiredPermissions: ["SUPPORT_TEAM_MANAGEMENT"],
  },
  {
    path: "/support-team/add",
    component: <AddSupportTeam />,
    requiredPermissions: ["SUPPORT_TEAM_MANAGEMENT"],
  },
  {
    path: "/support-team/edit/:id",
    component: <EditSupportTeam />,
    requiredPermissions: ["SUPPORT_TEAM_MANAGEMENT"],
  },
  // Admin Management
  {
    path: "/super-admin",
    component: <SuperAdmin />,
    requiredPermissions: ["ADMIN_MANAGEMENT"],
  },
  {
    path: "/superadmin/edit/:id",
    component: <ViewEditAdmin />,
    requiredPermissions: ["ADMIN_MANAGEMENT"],
  },
  {
    path: "/AddSystemAdmin/add",
    component: <AddSystemAdmin />,
    requiredPermissions: ["ADMIN_MANAGEMENT"],
  },
  // Audit and Monitoring
  {
    path: "/audit-logs",
    component: <AuditLog />,
    requiredPermissions: ["AUDIT_AND_MONITORING"],
  },
  //Reports
  {
    path: "/support-team-report",
    component: <SupportTeamReport />,
    requiredPermissions: ["SUPPORT_REPORT"],
  },
  {
    path: "/revenue",
    component: <RevenueReport />,
    requiredPermissions: ["REVENUE_REPORT"],
  },
  {
    path: "/region-wise-report",
    component: <RegionWiseReport />,
    requiredPermissions: ["REGION_WISE_REPORTS"],
  },
  {
    path: "/bug-and-issues",
    component: <BugAndIssues />,
    requiredPermissions: ["BUG_AND_ISSUE_REPORTS"],
  },
  {
    path: "/refund-and-charge-back",
    component: <RefundAndChargeBack />,
    requiredPermissions: ["REFUND_AND_CHARGE_BACK_REPORTS"],
  },
  {
    path: "/sales-report",
    component: <SalesReport />,
    requiredPermissions: ["SALES_REPORTS"],
  },
  {
    path: "/end-of-day-report",
    component: <EndOfDayReport />,
    requiredPermissions: ["END_OF_DAY_REPORT"],
  },
  {
    path: "/Time-clock",
    component: <TimeClock />,
    requiredPermissions: ["TIME_CLOCK_REPORT"],
  },
  // Support Client side
  {
    path: "/support",
    component: <SupportList />,
    requiredPermissions: ["CLIENT_SUPPORT"],
  },
  //onlinebooking management
  {
    path: "/online-booking",
    component: <OnlineBooking />,
    requiredPermissions: ["ONLINE_BOOKING"],
  },
  {
    path: "/online-booking/deposit",
    component: <DepositSettings />,
    requiredPermissions: ["ONLINE_BOOKING"],
  },
  {
    path: "/online-booking/Refund",
    component: <RefundRules />,
    requiredPermissions: ["ONLINE_BOOKING"],
  },
  {
    path: "/online-booking/Outlet-management/:id",
    component: <OnlineBookingOutletManagement />,
    requiredPermissions: ["ONLINE_BOOKING"],
  },
  {
    path: "/online-booking/Outlet-management/:id/services",
    component: <OutletServicesproviederstaff />,
    requiredPermissions: ["ONLINE_BOOKING"],
  },
  {
    path: "/online-booking/services",
    component: <OnlineBookingServices />,
    requiredPermissions: ["ONLINE_BOOKING"],
  },
  {
    path: "/online-booking/services/by-staff",
    component: <OnlineBookingServicesByStaff />,
    requiredPermissions: ["ONLINE_BOOKING"],
  },
  // Notification
  {
    path: "/notification-module",
    component: <NotificationModule />,
    requiredPermissions: ["NOTIFICATION"],
  },
  {
    path: "/notification-module/customer-appointment",
    component: <CustomerAppointmentNotification />,
    requiredPermissions: ["NOTIFICATION"],
  },
  {
    path: "/notification-module/Customer-payment",
    component: <CustomerPaymentNotification />,
    requiredPermissions: ["NOTIFICATION"],
  },
  {
    path: "/notification-module/customer-membership",
    component: <CustomerMembershipNotification />,
    requiredPermissions: ["NOTIFICATION"],
  },
  {
    path: "/notification-module/customer-marketing",
    component: <CustomerMarketingNotification />,
    requiredPermissions: ["NOTIFICATION"],
  },
  {
    path: "/notification-module/staff-appointment",
    component: <StaffAppointmentNotification />,
    requiredPermissions: ["NOTIFICATION"],
  },
  {
    path: "/notification-module/staff-schedule",
    component: <StaffScheduleNotification />,
    requiredPermissions: ["NOTIFICATION"],
  },
  {
    path: "/notification-module/owner",
    component: <OwnerNotification />,
    requiredPermissions: ["NOTIFICATION"],
  },
  {
    path: "/notification-module/staff-payroll",
    component: <StaffPayrollNotification />,
    requiredPermissions: ["NOTIFICATION"],
  },
  // ----------------------------------

  //
  {
    path: "/inquiry-list",
    component: <InquiryTable />,
    requiredPermissions: ["INQUIRY_LIST"],
  },
  //---------------------

  {
    path: "/pages-profile-settings",
    component: <Settings />,
    requiredPermissions: ["PROFILE_SETTINGS"],
  },
  {
    path: "/pages-privacy-policy",
    component: <PrivacyPolicy />,
    // requiredPermissions: ["VIEW_CUSTOMER_LIST"],
  },
  {
    path: "/termscondition",
    component: <TermsCondition />,
    // requiredPermissions: ["VIEW_CUSTOMER_LIST"],
  },

  // Inventory Module
  {
    path: "/inventory-module",
    component: <InventoryModule />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  // Inventory retail
  {
    path: "/inventory-module/retail-product",
    component: <RetailProduct />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  // Inventory store
  {
    path: "/inventory-module/store-use-product",
    component: <StoreProduct />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  // Inventory category
  {
    path: "/inventory-module/category",
    component: <CategoryManagement />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "/inventory-module/sub-category",
    component: <SubCategoryManagement />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  // Inventory vendor
  {
    path: "/inventory-module/vendor-management",
    component: <VendorManagement />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "/inventory-module/vendor-management/add",
    component: <AddVendor />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  // Inventory delivery
  {
    path: "/inventory-module/deliveries",
    component: <Deliveries />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "/inventory-module/deliveries/details",
    component: <DeliveriesDetail />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "/inventory-module/deliveries/add",
    component: <AddDeliveries />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "/inventory-module/deliveries/product",
    component: <Products />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "/inventory-module/deliveries/product/add",
    component: <AddProduct />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  // Inventory restock
  {
    path: "/inventory-module/restock-center",
    component: <RestockCenter />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "/inventory-module/restock-center/add",
    component: <AddRestockCenter />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  {
    path: "inventory-module/restock-center/view",
    component: <ViewRestockCenter />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },

  // Consent Management
  {
    path: "/consent-management",
    component: <ConsentManagement />,
    requiredPermissions: ["INVENTORY_MANAGEMENT"],
  },
  
  //
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/otpverification", component: <OtpVerification /> },
  { path: "/select-role", component: <SelectRole /> },
  { path: "/select-sub-role", component: <SelectSubRole /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/access-denied", component: <Cover401 /> },
  { path: "/reset-password", component: <BasicPasswReset /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-401-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/auth-offline", component: <Offlinepage /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },
];
export { authProtectedRoutes, publicRoutes };
