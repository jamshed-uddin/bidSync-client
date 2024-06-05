function calculateDays(futureDate, onlyDays = false) {
  const currentDate = new Date();
  const targetDate = new Date(futureDate);

  const difference = targetDate - currentDate;
  if (difference <= 0) {
    return `Auction closed`;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  if (onlyDays) {
    return `${days} days left`;
  }

  return `${days}d ${hours}h ${minutes}m ${seconds}s `;
}

export default calculateDays;
