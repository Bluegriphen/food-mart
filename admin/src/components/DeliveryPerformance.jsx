const DeliveryPerformance = ({ data }) => {
  const delivery = data?.delivery || {};

  const metrics = [
    { 
      icon: "bi-clock", 
      value: `${delivery.avgDeliveryTime || 32} min`, 
      label: "Avg Delivery Time",
      color: "primary"
    },
    { 
      icon: "bi-check-circle", 
      value: `${delivery.onTimeRate || 94.5}%`, 
      label: "On-time Rate",
      color: "success"
    },
    { 
      icon: "bi-star", 
      value: delivery.riderRating || 4.8, 
      label: "Rider Rating",
      color: "warning"
    },
    { 
      icon: "bi-emoji-frown", 
      value: delivery.complaints || 2, 
      label: "Complaints Today",
      color: "danger"
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Delivery Performance</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {metrics.map((metric, index) => (
            <div key={index} className="col-6">
              <div className="card border-0 bg-light">
                <div className="card-body text-center">
                  <div className={`mb-2 text-${metric.color}`}>
                    <i className={`bi ${metric.icon} fs-4`}></i>
                  </div>
                  <h4 className="mb-1">{metric.value}</h4>
                  <small className="text-muted">{metric.label}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPerformance;