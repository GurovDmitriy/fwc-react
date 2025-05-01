"use client"

import axios from "axios"

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
})

export { fetcher }
