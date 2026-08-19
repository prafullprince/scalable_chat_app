export function formatMessageDate(createdAt: Date) {
  const date = new Date(createdAt);
  const now = new Date();

  const isSameDay = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  // Today
  if (isSameDay(date, now)) {
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, yesterday)) {
    return `Yesterday, ${date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  // Difference in days
  const difference =
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  // Last 7 days
  if (difference < 7) {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
    });
  }

  // Weeks
  if (difference < 30) {
    const weeks = Math.floor(difference / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  // Months
  if (difference < 365) {
    const months = Math.floor(difference / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  // Years
  const years = Math.floor(difference / 365);

  return `${years} ${years === 1 ? "year" : "years"} ago`;
}
