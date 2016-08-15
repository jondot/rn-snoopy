
import _ from 'lodash'
import Log from '../log'
const log = new Log()


export default (shape, output=false)=>events=>{
  const chain = events.filter(typeof shape == 'function' ? shape : _.matches(shape))
  return output ? chain.do(log.spy) : chain
}

