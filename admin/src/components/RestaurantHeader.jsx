const RestaurantHeader = ({ data, onRefresh }) => {
  return (
    <header className="bg-gradient-primary text-black py-4">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="d-flex align-items-center mb-2">
              <h1 className="h2 mb-0 me-3">{data?.restaurantInfo?.name || "Food Mart"}</h1>
              <div className="d-flex gap-2">
                <span className="badge bg-light text-dark">
                  <i className="bi bi-check-circle me-1"></i> Active
                </span>
                <span className="badge bg-warning text-dark">
                  <i className="bi bi-star-fill me-1"></i> {data?.restaurantInfo?.rating || 4.7}
                </span>
                <span className="badge bg-info">
                  {data?.restaurantInfo?.category || "Restaurant"}
                </span>
              </div>
            </div>
            <div className="text-white-75">
              <p className="mb-1">
                <i className="bi bi-person-circle me-1"></i>
                Owner: <span className="fw-semibold text-warning">{data?.restaurantInfo?.owner || "John Doe"}</span>
              </p>
              <small>
                <i className="bi bi-shop me-1"></i>
                ID: {data?.restaurantInfo?.id} • 
                <i className="bi bi-calendar-check ms-2 me-1"></i>
                Joined: {data?.restaurantInfo?.joinedDate}
              </small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-end align-items-center gap-3">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-dark btn-sm active">Today</button>
                <button type="button" className="btn btn-outline-dark btn-sm">Week</button>
                <button type="button" className="btn btn-outline-dark btn-sm">Month</button>
              </div>
              <button 
                onClick={onRefresh} 
                className="btn btn-light btn-sm d-flex align-items-center"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;