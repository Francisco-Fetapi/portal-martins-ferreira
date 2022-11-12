import ptLocale from "date-fns/locale/pt";
import { formatDistance } from "date-fns";

export default function dateDistance(date: Date) {
  try {
    const distance = formatDistance(new Date(), date, {
      locale: ptLocale,
    });
    return `há ${distance}`;
  } catch (e: any) {
    return "";
  }
}
