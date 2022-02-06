import { useEffect } from "react";
import API from "./api";
import { useStateValue } from "./ContextProvider";

export const useLoginRequire = (navigate) => {
  const [{ user }] = useStateValue()
  useEffect(() => {
    if (!user) {
      navigate("/login-customer")
    }
  });
};


export const updateCars = async (dispatch) => {

  const res = await API.get("get-all-agency-cars")
  if (res.data.status === "success") {
    console.log(res.data)
    dispatch({
      type: "APPEND_CARS",
      payload: res.data.cars
    })
    return res.data.cars
  }
}
// export const useLogout = () => {
//   const [state, dispatch ] = useStateValue()
//   dispatch()
// }