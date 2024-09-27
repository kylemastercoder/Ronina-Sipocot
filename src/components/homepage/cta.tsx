"use client";

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const CTA = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push("/auth/sign-in")}>
    Book Now &rarr;
  </Button>
  )
}

export default CTA