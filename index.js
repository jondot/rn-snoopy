import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue'
import Stream from './stream'
import Log from './log'

export default class Snoopy{
  static TO_JS = 0
  static TO_NATIVE = 1

  static log(){
    const log = new Log()
    this.snoop(log)
  }

  static stream(emitter){
    const stream = new Stream(emitter)
    this.snoop(stream)
    return stream.events
  }

  static snoop(tracer){
    const spy = tracer.spy
    MessageQueue.spy(spy)
    return tracer
  }

  static clear(){
    MessageQueue.spy()
  }
}

