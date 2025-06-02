import { Router } from "express";
import { v4 as uuid } from "uuid";
import { getAllCarts, getCartById, updateCart } from "../services/cartServices.js";

const router = Router();

// GET all carts (admin)
router.get("/", async (req, res, next) => {
  // Kolla om user är admin
  //   if (!global.user || global.user.role !== "admin") {
  //     return res.status(403).json({ message: "Not authorized" });
  //   }

  const carts = await getAllCarts(); //hämtar alla carts
  if (carts && carts.length > 0) {
    res.json({
      success: true,
      carts: carts,
    });
  } else {
    next({ status: 404, message: "No carts were found" });
  }
});

// GET cart by cartId
router.get("/:cartId", async (req, res, next) => {
  const { cartId } = req.params;
  const cart = await getCartById(cartId);
  if (cart) {
    res.json({
      success: true,
      cart: cart,
    });
  } else {
    next({ status: 404, message: "No cart found" });
  }
});

// PUT update cart
router.put("/", async (req, res, next) => {
  try {
    const { prodId, qty, cartId, userId, guestId } = req.body;
    if (!prodId || qty === undefined) {
      return res.status(400).json({ success: false, message: "Missing prodId or qty" });
    }

    const result = await updateCart({ cartId, userId, guestId, prodId, qty });

    res.json({
      success: true,
      cart: result.cart,
      cartId: result.cartId, // Endast om ny
      guestId: result.guestId, // Endast om ny
    });
  } catch (err) {
    next(err);
  }
});

export default router;
