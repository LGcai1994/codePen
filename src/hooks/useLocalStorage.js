import { useEffect, useState } from 'react'

const PREFIX = 'codepen-clone-'

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key

  // load value
  const [value, setValue] = useState(() => {
    // query if there is a value
    const jsonValue = localStorage.getItem(prefixedKey)
    // have value, set it
    if (jsonValue != null) return JSON.parse(jsonValue)
    // no value, initiate
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  // update value
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
