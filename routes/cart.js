import { Router } from "express";
import { getAllCarts, getCartById, updateCart } from "../services/cartServices.js";
import validateCartInput from "../middleware/validateCartInput.js";
import { validateProdId } from "../middleware/validateProdId.js";
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// GET all carts 
router.get("/", authenticate, async (req, res, next) => {

  const carts = await getAllCarts();
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
router.get("/:cartId", authenticate, async (req, res, next) => {
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

// ----> UPDATED <---- //

// PUT update cart
router.put("/", authenticate, validateCartInput, validateProdId, async (req, res, next) => {
  const userId = req.user?.userId;
  const { prodId, qty, cartId, guestId } = req.body;

  try {
    const cart = await updateCart({ cartId, userId, guestId, prodId, qty });
    res.json({ success: true, cart });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
});

export default router;
