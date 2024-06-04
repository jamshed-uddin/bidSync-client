function calculateDays(futureDate, onlyDays = false) {
  const currentDate = new Date();
  const targetDate = new Date(futureDate);

  // Calculate the difference in milliseconds
  const difference = targetDate - currentDate;

  // Calculate time components
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  if (onlyDays) {
    return `${days} days left`;
  }

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;

  //   return {
  //     days,
  //     hours,
  //     minutes,
  //     seconds,
  //   };
}

export default calculateDays;
