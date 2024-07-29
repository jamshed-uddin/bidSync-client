const calculateTime = (rawDate) => {
  const now = new Date();
  const date = new Date(rawDate);
  const diffInMs = now - date;
  const diffInHours = diffInMs / (1000 * 60 * 60);

  const sameDay = now.toDateString() === date.toDateString();
  const sameYear = now.getFullYear() === date.getFullYear();

  if (sameDay && diffInHours < 24) {
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes + 1}m ago`;
    }
    return `${Math.floor(diffInHours)}h ago`;
  }

  const options = sameYear
    ? {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }
    : { month: "long", day: "numeric", year: "numeric" };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export default calculateTime;
