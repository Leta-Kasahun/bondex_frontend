const toDate = (value: Date | string | number): Date => {
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) {
		throw new Error("Invalid date value");
	}
	return date;
};

export const formatDate = (
	value: Date | string | number,
	locale = "en-US",
	options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "2-digit" }
): string => {
	return new Intl.DateTimeFormat(locale, options).format(toDate(value));
};

export const formatDateTime = (
	value: Date | string | number,
	locale = "en-US",
	options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}
): string => {
	return new Intl.DateTimeFormat(locale, options).format(toDate(value));
};

export const formatRelativeTime = (
	value: Date | string | number,
	baseDate: Date = new Date(),
	locale = "en"
): string => {
	const target = toDate(value).getTime();
	const diffSeconds = Math.round((target - baseDate.getTime()) / 1000);
	const abs = Math.abs(diffSeconds);
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

	if (abs < 60) return rtf.format(diffSeconds, "second");
	if (abs < 3600) return rtf.format(Math.round(diffSeconds / 60), "minute");
	if (abs < 86400) return rtf.format(Math.round(diffSeconds / 3600), "hour");
	if (abs < 604800) return rtf.format(Math.round(diffSeconds / 86400), "day");
	if (abs < 2592000) return rtf.format(Math.round(diffSeconds / 604800), "week");
	if (abs < 31536000) return rtf.format(Math.round(diffSeconds / 2592000), "month");
	return rtf.format(Math.round(diffSeconds / 31536000), "year");
};
