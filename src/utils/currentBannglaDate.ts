import { toBengaliNumber } from "@/lib/utils";
import { format } from "date-fns";

export const currentBanglaDate = () => {
  const today = new Date();
  const formattedDate = format(today, 'dd/MM/yyyy');
  const bengaliDate = toBengaliNumber(formattedDate);
  return bengaliDate;
};

