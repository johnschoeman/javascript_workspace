//@flow

function add(a: number, b: number): number {
  return a + b
}
type User = {
  name: {
    first: string,
    middle: string,

    last: string,
  },
}

function getFullName(user: User): string {
  const {
    name: {first, middle, last},
  } = user
  return [first, middle, last].filter(Boolean).join("")
}
add(Number("1"), 2)

getFullName({name: {first: "joe", middle: "Buid", last: "Matthews"}})
