import User from "../models/User.js";

//Update Cart CartData : /api/cart/update

export const updateCart = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);
    const {cartItems} = req.body;
    console.log("CartItems: ", cartItems);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { cartItems } },
      { new: true, runValidators: true },
    ).select("cartItems -_id");
    if (!updatedUser) {
      throw new Error("User not found");
    }
    res.json({
      success: true,
      message: "Cart Updated",
      cartItems: updatedUser.cartItems,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
