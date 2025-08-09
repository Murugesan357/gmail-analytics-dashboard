import { fetchEmailList, fetchEmailDetails } from "./gmailApis";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Helper: format date as YYYY/MM/DD (for Gmail query)
const formatQueryDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
};

// Fetch all messages matching the query, handling pagination
const fetchAllMessages = async (accessToken, query) => {
  let allMessages = [];
  let pageToken = "";
  while (true) {
    const url = new URL(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages`
    );
    url.searchParams.append("maxResults", "100");
    url.searchParams.append("q", query);
    if (pageToken) url.searchParams.append("pageToken", pageToken);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok)
      throw new Error(`Failed to fetch messages: ${res.statusText}`);

    const data = await res.json();
    if (data.messages) {
      allMessages = allMessages.concat(data.messages);
    }
    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }
  return allMessages;
};

// Main util function: fetch last 5 days email counts
export const fetchLast5DaysEmailCounts = async (accessToken) => {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + MS_PER_DAY);
  const fiveDaysAgo = new Date(now.getTime() - 4 * MS_PER_DAY);

  const query = `after:${formatQueryDate(fiveDaysAgo)} before:${formatQueryDate(
    tomorrow
  )}`;

  const messages = await fetchAllMessages(accessToken, query);

  const detailedMessages = await Promise.all(
    messages.map(async (msg) => {
      const detail = await fetchEmailDetails(accessToken, msg.id);
      return detail;
    })
  );

  // Count emails per day
  const counts = detailedMessages.reduce((acc, msg) => {
    const date = new Date(Number(msg.internalDate));
    const dayStr = date.toISOString().slice(0, 10);
    acc[dayStr] = (acc[dayStr] || 0) + 1;
    return acc;
  }, {});

  for (let i = 0; i < 5; i++) {
    const day = new Date(now.getTime() - i * MS_PER_DAY);
    const dayStr = day.toISOString().slice(0, 10);
    if (!(dayStr in counts)) counts[dayStr] = 0;
  }

  const sortedCounts = Object.keys(counts)
    .sort()
    .reduce((obj, key) => {
      obj[key] = counts[key];
      return obj;
    }, {});

  return sortedCounts;
};
