export function createToken() {
  return { Authorization: localStorage.getItem("token") }
}
