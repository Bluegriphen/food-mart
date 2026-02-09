const PopularItems = ({ data }) => {
  const popularItems = data?.today?.popularItems || [];
  const totalOrders = data?.today?.orders || 1;

  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Today's Popular Items</h5>
        <button className="btn btn-sm btn-outline-primary">
          Menu <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          {popularItems.map((item, index) => {
            const percentage = Math.round((item.orders / totalOrders) * 100);
            return (
              <div key={item.name} className="list-group-item border-0 px-0 py-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: "32px", height: "32px" }}>
                      {index + 1}
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0">{item.name}</h6>
                      <div className="d-flex gap-3">
                        <small className="text-muted">{item.orders} orders</small>
                        <small className="text-success fw-semibold">${item.revenue}</small>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="progress" style={{ width: "80px", height: "6px" }}>
                      <div 
                        className="progress-bar bg-primary" 
                        style={{ width: `${(item.orders / popularItems[0]?.orders) * 100}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">{percentage}%</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularItems;