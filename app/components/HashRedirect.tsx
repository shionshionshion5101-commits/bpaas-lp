'use client'
import { useEffect } from 'react'

export function HashRedirect({ hash }: { hash: string }) {
  useEffect(() => {
    window.location.replace(`/#${hash}`)
  }, [hash])
  return null
}
