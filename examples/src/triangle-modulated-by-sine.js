import {constant, sine, triangle, amp} from 'audiate'

const mod = amp(
  constant(220),
  sine(constant(3.7))
)

export default () => triangle(mod)
