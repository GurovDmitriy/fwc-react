import { categoriesApiClient } from "@/domains/Categories/categoriesApiClient"
import { useEffect, useState } from "react"

export function useCategoriesList() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoriesApiClient()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return { categories }
}
