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
			<View
				style={{
					...styles.btnContainer,
					backgroundColor: props.loading
						? 'transparent'
						: styles.btnContainer.backgroundColor,
				}}
			>
				{props.loading ? (
					<ActivityIndicator size="large" color="#FEFEFE" />
				) : (
					<Feather name="more-horizontal" size={30} color="black" />
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 30,
	},
	btnContainer: {
		backgroundColor: 'rgba(255,255,255,0.7)',
		width: 60,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
	},
	btnText: { color: 'black', fontSize: 20 },
});

export default MoreButton;
