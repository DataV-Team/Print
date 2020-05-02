const print = {
  log(info: string): void {
    console.log(info)
  },
  warn(info: string): void {
    console.log('\x1b[31;33m' + info + '\x1b[0m')
  },
  error(info: string): void {
    console.log('\x1b[31;40m' + info + '\x1b[0m')
  },
  tip(info: string): void {
    console.log('\x1b[40;32m' + info + '\x1b[0m')
  },
  success(info: string): void {
    console.log('\x1b[42;30m' + info + '\x1b[0m')
  },
  yellow(info: string): void {
    console.log('\x1b[31;33m' + info + '\x1b[0m')
  },
}

export default print
