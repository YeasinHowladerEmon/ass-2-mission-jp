import { z } from "zod";

const ProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(
    z.object({
      type: z.string(),
      value: z.string()
    })
  ),
  inventory: z.object({
    quantity: z.number(),
    inStock: z.string()
  })
});

// TypeScript type inferred from the schema
type IProducts = z.infer<typeof ProductValidationSchema>;

export { IProducts, ProductValidationSchema };
