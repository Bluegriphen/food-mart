const RecentOrders = ({ data }) => {
  const recentOrders = data?.recentOrders || [];

  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'preparing': return 'warning';
      case 'on the way': return 'info';
      case 'pending': return 'secondary';
      default: return 'light';
    }
  };

  const getTypeClass = (type) => {
    return type === 'Delivery' ? 'primary' : 'success';
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Recent Orders</h5>
        <button className="btn btn-sm btn-outline-primary">
          All Orders <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Items</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-semibold text-primary">{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="fw-semibold">${order.amount}</td>
                  <td><span className="badge bg-light text-dark">{order.items} items</span></td>
                  <td>
                    <span className={`badge bg-${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${getTypeClass(order.type)}`}>
                      {order.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;