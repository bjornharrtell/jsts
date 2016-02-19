export default function Double () {}
Double.isNaN = n => Number.isNaN(n)
Double.doubleToLongBits = n => n
Double.longBitsToDouble = n => n
Double.isInfinite = n => !Number.isFinite(n)
Double.MAX_VALUE = Number.MAX_VALUE
