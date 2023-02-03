import { createContext, ReactElement, useState, useEffect } from "react"

// Product type
export type ProductType = {
    sku: string
    name: string
    price: number
}

// initial state
// const initState: ProductType[] = [] //* When hooked up to server
//! Static data for now
const initState: ProductType[] = [
    {
        sku: "item0001",
        name: "Widget",
        price: 9.99,
    },
    {
        sku: "item0002",
        name: "Premium Widget",
        price: 19.99,
    },
    {
        sku: "item0003",
        name: "Deluxe Widget",
        price: 29.99,
    },
]

// context type for product
export type UseProductsContextType = { products: ProductType[] }

const initContextState: UseProductsContextType = { products: [] }
const ProductsContext = createContext<UseProductsContextType>(initContextState)

// children Type
type ChildrenType = { children?: ReactElement | ReactElement[] }

// create Provider
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

    /* // for when servers fetch data
  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((res) => {
          return res.json()
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message)
        })
      return data
    }
    fetchProducts().then((products) => setProducts(products))
  }, [])
   */

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext
