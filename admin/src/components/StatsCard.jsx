const StatsCard = ({ title, value, icon, color, trend, subtitle, prefix = "" }) => (
  <div className={`card border-${color} border-top border-top-3`}>
    <div className="card-body">
      <div className="d-flex align-items-center">
        <div className={`bg-${color}-subtle p-3 rounded me-3`}>
          <i className={`bi ${icon} fs-3 text-${color}`}></i>
        </div>
        <div>
          <h3 className="h2 mb-0">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</h3>
          <p className="text-muted mb-1">{title}</p>
          {trend && (
            <div className="d-flex align-items-center gap-2">
              <small className={`text-${trend > 0 ? 'success' : 'danger'} fw-semibold`}>
                <i className={`bi bi-arrow-${trend > 0 ? 'up' : 'down'}`}></i>
                {Math.abs(trend)}%
              </small>
              <small className="text-muted">{subtitle}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default StatsCard;