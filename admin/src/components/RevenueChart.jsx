const RevenueChart = ({ data }) => {
  const maxRevenue = Math.max(...(data?.chartData?.dailyRevenue || [1]));
  
  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Food Mart Revenue This Week</h5>
        <select className="form-select form-select-sm w-auto">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-end mb-4" style={{ height: "200px" }}>
          {data?.chartData?.dailyRevenue?.map((value, index) => (
            <div key={index} className="d-flex flex-column align-items-center mx-2 flex-grow-1">
              <div 
                className="bg-primary bg-gradient rounded-top w-100"
                style={{ 
                  height: `${(value / maxRevenue) * 150}px`,
                  minHeight: "30px"
                }}
              >
                <div className="text-center text-white fw-bold small mt-2">${value}</div>
              </div>
              <div className="text-muted small mt-2">{data?.chartData?.categories[index]}</div>
            </div>
          ))}
        </div>
        <div className="row text-center">
          <div className="col-4">
            <div className="border-end">
              <div className="text-muted small">Week's Revenue</div>
              <div className="h5 mb-0">${data?.week?.revenue?.toLocaleString()}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="border-end">
              <div className="text-muted small">Weekly Growth</div>
              <div className="h5 mb-0 text-success">+{data?.week?.growth}%</div>
            </div>
          </div>
          <div className="col-4">
            <div className="text-muted small">Week's Orders</div>
            <div className="h5 mb-0">{data?.week?.orders}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;