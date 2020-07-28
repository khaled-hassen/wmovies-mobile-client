import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

// PROPS TYPES
interface Props {
	value: string;
	onChangeText: (val: string) => void;
	onClear: () => void;
}

// COMPONENT
const SearchInput: React.FC<Props> = (props) => {
	return (
		<View style={styles.container}>
			<TextInput
				autoFocus
				placeholder="Search movie"
				value={props.value}
				onChangeText={props.onChangeText}
				blurOnSubmit
				style={styles.input}
			/>
			{props.value.length > 0 && (
				<TouchableOpacity
					style={styles.closeBtn}
					activeOpacity={0.4}
					onPress={props.onClear}
				>
					<AntDesign name="close" size={24} color="white" />
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		color: 'white',
		fontSize: 18,
		marginRight: 20,
	},
	closeBtn: { marginRight: 10 },
});

export default SearchInput;
