import {stringify} from './formatting'

class Log{
  constructor(logger=console){
    this.spy = (info)=>logger.log(stringify(info))
  }
}

export default Log
