const LayoutMenuData = [
  {
    icon: "pie-chart",  // String identifier
    label: "Dashboard",
    link: "/"
  },
  {
    icon: "package",
    label: "Products",
    subItems: [
      { label: "All Products", link: "/list" },
      { label: "Add Product", link: "/add" },
      
    ]
  },
  {
    icon: "shopping-cart",
    label: "Orders",
    link: "/orders"
  },
//  {
//    icon: "users",
//    label: "Customers",
//    link: "/customers"
// },
 {
  
  label: "Staff",
  subItems: [
    { label: "Staff Types", link: "/staff-master" },
    { label: "Staff Members", link: "/staff" },
  
  ]
},
 
];

export default LayoutMenuData;