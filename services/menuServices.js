// ----> NEW <---- //

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

export async function updateProduct(prodId, updatedProduct) {
    try {
		const result = await Menu.findOneAndUpdate(
			{ prodId: prodId },
			updatedProduct,
			{ new: true }
		);
		return result;
	} catch (error) {
		console.log(error.message)
		return null
	}
}

export async function deleteProduct(prodId) {
    try {
        const result = await Menu.findOneAndDelete({ prodId });
        return result;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}