import makeServer from "@/server"

export const categoriesApiClient = async () => {
  makeServer()

  try {
    const response = await fetch("/api/categories")
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
