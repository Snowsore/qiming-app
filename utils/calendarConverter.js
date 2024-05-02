import calendarConverter from 'js-calendar-converter';

const getChineseZodiacHour = (hour) => {
	// 十二地支
	const zodiacs = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
	// 计算地支索引，每2小时一个地支
	const index = Math.floor((hour + 1) / 2) % 12;
	return zodiacs[index];
};

const create = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dl = calendarConverter.solar2lunar(year, month, day);

	return {
		calendarConverter: dl,
		solarString: `公(阳)历 ${dl.cYear}年${dl.cMonth}月${dl.cDay}日 ${date.getHours()}时`,
		lunarString: `农(阴)历 ${dl.cYear}年 ${dl.IMonthCn}${dl.IDayCn} ${getChineseZodiacHour(date.getHours())}时`
	};
};

export default {
	create
};
