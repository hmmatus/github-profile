import { formatDistanceToNow, parseISO } from "date-fns";

export function formatRelativeDate(updatedDate: string) {
  const parsedDate = parseISO(updatedDate);
  const formattedDistance = formatDistanceToNow(parsedDate);
  return `Updated ${formattedDistance} ago`;
}