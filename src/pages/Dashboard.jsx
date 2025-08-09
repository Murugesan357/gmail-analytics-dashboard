import { useEffect, useState, useRef } from "react";
import { useUser } from "../context/useContext";
import Chart from "chart.js/auto";
import MetricCard from "../components/Metricscard";
import ChartContainer from "../components/ChartContainer";
import "../styles/styles.css";

const DashboardView = () => {
  const { user } = useUser();

  const [totalEmails, setTotalEmails] = useState(0);
  const [unreadEmails, setUnreadEmails] = useState(0);
  const [spamTotal, setSpamTotal] = useState(0);
  const [spamUnread, setSpamUnread] = useState(0);

  // Chart refs to store instances
  const emailVolumeChartRef = useRef(null);
  const topSendersChartRef = useRef(null);
  const labelDistributionChartRef = useRef(null);

  useEffect(() => {
    if (user?.accessToken) {
      fetchEmailCounts(user.accessToken);
    }
  }, [user]);

  const fetchEmailCounts = async (token) => {
    try {
      const messagesRes = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q=in:anywhere",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const messagesData = await messagesRes.json();
      setTotalEmails(messagesData.resultSizeEstimate || 0);

      const getLabelInfo = async (labelId) => {
        const res = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/labels/${labelId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch label " + labelId);
        return res.json();
      };

      const inboxLabel = await getLabelInfo("INBOX");
      const spamLabel = await getLabelInfo("SPAM");

      setUnreadEmails(inboxLabel.messagesUnread || 0);
      setSpamTotal(spamLabel.messagesTotal || 0);
      setSpamUnread(spamLabel.messagesUnread || 0);
    } catch (error) {
      console.error("Error fetching Gmail counts:", error);
    }
  };

  useEffect(() => {
    initializeCharts();
    return () => destroyCharts();
  }, []);

  const destroyCharts = () => {
    emailVolumeChartRef.current?.destroy();
    topSendersChartRef.current?.destroy();
    labelDistributionChartRef.current?.destroy();
  };

  const initializeCharts = () => {
    destroyCharts();

    const analyticsData = {
      daily_email_volume: [
        { date: "2025-08-01", count: 45 },
        { date: "2025-08-02", count: 52 },
        { date: "2025-08-03", count: 38 },
        { date: "2025-08-04", count: 41 },
        { date: "2025-08-05", count: 67 },
        { date: "2025-08-06", count: 55 },
        { date: "2025-08-07", count: 23 },
      ],
      top_senders: [
        { sender: "noreply@github.com", count: 45 },
        { sender: "notifications@slack.com", count: 32 },
        { sender: "manager@company.com", count: 28 },
        { sender: "noreply@amazon.com", count: 19 },
        { sender: "calendar@google.com", count: 15 },
      ],
      label_distribution: [
        { label: "INBOX", count: 156, percentage: 62.4 },
        { label: "Work", count: 89, percentage: 35.6 },
        { label: "Shopping", count: 34, percentage: 13.6 },
        { label: "Travel", count: 12, percentage: 4.8 },
        { label: "SPAM", count: 8, percentage: 3.2 },
      ],
    };

    // Email Volume Chart
    const emailVolumeCtx = document.getElementById("emailVolumeChart");
    if (emailVolumeCtx) {
      emailVolumeChartRef.current = new Chart(emailVolumeCtx, {
        type: "line",
        data: {
          labels: analyticsData.daily_email_volume.map((d) => {
            const date = new Date(d.date);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }),
          datasets: [
            {
              label: "Emails per Day",
              data: analyticsData.daily_email_volume.map((d) => d.count),
              borderColor: "#1FB8CD",
              backgroundColor: "rgba(31, 184, 205, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      });
    }

    // Top Senders Chart
    const topSendersCtx = document.getElementById("topSendersChart");
    if (topSendersCtx) {
      topSendersChartRef.current = new Chart(topSendersCtx, {
        type: "bar",
        data: {
          labels: analyticsData.top_senders.map((s) => s.sender.split("@")[0]),
          datasets: [
            {
              label: "Email Count",
              data: analyticsData.top_senders.map((s) => s.count),
              backgroundColor: [
                "#1FB8CD",
                "#FFC185",
                "#B4413C",
                "#5D878F",
                "#DB4545",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
              grid: { color: "rgba(0, 0, 0, 0.1)" },
            },
            y: {
              grid: { display: false },
            },
          },
          plugins: { legend: { display: false } },
        },
      });
    }

    // Label Distribution Chart
    const labelDistributionCtx = document.getElementById("labelDistributionChart");
    if (labelDistributionCtx) {
      labelDistributionChartRef.current = new Chart(labelDistributionCtx, {
        type: "pie",
        data: {
          labels: analyticsData.label_distribution.map((l) => l.label),
          datasets: [
            {
              data: analyticsData.label_distribution.map((l) => l.count),
              backgroundColor: [
                "#1FB8CD",
                "#FFC185",
                "#B4413C",
                "#5D878F",
                "#DB4545",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom" } },
        },
      });
    }
  };

  return (
    <div id="dashboardView" className="view">
      <div className="view-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome to your Gmail analytics dashboard</p>
      </div>

      <div className="metrics-grid">
        <MetricCard
          bgColorVar="--color-bg-1"
          iconPath="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          value={totalEmails.toLocaleString()}
          label="Total Emails"
        />
        <MetricCard
          bgColorVar="--color-bg-2"
          iconPath="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          value={unreadEmails.toLocaleString()}
          label="Unread Emails"
        />
        <MetricCard
          bgColorVar="--color-bg-3"
          iconPath="M7 2 L17 2 L22 7 L22 17 L17 22 L7 22 L2 17 L2 7 Z"
          value={spamTotal.toLocaleString()}
          label="Spam Emails"
          icon2="M12 6 H14 V14 H12 Z M12 17 H14 V18 H12 Z"
        />
        <MetricCard
          bgColorVar="--color-bg-4"
          iconPath="M 22 12 A 10 10 0 1 1 2 12 A 10 10 0 1 1 22 12 Z"
          value={spamUnread.toLocaleString()}
          label="Unread Spam"
          icon2="M12 6 H14 V14 H12 Z M12 17 H14 V18 H12 Z"
        />
      </div>

      <div className="charts-section">
        <ChartContainer
          title="Email Volume Over Time"
          canvasId="emailVolumeChart"
          height={300}
        />
      </div>
      <div className="charts-row">
        <ChartContainer title="Top Senders" canvasId="topSendersChart" />
        <ChartContainer title="Label Distribution" canvasId="labelDistributionChart" />
      </div>
    </div>
  );
};

export default DashboardView;
