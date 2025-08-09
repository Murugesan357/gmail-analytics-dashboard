import '../styles/styles.css';
const AnalyticsView = () => (
  <div id="analyticsView" className="view">
    <div className="view-header">
      <h2>Detailed Analytics</h2>
      <p>Deep insights into your email patterns and behavior</p>
    </div>

    <div className="analytics-content">
      <div className="analytics-row">
        <div className="analytics-card">
          <h3>Email Activity Patterns</h3>
          <div className="activity-grid">
            <div className="activity-item"><span className="activity-label">Peak Hour</span><span className="activity-value">10:00 AM</span></div>
            <div className="activity-item"><span className="activity-label">Busiest Day</span><span className="activity-value">Monday</span></div>
            <div className="activity-item"><span className="activity-label">Read Rate</span><span className="activity-value">87.5%</span></div>
            <div className="activity-item"><span className="activity-label">Important Emails</span><span className="activity-value">34</span></div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Top Keywords</h3>
          <div className="keyword-cloud">
                <span class="keyword large">meeting</span>
                <span class="keyword medium">project</span>
                <span class="keyword medium">order</span>
                <span class="keyword small">flight</span>
                <span class="keyword small">deadline</span>
                <span class="keyword medium">invoice</span>
                <span class="keyword small">booking</span>
                <span class="keyword large">work</span>

          </div>
        </div>
      </div>

      <div className="chart-container">
        <h3>Email Analytics Overview</h3>
        <img
          src="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/b791378a607a98c62b42863c6bc6b28c/6d4131dd-0626-4c5e-afd4-85b6b292d94e/359e6682.png"
          alt="Email Analytics Dashboard"
          className="analytics-chart-image"
        />
      </div>
    </div>
  </div>
);

export default AnalyticsView;
