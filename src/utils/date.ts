import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

const standardTime = (time: number) => {
    if(time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}

const toDateStandard = (date: DateValue) => {
    const year = date.year;
    const month = standardTime(date.month);
    const day = standardTime(date.day);

    const hour = "hour" in date ? date.hour : 0;
    const minute = "minute" in date ? date.minute : 0;
    const second = "second" in date ? date.second : 0;
    
    const result = `${year}-${month}-${day} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;
    return result;
};

const toInputDate = (date: string) => {
    const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
    return formattedDate;
};

const convertTime = (isoDate: string) => {
    const dataObject = new Date(isoDate);

    const date = dataObject.toLocaleString("id-ID", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
    });
    return `${date} WIB`;
}

export { toDateStandard, toInputDate, convertTime };