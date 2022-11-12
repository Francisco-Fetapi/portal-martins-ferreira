import ptLocale from "date-fns/locale/pt";
import { formatDistance } from "date-fns";

export default function dateDistance(date: Date) {
  const distance = formatDistance(new Date(), date, {
    locale: ptLocale,
  });
  return `há ${distance}`;
}
