/**
 * storage
 */

const error = (e: Error | string) => {
  console.error(e)
}

export default {
  get (key: string): object | null {
    try {
      return JSON.parse(window.localStorage.getItem(key) as string)
    } catch (e) {
      error(e)
      return null
    }
  },
  set (key: string, val: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(val))
    } catch (e) {
      error(e)
    }
  },
  remove (key: string) {
    try {
      window.localStorage.removeItem(key)
    } catch (e) {
      error(e)
    }
  },
  clear () {
    try {
      window.localStorage.clear()
    } catch (e) {
      error(e)
    }
  },
}
