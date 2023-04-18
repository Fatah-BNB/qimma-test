import React from "react"
import { useEffect, useState, useRef } from "react";
import NavBar from "../../user/navbar/navbar"
import './profile.css'
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios"
import { fetchUserData } from "../../../slices/user-slice";
import defaultAvatar from "../../../icons/default_avatar.png"
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
    const [readyToSave, setReadyToSave] = useState(false)
    const dispatch = useDispatch()
    const [wilayas, setwilayas] = useState([])
    const [image, setImage] = useState(defaultAvatar)
    const imageInput = useRef(null)

    const getAvatar = () => {
        Axios.get("http://localhost:5000/profile/edit-user-info/getAvatar").then(response => {
            if (response.data.picture) {
                setImage(response.data.picture)
            } else {
                setImage(defaultAvatar)
            }
            console.log("DISPLAYING USER PROFILE PICTURE", response.data.picture)
        }).catch(error => {
            console.log("ERROR DISPLAYING USER AVATAR", error.response.data.errMsg)
        })
    }

    const deleteProfilePic = async () => {
        await Axios.put("http://localhost:5000/profile/edit-user-info/deleteAvatar").then(response => {
            console.log(response.data.succMsg)
            getAvatar()
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }

    const uploadProfilePic = (event) => {
        const formData = new FormData();
        formData.append('avatar', event.target.files[0]);
        toast.loading('uploading...');
        Axios.post("http://localhost:5000/profile/edit-user-info/avatar", formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log("UPLOADED =====> ", response.data.results)
            toast.dismiss();
            getAvatar()
            toast.success(response.data.succMsg)
        }).catch(error => {
            toast.dismiss()
            console.log("UPLOAD PICTURE ERROR =====> ", error.response.data)
            toast.error("cannot update profile picture")
        })
    }

    const getWialayas = () => {
        Axios.get("http://localhost:5000/register/wilayas").then(response => {
            setwilayas(response.data.wilayas)
        }).catch(error => {
            console.log("ERR fetching tiers --> ", error.response.data.errMsg)
        })
    }

    const updateInfo = () => {
        Axios.put("http://localhost:5000/profile/edit-user-info", { user: formik.values }).then(response => {
            toast.success(response.data.succMsg)
        }).catch(error => {
            toast.error(error.response.data.errMsg)
        })
    }

    const getUserInfo = () => {
        Axios.get("http://localhost:5000/profile").then(async response => {
            await dispatch(fetchUserData(response.data.results))
            console.log("response ==> ", response.data.results)
        }).then(error => {
            console.log("ERROR --> ", error)
        })
    }


    const changeProfilePic = () => {
        imageInput.current.click()
    }

    useEffect(() => {
        console.log("Profile mounted")
        getUserInfo()
        console.log("fetched")
        setReadyToSave(formik.values === formik.initialValues || Object.keys(formik.errors).length > 0)
        console.log(formik.errors)
        console.log(readyToSave)
        console.log(Object.keys(formik.errors).length)
        console.log("FORMIK VALUES = ", formik.values)
    })

    useEffect(() => {
        getAvatar()
        getWialayas()
    }, [])

    const handleCancelEdit = () => {
        formik.setValues(formik.initialValues)
        setEditing(false)
    }

    const formik = useFormik({
        initialValues: {
            firstname: useSelector(state => state.userReducer.firstname),
            lastname: useSelector(state => state.userReducer.lastname),
            email: useSelector(state => state.userReducer.email),
            phoneNumber: useSelector(state => state.userReducer.phoneNumber),
            wilaya: useSelector(state => state.userReducer.wilaya),
            wilayaCode: useSelector(state => state.userReducer.wilayaCode)
        }, validationSchema: Yup.object({
            firstname: Yup.string().required("cannot leave this field empty"),
            lastname: Yup.string().required("cannot leave this field empty"),
            phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
            wilaya: Yup.string(),
        }), onSubmit: (values) => {
            console.log(values)
            //send to backend
            setEditing(false)
            updateInfo()
            getUserInfo()
            console.log("FORMIK VALUES --> ", formik.values)
        }
    })
    const [editing, setEditing] = useState(false);
    return (
        <div>
            <NavBar />
            <Toaster />
            <div className="profile-page-container">
                <div className="profile-pic-container">
                    <img className="profile-pic" src={image} alt="profile picture" />
                    <input style={{ display: 'none' }} ref={imageInput} type="file" name="avatar" accept=".jpg,.jpeg,.png" onChange={uploadProfilePic} />
                    <button onClick={changeProfilePic} >Change picture</button>
                    <button onClick={deleteProfilePic}>delete picture</button>
                </div>
                {editing ? (
                    <form className="profile-form" onSubmit={formik.handleSubmit}>
                        <h3>Personal information</h3>
                        <label for="firstname">Firstname:</label>
                        <input
                            name="firstname"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstname}
                        />
                        {formik.touched.firstname && formik.errors.firstname ? <p className="error-message">{formik.errors.firstname}</p> : null}
                        <label for="lastname">Lastname:</label>
                        <input
                            name="lastname"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastname}
                        />
                        {formik.touched.lastname && formik.errors.lastname ? <p className="error-message">{formik.errors.lastname}</p> : null}
                        <label for="email">Email:</label>
                        <input disabled type="email" id="email" value={formik.values.email} />
                        <label for="phoneNumber">Phone number:</label>
                        <input
                            name="phoneNumber"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="error-message">{formik.errors.phoneNumber}</p> : null}
                        <label for="wilaya">Wilaya</label>
                        <select
                            id="wilayaCode"
                            name="wilayaCode"
                            value={formik.values.wilayaCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Select wilaya</option>
                            {wilayas.map(wilaya => (
                                <option key={wilaya.wilaya_code} value={wilaya.wilaya_code}>
                                    {wilaya.wilaya_name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.tier && formik.errors.tier ? <p className="error-message">{formik.errors.tier}</p> : null}



                        {!readyToSave && <button type="submit">Save</button>}
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    </form>
                ) : (
                    <div className="profile-info">
                        <h2>{formik.values.firstname} {formik.values.lastname}</h2>
                        <p>{formik.values.email}</p>
                        {formik.values.phoneNumber && <p>{formik.values.phoneNumber}</p>}
                        {formik.values.wilaya && <p>{formik.values.wilaya}</p>}
                        <button type="button" onClick={() => { setEditing(true) }}>Edit</button>
                    </div>
                )}
            </div>

        </div >
    )
}