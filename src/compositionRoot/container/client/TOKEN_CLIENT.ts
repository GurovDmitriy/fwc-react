"use client"

export const TOKEN_CLIENT = {
  ErrorHandler: Symbol.for("service.ErrorHandler"),
  Fetcher: Symbol.for("service.Fetcher"),
  KeyValueStorage: Symbol.for("service.KeyValueStorage"),
} as const
