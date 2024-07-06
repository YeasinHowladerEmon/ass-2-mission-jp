import { z } from "zod";

export const OrderSchema = z.object({
  email: z.string().email(),
  productId: z.string().nonempty(),
  price: z.number().positive(),
  quantity: z.number().int().positive()
});
