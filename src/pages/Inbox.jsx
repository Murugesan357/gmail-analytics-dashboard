import { useState, useEffect } from "react";
import "../styles/styles.css";
import { useUser } from "../context/useContext";
import { fetchEmails } from "../utils/gmailApis"; 

const InboxView = () => {
  const { user } = useUser();
  const [emailList, setEmailList] = useState([]);
  const [labelFilter, setLabelFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevTokens, setPrevTokens] = useState([]);
  const [currentToken, setCurrentToken] = useState("");

  const loadEmails = async (pageToken = "") => {
    try {
      setLoading(true);
      if (!user?.accessToken) {
        console.error("No access token found. Please log in again.");
        return;
      }

      const {messages, nextPageToken} = await fetchEmails(user?.accessToken, pageToken)

      setEmailList(messages);
      setFilteredEmails(messages);
      setNextPageToken(nextPageToken);
      setCurrentToken(pageToken);

      if (pageToken && !prevTokens.includes(pageToken)) {
        setPrevTokens((prev) => [...prev, pageToken]);
      }
    } catch (err) {
      console.error("Error fetching emails:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.accessToken) {
      loadEmails();
    }
  }, [user]); 

  useEffect(() => {
    const filtered = emailList.filter((email) => {
      const matchesLabel = !labelFilter || email.labels.includes(labelFilter) || email.auto_tags.includes(labelFilter);
      const matchesSearch =
        !searchQuery ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.snippet.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLabel && matchesSearch;
    });
    setFilteredEmails(filtered);
  }, [labelFilter, searchQuery, emailList]);

  const handleEmailClick = (id) => {
    setEmailList((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, read: !email.read } : email
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const getTagColor = (tag) => {
    const tagColors = {
      Work: "var(--color-bg-1)",
      Meeting: "var(--color-bg-2)",
      Shopping: "var(--color-bg-3)",
      Delivery: "var(--color-bg-4)",
      Travel: "var(--color-bg-5)",
      Flight: "var(--color-bg-6)",
      Finance: "var(--color-bg-7)",
      Invoice: "var(--color-bg-8)",
      Social: "var(--color-bg-2)",
      Event: "var(--color-bg-3)",
      Project: "var(--color-bg-4)",
      Booking: "var(--color-bg-5)",
      Statement: "var(--color-bg-6)",
      Urgent: "var(--color-bg-4)",
    };
    return tagColors[tag] || "var(--color-bg-1)";
  };

  return (
    <div id="inboxView" className="view">
      <div className="view-header">
        <h2>Email Inbox</h2>
        <div className="inbox-controls">
          <div className="filters">
            <select
              className="form-control"
              value={labelFilter}
              onChange={(e) => setLabelFilter(e.target.value)}
            >
              <option value="">All Labels</option>
              <option value="INBOX">Inbox</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Finance">Finance</option>
              <option value="Social">Social</option>
            </select>
          </div>
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading emails...</p>
      ) : (
        <>
          <div className="email-list" id="emailList">
            {filteredEmails.map((email) => (
              <div
                className={`email-item ${email.read ? "" : "unread"}`}
                data-email-id={email.id}
                key={email.id}
                onClick={() => handleEmailClick(email.id)}
              >
                <input
                  type="checkbox"
                  className="email-checkbox"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="email-content">
                  <div className="email-header">
                    <span className="email-sender">{email.sender}</span>
                    <span className="email-date">{formatDate(email.date)}</span>
                  </div>
                  <div className="email-subject">{email.subject}</div>
                  <div className="email-snippet">{email.snippet}</div>
                  <div className="email-tags">
                    {email.auto_tags.map((tag) => (
                      <span
                        className="email-tag"
                        style={{ background: getTagColor(tag) }}
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => {
                const prevToken = prevTokens[prevTokens.length - 2] || "";
                setPrevTokens((tokens) => tokens.slice(0, -1));
                loadEmails(prevToken);
              }}
              disabled={prevTokens.length <= 0}
            >
              Previous
            </button>

            <button
              onClick={() => loadEmails(nextPageToken)}
              disabled={!nextPageToken}
              style={{ marginLeft: "10px" }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InboxView;
