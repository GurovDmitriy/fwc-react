import {
  HatsImage,
  JacketsImage,
  MenImage,
  SneakersImage,
  WomenImage,
} from "@/shared/assets/images/categories"

import { createServer } from "miragejs"

export default function makeServer() {
  createServer({
    routes() {
      this.get("/api/categories", () => [
        { id: 1, value: "hats", image: HatsImage.src },
        { id: 2, value: "jackets", image: JacketsImage.src },
        { id: 3, value: "sneakers", image: SneakersImage.src },
        { id: 4, value: "men", image: MenImage.src },
        { id: 5, value: "women", image: WomenImage.src },
      ])
    },
  })
}
