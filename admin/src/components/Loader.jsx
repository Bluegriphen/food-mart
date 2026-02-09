const Loader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
    <div className="text-center">
      <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h5>Loading Food Mart Dashboard...</h5>
      <p className="text-muted">Please wait while we fetch your restaurant data</p>
    </div>
  </div>
);

export default Loader;