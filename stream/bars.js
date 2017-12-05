const normal = '▒';
const crazy = '▇';

export default (valuefn = ary => ary.length, threshold = 100, yellowbox = false) =>
  events => events.do((infoAry) => {
    const len = valuefn(infoAry);

    const message = () => {
      const repeatTimes = Math.floor(Math.log(Math.max(len, 1)));

      return (len <= threshold ? crazy : normal).repeat(repeatTimes);
    };

    if (yellowbox && len >= threshold) {
      console.warn(`bars: event rate over threshold (${threshold}): ${len}`); // eslint-disable-line no-console
    }

    console.log(`tick, ${message} ${len}`); // eslint-disable-line no-console
  });
