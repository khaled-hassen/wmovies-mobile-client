import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

// PROPS TYPES
interface Props {}

// COMPONENT
const AZ: React.FC<Props> = (props) => {
	return (
		<View style={styles.container}>
			<Text>Movies from a to z</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 50 : 0,
	},
});

export default AZ;
