import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';

import { colors } from '../config/config';

// PROPS TYPES
interface Props {
	show: boolean;
	message: string;
	onRequestClose: () => void;
}

// COMPONENT
const ErrorModal: React.FC<Props> = ({ show, onRequestClose, message }) => {
	return (
		<Modal
			animationType="slide"
			visible={show}
			transparent
			onRequestClose={onRequestClose}
		>
			<View style={styles.errorMessageContainer}>
				<Text style={styles.errorMessage}>{message}</Text>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	errorMessageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.error,
		alignSelf: 'center',
		width: 280,
		padding: 10,
		position: 'absolute',
		bottom: 15,
		borderRadius: 20,
	},
	errorMessage: {
		color: '#FEFEFE',
		textAlign: 'center',
		fontSize: 22,
	},
});

export default ErrorModal;
