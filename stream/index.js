import Rx from 'rxjs'
import { spy as log } from '../log'


// new RN
//import EventEmitter from 'react-native/Libraries/EventEmitter/EventEmitter'

// old RN
//import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'

class Stream {
  constructor(emitter){
    this.events = Rx.Observable.fromEvent(emitter, 'mqspy')
    this.spy = (info)=>emitter.emit('mqspy', info)
  }
}

export default Stream

