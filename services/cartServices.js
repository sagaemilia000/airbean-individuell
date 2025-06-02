import Cart from "../models/cart.js";
import { v4 as uuid } from "uuid";

//Hämta alla carts (admin)
export async function getAllCarts() {
  try {
    const carts = await Cart.find();
    return carts;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

//Hämta cart med cartId
export async function getCartById(cartId) {
  try {
    const cart = await Cart.find({ cartId: cartId });
    if (cart.length < 1) {
      throw new Error("No cart found");
    } else {
      return cart;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

//Uppdatera cart
export async function updateCart({ cartId, userId, guestId, prodId, qty }) {
  // Skapa variabler för eventuella nya id:n
  let newCartId = null;
  let newGuestId = null;

  // 1. Försök hitta rätt cart beroende på vad som skickas in:
  let cart = null;

  // - Om det redan finns ett cartId, hämta carten med det
  if (cartId) {
    cart = await Cart.findOne({ cartId });

    // - Om det inte finns cartId men det finns guestId, försök hitta cart med guestId
  } else if (guestId) {
    cart = await Cart.findOne({ guestId });
    if (cart) {
      cartId = cart.cartId; // Spara cartId för ev. användning senare
    }
  }

  // 2. Om ingen cart hittas – skapa en ny cart!
  if (!cart) {
    // Skapa nytt cartId (cart-xxxxx)
    newCartId = "cart-" + uuid().slice(0, 5);
    cartId = newCartId;
    // Om det inte är en inloggad användare och ingen guestId finns, skapa guestId
    if (!userId && !guestId) {
      newGuestId = "guest-" + uuid().slice(0, 5);
      guestId = newGuestId;
    }
    // Skapa en ny Cart med rätt id:n och tom produktlista
    cart = new Cart({
      cartId,
      userId: userId || null,
      guestId: guestId || newGuestId || null,
      products: [],
    });
  }

  // 3. Hantera produktuppdatering i carten
  // Kolla om produkten redan finns i varukorgen
  const prodIndex = cart.products.findIndex((p) => p.prodId === prodId);

  if (qty === 0) {
    // Om qty är 0, ta bort produkten ur varukorgen (om den finns)
    if (prodIndex !== -1) cart.products.splice(prodIndex, 1);
  } else {
    // Om produkten inte finns, lägg till den
    if (prodIndex === -1) {
      cart.products.push({ prodId, qty });
    } else {
      // Om produkten redan finns, uppdatera antalet (qty)
      cart.products[prodIndex].qty = qty;
    }
  }

  // 4. Spara carten i databasen
  await cart.save();

  // 5. Returnera resultatet
  // Returnera alltid carten.
  // Returnera cartId/guestId om de just skapades (så klienten kan spara dem)
  return {
    cart,
    cartId: newCartId, // null om inget nytt skapats
    guestId: newGuestId, // null om inget nytt skapats
  };
}
