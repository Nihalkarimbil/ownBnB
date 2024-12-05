import * as Yup from "yup"

export const schema= Yup.object({
    email: Yup.string().email().required("enter a valid email"),
    password:Yup.string().min(4).required("enter a valid password"),
})