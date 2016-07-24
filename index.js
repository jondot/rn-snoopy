import MessageQueue from 'react-native/Libraries/Utilities/MessageQueue'
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
    const nativeCall = this.nativeCall ||  MessageQueue.prototype.__nativeCall
    const spy = tracer.spy
    const native = this.TO_NATIVE
    const js = this.TO_JS
    MessageQueue.prototype.__nativeCall = function(module, method, params, onFail, onSucc){
      nativeCall.apply(this, arguments)
      const info = { type: native, module: this._remoteModuleTable[module], method: this._remoteMethodTable[module][method], args: params }
      spy(info)
    }
    this.nativeCall = nativeCall

    const callFunction = this.callFunction || MessageQueue.prototype.__callFunction
    MessageQueue.prototype.__callFunction = function(module, method, params, onFail, onSucc){
      const info = { type: js, module, method, args:params}
      spy(info)
      callFunction.apply(this, arguments)
    }
    this.callFunction = callFunction

    const invokeCallback = this.invokeCallback || MessageQueue.prototype.__invokeCallback
    MessageQueue.prototype.__invokeCallback = function(cbID, args){
      const callback = this._callbacks[cbID];
      if(callback){
        const debug = this._debugInfo[cbID >> 1];
        const module = debug && this._remoteModuleTable[debug[0]];
        const method = debug && this._remoteMethodTable[debug[0]][debug[1]];
        const profileName = debug ? '<callback for ' + module + '.' + method + '>' : cbID;
        const info = { type: js, module:null, method:profileName, args }
        spy(info)
      }
      invokeCallback.apply(this, arguments)
    }
    this.invokeCallback = invokeCallback

    this.snooping = true

    return tracer
  }

  static clear(){
    this.snoop(()=>{})
  }
}

