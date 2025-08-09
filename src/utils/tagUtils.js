// function used to automatically apply tags to emails based on keywords
export const getAutoTags = (subject = "", snippet = "", sender = "") => {
  const content = `${subject} ${snippet} ${sender}`.toLowerCase();

  const tagKeywords = {
    Work: ["meeting", "project", "deadline", "work", "client", "report", "linkedin","naukri", "job"],
    Social: ["facebook", "instagram", "twitter", "friend request", "follow","gov", "government"],
    Shopping: ["order", "sale", "discount", "deal", "purchase", "cart", "amazon", "flipkart"],
    Travel: ["flight", "hotel", "booking", "reservation", "travel", "trip", "itinerary"],
    Finance: ["invoice", "payment", "salary", "bank", "transaction", "account", "credit card", "debit card","money", "CDSL", "NDSL", "sensex"]
  };

  const detectedTags = [];

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      detectedTags.push(tag);
    }
  }

  return detectedTags;
};
