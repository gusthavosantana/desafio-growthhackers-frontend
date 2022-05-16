import { rest } from 'msw'

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
            "id": "1",
            "name": "Eletrônicos"
        },
        {
            "id": "2",
            "name": "Alimentos"
        }
      ]),
    )
  }),
]