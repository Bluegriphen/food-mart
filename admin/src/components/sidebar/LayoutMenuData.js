const LayoutMenuData = [
  {
    icon: "fa-solid fa-chart-pie",
    label: "Dashboard",
    link: "/dashboard"
  },
  {
    icon: "fa-solid fa-pizza-slice",
    label: "Products",
    subItems: [
      { label: "All Products", link: "/products" },
      { label: "Add Product", link: "/products/add" },
      { label: "Categories", link: "/categories" }
    ]
  },
  {
    icon: "fa-solid fa-shopping-cart",
    label: "Orders",
    link: "/orders"
  },
  {
    icon: "fa-solid fa-users",
    label: "Customers",
    link: "/customers"
  },
  {
    icon: "fa-solid fa-user-tie",
    label: "Staff",
    subItems: [
      { label: "All Staff", link: "/staff" },
      { label: "Staff Types", link: "/staff/types" },
      { label: "Add Staff", link: "/staff/add" }
    ]
  },
  {
    icon: "fa-solid fa-cog",
    label: "Settings",
    subItems: [
      { label: "Profile", link: "/profile" },
      { label: "Settings", link: "/settings" }
    ]
  }
];

export default LayoutMenuData;