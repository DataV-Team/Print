const { pow } = Math

export function add (numOne, numTwo) {
  let mathExtend = 0

  try { mathExtend += numOne.toString().split('.')[1].length } catch (e) {}
  try { mathExtend += numTwo.toString().split('.')[1].length } catch (e) {}

  mathExtend = pow(10, mathExtend)

  return (numOne * mathExtend + numTwo * mathExtend) / mathExtend
}

export function sub (numOne, numTwo) {
  let mathExtend = 0

  try { mathExtend += numOne.toString().split('.')[1].length } catch (e) {}
  try { mathExtend += numTwo.toString().split('.')[1].length } catch (e) {}

  mathExtend = pow(10, mathExtend)

  return (numOne * mathExtend - numTwo * mathExtend) / mathExtend
}

export function mul (numOne, numTwo) {
  numOne = numOne.toString()
  numTwo = numTwo.toString()

  let mathExtend = 0

  try { mathExtend += numOne.split('.')[1].length } catch (e) {}
  try { mathExtend += numTwo.split('.')[1].length } catch (e) {}

  mathExtend = pow(10, mathExtend)

  return Number(numOne.replace('.', '')) * Number(numTwo.replace('.', '')) / mathExtend
}

export function div (numOne, numTwo) {
  numOne = numOne.toString()
  numTwo = numTwo.toString()

  let [pointRightBitOne, pointRightBitTwo] = [0, 0]

  try { pointRightBitOne = numOne.split('.')[1].length } catch (e) {}
  try { pointRightBitTwo = numTwo.split('.')[1].length } catch (e) {}

  const divResult = Number(numOne.replace('.', '')) / Number(numTwo.replace('.', ''))

  return mul(divResult, pow(10, pointRightBitTwo - pointRightBitOne))
}

export const mathExtend = {
  add,
  sub,
  mul,
  div
}

export default function (Vue) {
  Vue.prototype.math = mathExtend
}
