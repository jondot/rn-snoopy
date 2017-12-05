import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/bufferTime';

class Stream {
  constructor(emitter) {
    this.events = Observable.fromEvent(emitter, 'mqspy');
    this.spy = info => emitter.emit('mqspy', info);
  }
}

export default Stream;
