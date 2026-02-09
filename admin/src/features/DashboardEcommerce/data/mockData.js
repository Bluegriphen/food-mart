export const getMockDashboardData = () => ({
  restaurantInfo: {
    name: "Food Mart",
    id: "RST-001",
    status: "active",
    rating: 4.7,
    totalReviews: 345,
    category: "Multi-cuisine",
    location: "Downtown",
    owner: "John Doe",
    joinedDate: "2023-01-15"
  },
  today: {
    orders: 87,
    revenue: 4560,
    averageOrderValue: 52.41,
    popularItems: [
      { name: "Chicken Burger", orders: 23, revenue: 1207 },
      { name: "Margherita Pizza", orders: 18, revenue: 900 },
      { name: "Caesar Salad", orders: 15, revenue: 675 },
      { name: "Pasta Carbonara", orders: 12, revenue: 660 },
      { name: "Chocolate Brownie", orders: 10, revenue: 350 }
    ]
  },
  week: {
    orders: 567,
    revenue: 32560,
    growth: 12.5,
    busyHours: [
      { hour: "12:00 PM", orders: 45 },
      { hour: "01:00 PM", orders: 38 },
      { hour: "07:00 PM", orders: 42 },
      { hour: "08:00 PM", orders: 39 },
      { hour: "06:00 PM", orders: 35 }
    ]
  },
  month: {
    orders: 2456,
    revenue: 124560,
    customers: 1345,
    repeatCustomers: 567,
    cancellationRate: 4.2
  },
  recentOrders: [
    { id: "#FM-1001", customer: "Alex Johnson", amount: 45.99, items: 3, status: "delivered", time: "12:30 PM", type: "Delivery" },
    { id: "#FM-1002", customer: "Sarah Miller", amount: 67.50, items: 4, status: "preparing", time: "12:45 PM", type: "Pickup" },
    { id: "#FM-1003", customer: "Mike Wilson", amount: 32.75, items: 2, status: "on the way", time: "01:15 PM", type: "Delivery" },
    { id: "#FM-1004", customer: "Emma Davis", amount: 89.99, items: 5, status: "pending", time: "01:30 PM", type: "Delivery" },
    { id: "#FM-1005", customer: "David Brown", amount: 55.25, items: 3, status: "delivered", time: "02:00 PM", type: "Pickup" }
  ],
  inventoryAlerts: [
    { item: "Chicken Breast", status: "low", quantity: "2 kg", threshold: "5 kg" },
    { item: "Mozzarella Cheese", status: "medium", quantity: "3 kg", threshold: "5 kg" },
    { item: "Lettuce", status: "low", quantity: "1 kg", threshold: "3 kg" },
    { item: "Tomato Sauce", status: "good", quantity: "8 liters", threshold: "5 liters" }
  ],
  delivery: {
    avgDeliveryTime: 32,
    onTimeRate: 94.5,
    riderRating: 4.8,
    complaints: 2
  },
  chartData: {
    dailyRevenue: [1200, 1900, 3000, 5000, 2000, 3000, 4200],
    dailyOrders: [45, 52, 67, 78, 56, 89, 94],
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  }
});