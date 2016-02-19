export default function Character () {}
Character.isWhitespace = c => ((c <= 32 && c >= 0) || c == 127)
Character.toUpperCase = c => c.toUpperCase()
