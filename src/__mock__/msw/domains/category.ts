import { Environment } from "@/composition/environments"
import { http, HttpResponse } from "msw"
import { MockDB } from "../mock-db"

export class Category {
  constructor(
    private db: MockDB,
    private env: Environment,
  ) {}

  handle() {
    return [
      http.get(`${this.env.apiUrl}/category`, () => {
        return HttpResponse.json(
          {
            data: this.db.getCategoryList(),
          },
          { status: 200 },
        )
      }),

      http.get<{ categoryId: string }>(
        `${this.env.apiUrl}/category/:categoryId/product`,
        ({ params }) => {
          return HttpResponse.json(
            {
              data: this.db.getProductListByCategory(params.categoryId),
            },
            { status: 200 },
          )
        },
      ),

      http.get<{ productId: string }>(
        `${this.env.apiUrl}/product/:productId`,
        ({ params }) => {
          return HttpResponse.json(
            {
              data: this.db.getProductById(params.productId),
            },
            { status: 200 },
          )
        },
      ),
    ]
  }
}
