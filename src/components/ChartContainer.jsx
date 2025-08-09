
const ChartContainer = ({ title, canvasId, height = 250 }) => (
  <div className="chart-container">
    <h3>{title}</h3>
    <div style={{ position: "relative", height: `${height}px` }}>
      <canvas id={canvasId}></canvas>
    </div>
  </div>
);

export default ChartContainer;
