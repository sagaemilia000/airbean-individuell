import Menu from "../models/menu.js";

export async function createProduct(product) {
    try {
        const result = await Menu.create(product)
        return result
    } catch(error) {
        console.log(error.message)
        return null
    }
}