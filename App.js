import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
export default class App extends Component {
	onFacebookButtonPress = async () => {
		// Attempt login with permissions
		const result = await LoginManager.logInWithPermissions([ 'public_profile', 'email' ]);
		if (result.isCancelled) {
			throw 'User cancelled the login process';
		}
		// Once signed in, get the users AccesToken
		const data = await AccessToken.getCurrentAccessToken();
		if (!data) {
			throw 'Something went wrong obtaining access token';
		}
		// Create a Firebase credential with the AccessToken
		const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
		// Sign-in the user with the credential
		return auth().signInWithCredential(facebookCredential);
	};
	render() {
		return (
			<View>
				<Button
					title="Facebook Sign-In"
					onPress={() =>
						this.onFacebookButtonPress().then((data) => {
							console.log(data);
							console.log('Signed in with Facebook!');
						})}
				/>
			</View>
		);
	}
}
