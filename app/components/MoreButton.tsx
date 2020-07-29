import React from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// PROPS TYPES
interface Props {
	loading: boolean;
	onPress: () => Promise<void>;
}

// COMPONENT
const MoreButton: React.FC<Props> = (props) => {
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.4}
			onPress={props.onPress}
		>
			<View style={styles.btnContainer}>
				{props.loading ? (
					<ActivityIndicator size="large" color="#FEFEFE" />
				) : (
					<Feather name="more-horizontal" size={40} color="#FEFEFE" />
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 20,
	},
	btnContainer: {
		width: 40,
		height: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnText: { color: 'black', fontSize: 20 },
});

export default MoreButton;
