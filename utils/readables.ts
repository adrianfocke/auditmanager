export const readableFileNameFromEntity = (path: string) => {
  const match = path.match(/([^\/]+)\.[^.]+$/);
  return match ? match[1] : path;
};

export const readableDateFromDatetime = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
