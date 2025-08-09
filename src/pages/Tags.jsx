import '../styles/styles.css';

const TagsView = () => {

    const sampleEmails = [
        {
        id: "email_1",
        subject: "Team Meeting Tomorrow at 2 PM",
        sender: "manager@company.com",
        snippet: "Hi team, we have our weekly sync meeting tomorrow...",
        date: "2025-08-07T10:30:00Z",
        labels: ["INBOX", "Work"],
        read: false,
        auto_tags: ["Work", "Meeting"],
        },
        {
        id: "email_2",
        subject: "Your Amazon order has shipped",
        sender: "noreply@amazon.com",
        snippet: "Your recent order #123-4567890 has been shipped...",
        date: "2025-08-07T08:15:00Z",
        labels: ["INBOX", "Shopping"],
        read: true,
        auto_tags: ["Shopping", "Delivery"],
        },
        {
        id: "email_3",
        subject: "Flight Confirmation - New York to London",
        sender: "booking@airline.com",
        snippet: "Your flight booking is confirmed for August 15th...",
        date: "2025-08-06T16:45:00Z",
        labels: ["INBOX", "Travel"],
        read: false,
        auto_tags: ["Travel", "Flight"],
        },
        {
        id: "email_4",
        subject: "Monthly Invoice from Acme Corp",
        sender: "billing@acmecorp.com",
        snippet: "Your monthly subscription invoice is ready...",
        date: "2025-08-06T14:20:00Z",
        labels: ["INBOX", "Finance"],
        read: true,
        auto_tags: ["Finance", "Invoice"],
        },
        {
        id: "email_5",
        subject: "Birthday Party Invitation",
        sender: "friend@personal.com",
        snippet: "You're invited to my birthday celebration...",
        date: "2025-08-05T19:30:00Z",
        labels: ["INBOX", "Social"],
        read: false,
        auto_tags: ["Social", "Event"],
        },
        {
        id: "email_6",
        subject: "Project Status Update",
        sender: "developer@company.com",
        snippet: "Here's the weekly update on our project...",
        date: "2025-08-05T16:15:00Z",
        labels: ["INBOX", "Work"],
        read: true,
        auto_tags: ["Work", "Project"],
        },
        {
        id: "email_7",
        subject: "Hotel Booking Confirmation",
        sender: "reservations@hotel.com",
        snippet: "Your reservation has been confirmed...",
        date: "2025-08-04T11:45:00Z",
        labels: ["INBOX", "Travel"],
        read: false,
        auto_tags: ["Travel", "Booking"],
        },
        {
        id: "email_8",
        subject: "Bank Statement Available",
        sender: "noreply@bank.com",
        snippet: "Your monthly statement is now available...",
        date: "2025-08-04T09:30:00Z",
        labels: ["INBOX", "Finance"],
        read: true,
        auto_tags: ["Finance", "Statement"],
        },
        {
        id: "email_9",
        subject: "Urgent: System Maintenance Tonight",
        sender: "admin@company.com",
        snippet: "There will be scheduled maintenance...",
        date: "2025-08-03T17:00:00Z",
        labels: ["INBOX", "Work"],
        read: false,
        auto_tags: ["Work", "Urgent"],
        },
        {
        id: "email_10",
        subject: "Your Order Has Been Delivered",
        sender: "delivery@shop.com",
        snippet: "Your package has been successfully delivered...",
        date: "2025-08-03T13:20:00Z",
        labels: ["INBOX", "Shopping"],
        read: true,
        auto_tags: ["Shopping", "Delivery"],
        },
    ];
    const tagCategories = [
        { name: "Work", keywords: ["meeting", "project", "deadline", "report"], icon: "💼", count: 89, color: "#1FB8CD" },
        { name: "Shopping", keywords: ["order", "purchase", "delivery", "receipt"], icon: "🛍️", count: 34, color: "#FFC185" },
        { name: "Travel", keywords: ["flight", "hotel", "booking", "itinerary"], icon: "✈️", count: 12, color: "#B4413C" },
        { name: "Finance", keywords: ["invoice", "payment", "bank", "statement"], icon: "💰", count: 67, color: "#5D878F" },
        { name: "Social", keywords: ["event", "party", "invitation", "celebration"], icon: "🎉", count: 23, color: "#DB4545" }
    ];
    const recentTaggedEmails = sampleEmails.slice(0,5);
    return(
        <div id="tagsView" className="view">
            <div className="view-header">
            <h2>Smart Email Tags</h2>
            <p>Automatically categorize your emails with AI-powered tagging</p>
            </div>

            <div className="tags-content">
            <div className="tag-categories">
                <h3>Tag Categories</h3>
                <div className="category-grid" id="categoryGrid">
                    {tagCategories.map(category => (
                        <div className="category-card" key={category.name}>
                            <div className="category-icon" style={{ background: category.color }}>
                            {category.icon}
                            </div>
                            <div className="category-name">{category.name}</div>
                            <div className="category-count">{category.count} emails</div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="tagged-emails">
                <h3>Recently Tagged Emails</h3>
                <div className="tagged-email-list" id="taggedEmailList">
                {recentTaggedEmails.map((email,index) => (
                    <div className="tagged-email-item" key={index}>
                        <div className="tagged-email-info">
                            <div className="tagged-email-subject">{email.subject}</div>
                            <div className="tagged-email-sender">{email.sender}</div>
                        </div>
                        <div className="confidence-score">95% confidence</div>
                    </div>))}
                </div>
            </div>
            </div>
        </div>
    )
};

export default TagsView;
