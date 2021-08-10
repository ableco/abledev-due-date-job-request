export default function createStuff(input: { name: string }) {
  return { allUppercasedName: input.name.toUpperCase() };
}
