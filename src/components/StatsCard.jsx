import './StatsCard.css';

const StatsCard = ({ icon, label, value, color, delay = 0 }) => {
  return (
    <div className="stats-card glass-card" style={{ animationDelay: `${delay}s`, '--card-accent': color }}>
      <div className="stats-icon" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <div className="stats-info">
        <span className="stats-value">{value}</span>
        <span className="stats-label">{label}</span>
      </div>
    </div>
  );
};

export default StatsCard;
