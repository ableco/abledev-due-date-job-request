export default function someQuery() {
  const someCondition = Math.random() < 0.5;

  if (someCondition) {
    return { data: { x: 1, y: 2, z: 3, a: 5, b: 6, c: 7 } };
  } else {
    return { otherData: { a: 1, b: 2 } };
  }
}
