import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../features/app/appThunks";

export default function CartSync() {
  const dispatch = useDispatch();
  const { cartItems, user } = useSelector(state => state.app);

  useEffect(() => {
    if (user) {
      dispatch(updateCart({ cartItems }));
    }
  }, [cartItems, user, dispatch]);

  return null;
}
