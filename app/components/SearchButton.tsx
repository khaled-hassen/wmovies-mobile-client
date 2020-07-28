import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// PROPS TYPES
interface Props {
	onPress: () => void;
}

// COMPONENT
const SearchButton: React.FC<Props> = (props) => {
	return (
		<TouchableOpacity activeOpacity={0.4} onPress={props.onPress}>
			<View style={styles.container}>
				<AntDesign name="search1" size={24} color="white" />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({ container: { marginRight: 20 } });

export default SearchButton;
