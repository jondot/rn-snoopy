
const stringify = (info)=>`${info.type == '0' ? 'N->JS' : 'JS->N'} : ${info.module ? (info.module+'.') : ''}${info.method}(${JSON.stringify(info.args)}) *`

export { stringify }
