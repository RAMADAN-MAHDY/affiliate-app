'use client'
import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'

export default function StoreProvider({ children }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  useEffect(() => {
    // Load cart from localStorage only on the client, after hydration
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Dispatch each cart item to restore the cart state
          const { add } = require('../lib/authSlice')
          parsed.forEach(item => storeRef.current.dispatch(add(item)))
        }
      }
    } catch (e) {
      // Ignore localStorage errors (e.g. private browsing)
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}