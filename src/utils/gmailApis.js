import { getAutoTags } from "./tagUtils";
export const fetchEmailList = async (accessToken, pageToken = "") => {
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=20&labelIds=INBOX&pageToken=${pageToken}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch email list: ${res.statusText}`);
  return res.json();
};

export const fetchEmailDetails = async (accessToken, messageId) => {
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch email details: ${res.statusText}`);
  return res.json();
};

export const fetchEmails = async (accessToken, pageToken = "") => {
  const listData = await fetchEmailList(accessToken, pageToken);

  if (!listData.messages) {
    return {
      messages: [],
      nextPageToken: listData.nextPageToken || null,
    };
  }

  const messages = await Promise.all(
    listData.messages.map(async (msg) => {
      const msgData = await fetchEmailDetails(accessToken, msg.id);
      const headers = msgData.payload.headers.reduce((acc, h) => {
        acc[h.name] = h.value;
        return acc;
      }, {});

      return {
        id: msgData.id,
        subject: headers.Subject || "(No Subject)",
        sender: headers.From || "Unknown Sender",
        date: headers.Date || new Date().toISOString(),
        snippet: msgData.snippet || "",
        read: !msgData.labelIds?.includes("UNREAD"),
        labels: msgData.labelIds || [],
        auto_tags: getAutoTags(headers.Subject, msgData.snippet, headers.From),
      };
    })
  );

  return {
    messages,
    nextPageToken: listData.nextPageToken || null,
  };
};
