import '../styles/styles.css'
const MetricCard = ({ bgColorVar, iconPath, value, label, icon2 }) => (
  <div className="metric-card">
    <div className="metric-icon" style={{ background: `var(${bgColorVar})` }}>
      <svg width="24" height="24"  viewBox="0 0 24 24">
        <path d={iconPath} fill="currentColor"/>
        {icon2 && <path d={icon2} fill="white" />}
      </svg>
    </div>
    <div className="metric-content">
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  </div>
);

export default MetricCard;
