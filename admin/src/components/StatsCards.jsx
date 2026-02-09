import StatsCard from "./StatsCard";

const StatsCards = ({ data }) => {
  const stats = [
    {
      title: "Today's Orders",
      value: data?.today?.orders || 0,
      icon: "bi-cart",
      color: "primary",
      trend: 8.2,
      subtitle: "vs yesterday"
    },
    {
      title: "Today's Revenue",
      value: data?.today?.revenue || 0,
      icon: "bi-cash-coin",
      color: "success",
      prefix: "$",
      trend: 15.7,
      subtitle: "+$560 vs yesterday"
    },
    {
      title: "Avg Order Value",
      value: data?.today?.averageOrderValue || 0,
      icon: "bi-graph-up",
      color: "info",
      prefix: "$",
      trend: 3.4,
      subtitle: "+$1.60 vs yesterday"
    },
    {
      title: "Customer Rating",
      value: data?.restaurantInfo?.rating || 4.7,
      icon: "bi-star-fill",
      color: "warning",
      subtitle: `${data?.restaurantInfo?.totalReviews || 345} reviews`
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="col-xl-3 col-md-6">
          <StatsCard {...stat} />
        </div>
      ))}
    </>
  );
};

export default StatsCards;