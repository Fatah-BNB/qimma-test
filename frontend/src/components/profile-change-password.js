
<h3>Chnage password</h3>
<div class="form-group">
    <label for="oldPassword">Old password</label>
    <input
        name="oldPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.oldPassword}
    />
    {formik.touched.oldPassword && formik.errors.oldPassword ? <p className="error-message">{formik.errors.oldPassword}</p> : null}
</div>

<div class="form-group">
    <label for="newPassword">New password</label>
    <input
        name="newPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newPassword}
    />
    {formik.touched.newPassword && formik.errors.newPassword ? <p className="error-message">{formik.errors.newPassword}</p> : null}
</div>

<div class="form-group">
    <label for="newPasswordConfirm">Confirm new password</label>
    <input
        name="newPasswordConfirm"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newPasswordConfirm}
    />
    {formik.touched.newPasswordConfirm && formik.errors.newPasswordConfirm ? <p className="error-message">{formik.errors.newPasswordConfirm}</p> : null}
</div>