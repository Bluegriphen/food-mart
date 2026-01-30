const Widget = ({ dashboard }) => {
  if (!dashboard) return null;

  const cards = [
    { label: "Orders", value: dashboard.orders },
    { label: "Products", value: dashboard.products },
    { label: "Users", value: dashboard.users },
    { label: "Revenue", value: `₹${dashboard.revenue}` },
  ];

  return (
    <div className="widget-grid">
      {cards.map((card, i) => (
        <div className="widget-card" key={i}>
          <p>{card.label}</p>
          <h3>{card.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default Widget;