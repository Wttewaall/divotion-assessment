import type { NextApiRequest, NextApiResponse } from 'next'
import * as mockData from '@/app/api/products.mock.json';
import { ProductData } from '@/types/productData';
 
type ResponseData = {
  products: ProductData[]
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ products: mockData as ProductData[] })
}