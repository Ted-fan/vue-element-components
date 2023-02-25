// 计算两个日期相差多少天
export function getDaysBetween(startDate, endDate) {
  const sDate = Date.parse(startDate)
  const eDate = Date.parse(endDate)
  const days = (eDate - sDate) / (1 * 24 * 60 * 60 * 1000)
  return days
}

// 格式化日期
export function dateFormat(date, sFormat = 'yyyy-MM-dd') {
  const time = {
    Year: 0,
    TYear: '0',
    Month: 0,
    TMonth: '0',
    Day: 0,
    TDay: '0',
    Hour: 0,
    THour: '0',
    hour: 0,
    Thour: '0',
    Minute: 0,
    TMinute: '0',
    Second: 0,
    TSecond: '0',
    Millisecond: 0
  }
  time.Year = date.getFullYear()
  time.TYear = String(time.Year).substr(2)
  time.Month = date.getMonth() + 1
  time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month)
  time.Day = date.getDate()
  time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day)
  time.Hour = date.getHours()
  time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour)
  time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12
  time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour)
  time.Minute = date.getMinutes()
  time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute)
  time.Second = date.getSeconds()
  time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second)
  time.Millisecond = date.getMilliseconds()

  return sFormat
    .replace(/yyyy/gi, String(time.Year))
    .replace(/yyy/gi, String(time.Year))
    .replace(/yy/gi, time.TYear)
    .replace(/y/gi, time.TYear)
    .replace(/MM/g, time.TMonth)
    .replace(/M/g, String(time.Month))
    .replace(/dd/gi, time.TDay)
    .replace(/d/gi, String(time.Day))
    .replace(/HH/g, time.THour)
    .replace(/H/g, String(time.Hour))
    .replace(/hh/g, time.Thour)
    .replace(/h/g, String(time.hour))
    .replace(/mm/g, time.TMinute)
    .replace(/m/g, String(time.Minute))
    .replace(/ss/gi, time.TSecond)
    .replace(/s/gi, String(time.Second))
    .replace(/fff/gi, String(time.Millisecond))
}

// 转化显示时间(时区)
// dateString: 2020-02-04T13:24:44.000+0000
// localToServer local date time --> server date time e.g gmt(8) -- gmt(0)
// serverToLocal server date time --> local date time e.g gmt(0) -- gmt(8)
export function formatDateDisplay(dateString, sFormat = 'yyyy-MM-dd', type = 'serverToLocal', addTimezone = true) {
  if (dateString) {
    const date = new Date(dateString) // 传进来日期字符串
    let addHours = new Date().getTimezoneOffset() / 60 // 时区所要的加减的时间
    if (type === 'serverToLocal') {
      addHours = 0 - addHours
    }
    if (!addTimezone) {
      addHours = 0
    }
    const dateTimezone = new Date(date.getTime() + addHours * 3600 * 1000) // 转化带时区时间
    return dateFormat(dateTimezone, sFormat)
  } else {
    return dateString
  }
}

// 获取当前切换日期所在月份的总天数
export function getMonthDays(year, month) {
  const monthAry = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year % 400 === 0) {
    monthAry[1] = 29
  } else {
    if (year % 4 === 0 && year % 100 !== 0) {
      monthAry[1] = 29
    }
  }
  return monthAry[month]
}

// 获取今日所在周/月的起止时间
export function getMonthAndWeekSection(type) {
  const today = new Date()
  // 获取当月起止时间
  if (type === 'month') {
    const totalDays = this.getMonthDays(today.getFullYear(), today.getMonth())
    const monthSection = {
      'startDate': today.getFullYear() + '-' + this.FormatDateZero(today.getMonth() + 1) + '-01',
      'endDate': today.getFullYear() + '-' + this.FormatDateZero(today.getMonth() + 1) + '-' + totalDays
    }
    return monthSection
  }
  // 获取本周起止时间
  if (type === 'week') {
    // 上周日距离今天的天数
    let stepSunDay = -(today.getDay()) + 1
    // 如果今天是周日
    if (today.getDay() === 0) {
      stepSunDay = -7
    }
    // 周一距离今天的天数（负数表示）
    const stepMonday = 7 - today.getDay()
    const time = today.getTime()
    const monday = new Date(time + stepSunDay * 24 * 3600 * 1000)
    const sunday = new Date(time + stepMonday * 24 * 3600 * 1000)
    const weekSection = {
      'startDate': this.DateFormat(monday),
      'endDate': this.DateFormat(sunday)
    }
    return weekSection
  }
}

// 获取某年月份最后一天
export function getMonthLastDay(year, month) {
  return new Date(year, month, 0).getDate()
}

/*
*  获取上一个月
*  @date 格式为yyyy-mm-dd的日期，如：2014-01-25
*/
export function getPreviousMonth(date, showDate = false) {
  const arr = date.split('-')
  const year = arr[0] // 获取当前日期的年份
  const month = arr[1] // 获取当前日期的月份
  const day = arr[2] // 获取当前日期的日
  let year2 = year
  let month2 = parseInt(month, 10) - 1
  if (month2 === 0) {
    year2 = parseInt(year2, 10) - 1
    month2 = 12
  }
  let day2 = day
  const days2 = new Date(year2, month2, 0).getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }

  let t2 = year2 + '-' + month2 + '-' + day2
  if (showDate === false) {
    t2 = year2 + '-' + month2
  }
  return t2
}

/*
 * 获取下一个月
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
export function getNextMonth(date, showDate = false) {
  const arr = date.split('-')
  const year = arr[0] // 获取当前日期的年份
  const month = arr[1] // 获取当前日期的月份
  const day = arr[2] // 获取当前日期的日
  // let days = new Date(year, month, 0);
  // days = days.getDate(); //获取当前日期中的月的天数
  let year2 = year
  let month2 = parseInt(month, 10) + 1
  if (month2 === 13) {
    year2 = parseInt(year2, 10) + 1
    month2 = 1
  }
  let day2 = day
  const days2 = new Date(year2, month2, 0).getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }

  let t2 = year2 + '-' + month2 + '-' + day2
  if (showDate === false) {
    t2 = year2 + '-' + month2
  }
  return t2
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}
