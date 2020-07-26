import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-community/picker';

import { layout, MOVIES_LOADED_PER_REQUEST } from '../config/config';

// PROPS TYPES
interface Props {}

// COMPONENT
const Genre: React.FC<Props> = (props) => {
	return (
		<View style={styles.container}>
			<Picker
				selectedValue={'java'}
				style={{ height: 50, width: 100, backgroundColor: 'black' }}
			>
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="JavaScript" value="js" />
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: layout.paddingTop },
});

export default Genre;
