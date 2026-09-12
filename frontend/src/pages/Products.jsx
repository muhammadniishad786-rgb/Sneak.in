import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { fetchProducts } from "../redux/features/productSlice"
function Products() {
    const dispatch = useDispatch()

    const {products, loading, error} = useSelector((state) => (
        state.products
    ))

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    console.log(products);
    
  return (
    <div>
      Product Page
    </div>
  )
}

export default Products
