import {firebase, googleAuthProvider} from '../firebase/firebase';
 
export const startLogin = () => {
	return () => {	//here, we don't need dispatch
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
};

export const startLogout = () => {
	return () => {
		return firebase.auth().signOut();
	};
};