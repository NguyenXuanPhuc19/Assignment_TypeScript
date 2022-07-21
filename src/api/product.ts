import Product from "../models/product"
import instance from "./instance"


export const createProduct = (product: Product) => {
    const url = '/products'
    return instance.post(url, product)
}
export const listProducts = () => {
    const url = '/products'
    return instance.get(url)
}
export const removeProduct = (id: number) => {
    const url = `/products/${id}`
    return instance.delete(url)
}
export const getProduct = (id: number) => {
    const url = `/products/${id}`
    return instance.get(url)
}
export const updateProduct = (id: number, product: Product) => {
    const url = `/products/${id}`
    return instance.put(url, product)
}