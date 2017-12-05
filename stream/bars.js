const normal = '▒';
const crazy = '▇';
export default (valuefn = ary => ary.length, threshold = 100, yellowbox = false) => events => events.do(
        infoAry => {
          const len = valuefn(infoAry);
          if (yellowbox && len >= threshold) {
            console.warn(`bars: event rate over threshold (${threshold}): ${len}`);
          }
          console.log('tick', (len >= threshold ?
            crazy
            : normal).repeat(Math.floor(Math.log(Math.max(len, 1)))) + `(${len})`);
        }
      );
