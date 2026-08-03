const MS_IN_HOUR = 60 * 60 * 1000; // винесла в константу, бо покращує читабельність і зрозумілість коду

class DateProcessor {
  constructor(date) {
    this.date = new Date(date);
  }

  processDateComplex(
    inputDate,
    includeTime = false,
    extraOffset = 0,
    config = {},
  ) {
    let date = new Date(inputDate);
    if (isNaN(date)) {
      throw new Error('Invalid date');
    }

    const offset = config.offsetHours || 0;
    const format = config.format || 'ISO';

    let resultDate = new Date(
      date.getTime() + (offset + extraOffset) * MS_IN_HOUR,
    );

    if (includeTime) {
      return `${resultDate.toLocaleDateString()} ${resultDate.toLocaleTimeString()}`;
    }

    if (format === 'ISO') {
      return resultDate.toISOString();
    } else if (format === 'UTC') {
      return resultDate.toUTCString();
    } else if (format === 'LOCAL') {
      return resultDate.toLocaleString();
    } else {
      return resultDate.toString();
    }
  }

  formatDateShort() {
    const d = this.date;
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatDateLong() {
    const d = this.date;
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day} - ${month} - ${year}`;
  }

  capitalizeDateString(str) {
    if (typeof str !== 'string') return '';
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  isWeekend() {
    const day = this.date.getDay();
    return day === 0 || day === 6;
  }
}

// For s = "Look at this example of a correct text", l = 5 and r = 15,

// the output should be true.

// We can replace 13th and 26th characters with '\n', and obtain the following multiline text of width 12:

// Look at this
// example of a
// correct text

function beautifulText(s, l, r) {
  const spaces = [];

  s.split('').forEach((char, index) => {
    if (char === ' ') spaces.push(index);
  });

  for (const spaceIndex of spaces) {
    const width = spaceIndex;

    if (width < l || width > r) continue;

    let valid = true;

    for (let i = width; i < s.length - 1; i += width + 1) {
      if (s[i] !== ' ') {
        valid = false;
        break;
      }
    }

    if (valid && (s.length + 1) % (width + 1) === 0) {
      return true;
    }
  }

  return false;
}

console.log(beautifulText('Look at this example of a correct text', 5, 15));
