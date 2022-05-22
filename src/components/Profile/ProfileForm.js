import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
	const history = useHistory();
	const newPasswordInputRef = useRef();
	const authCtx = useContext(AuthContext);
	const submitHandler = (e) => {
		e.preventDefault();

		const enteredNewPasword = newPasswordInputRef.current.value;

		fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAtBDCm71JT1zUS90s8RD9wPFaGo6Nb0CY",
			{
				method: "POST",
				body: JSON.stringify({
					idToken: authCtx.token,
					password: enteredNewPasword,
					returnSecureToken: false,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		).then((res) => {
			history.replace("/");
		});
	};
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					minLength="7"
					ref={newPasswordInputRef}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
