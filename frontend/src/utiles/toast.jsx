import { toast } from "react-toastify"

export const handlsuccess = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 3000,      // ✅ 3 seconds
        closeOnClick: true,
        pauseOnHover: true,
    })
}
export const handlerror = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 3000,      // ✅ 3 seconds
        closeOnClick: true,
        pauseOnHover: true,
    })
}