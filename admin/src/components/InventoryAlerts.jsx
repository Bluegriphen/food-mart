const InventoryAlerts = ({ data }) => {
  const inventoryAlerts = data?.inventoryAlerts || [];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'low':
        return { icon: 'bi-exclamation-triangle', color: 'danger', bg: 'danger-subtle' };
      case 'medium':
        return { icon: 'bi-info-circle', color: 'warning', bg: 'warning-subtle' };
      case 'good':
        return { icon: 'bi-check-circle', color: 'success', bg: 'success-subtle' };
      default:
        return { icon: 'bi-box', color: 'secondary', bg: 'light' };
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Inventory Alerts</h5>
        <button className="btn btn-sm btn-outline-primary">
          Manage <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          {inventoryAlerts.map((item) => {
            const config = getStatusConfig(item.status);
            return (
              <div key={item.item} className="list-group-item px-0 py-3 border-bottom">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className={`p-2 rounded me-3 bg-${config.bg}`}>
                      <i className={`bi ${config.icon} text-${config.color}`}></i>
                    </div>
                    <div>
                      <h6 className="mb-0">{item.item}</h6>
                      <small className="text-muted">{item.quantity} / {item.threshold}</small>
                    </div>
                  </div>
                  <div>
                    <span className={`badge bg-${config.color}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
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

export default InventoryAlerts;