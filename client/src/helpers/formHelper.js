import cogoToast from "cogo-toast"

class FromHelper {
    ErrorToast(msg) {
        cogoToast.error(msg,{position: "top-right"});
    }
    SuccessToast(msg) {
        cogoToast.success(msg,{position: "top-right"});
    }
}

export const {
    ErrorToast,
    SuccessToast
} = new FromHelper();