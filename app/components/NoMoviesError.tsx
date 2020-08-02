import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// PROPS TYPES
interface Props {}

// COMPONENT
const NoMoviesError: React.FC<Props> = (props) => {
	return (
		<View style={styles.noResultContainer}>
			<MaterialIcons name="error-outline" size={100} color="#FEFEFE" />
			<Text style={styles.noResultText}>No movies found</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	noResultContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noResultText: { color: '#FEFEFE', fontSize: 30, marginTop: 30 },
});

export default NoMoviesError;
