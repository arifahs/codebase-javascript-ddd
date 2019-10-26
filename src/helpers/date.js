const momentTimezone = require('moment-timezone');

const generateTime = () => {
  const now = momentTimezone(new Date());

  const nowJkt = now.tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return nowJkt;
};

module.exports = {
  generateTime,
};
