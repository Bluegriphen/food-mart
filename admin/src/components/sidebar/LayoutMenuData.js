const LayoutMenuData = [
  {
    label: "Dashboard",
    icon: "ri-dashboard-line",
    link: "/",
  },
  {
    label: "Products",
    icon: "ri-restaurant-line",
    link: "/list",
  },
  {
    label: "Add Item",
    icon: "ri-add-circle-line",
    link: "/add",
  },
  {
    label: "Orders",
    icon: "ri-shopping-bag-line",
    link: "/orders",
  },

  // Staff Management Dropdown
  {
    label: "Staff Management",
    icon: "ri-team-line",
    subItems: [
      {
        label: "Staff Master",
        link: "/staff-types",
      },
      {
        label: "Staff Members",
        link: "/staff",
      },
      
    ],
  },

  {
    label: "Inventory",
    icon: "ri-store-line",
    link: "/inventory",
  },

  {
    label: "Reports",
    icon: "ri-bar-chart-line",
    link: "/reports",
  },
];

export default LayoutMenuData;