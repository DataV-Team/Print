const print = {
  log(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log(info)
  },
  warn(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log('\x1b[31;33m' + info + '\x1b[0m')
  },
  error(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log('\x1b[31;40m' + info + '\x1b[0m')
  },
  success(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log('\x1b[42;30m' + info + '\x1b[0m')
  },
  tip(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log('\x1b[40;32m' + info + '\x1b[0m')
  },
  red(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log('\x1b[31m' + info + '\x1b[39m')
  },
  green(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log('\x1b[32m' + info + '\x1b[39m')
  },
  white(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log('\x1b[37m' + info + '\x1b[39m')
  },
  yellow(info: string, clear?: boolean): void {
    if (clear) print.clear()

    console.log('\x1b[31;33m' + info + '\x1b[0m')
  },
  clear(): void {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H')
  },
}

export default print
