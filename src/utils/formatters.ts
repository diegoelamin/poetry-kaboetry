export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export function formatScore(score: number) {
  return `${Math.round(score)}%`;
}

export function formatDate(date: Date | string | number) {
  return new Date(date).toLocaleDateString();
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}