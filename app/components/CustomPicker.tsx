import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Modal,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// PROPS TYPES
interface Props {
	items: string[];
	activeItem: string;
	onValueChange: (val: string) => void;
}

// COMPONENTS
const Item: React.FC<{ data: string; onPress: (val: string) => void }> = ({
	data,
	onPress,
}) => {
	return (
		<TouchableOpacity onPress={() => onPress(data)}>
			<View style={styles.itemContainer}>
				<Text style={styles.itemText}>{data}</Text>
			</View>
		</TouchableOpacity>
	);
};

const CustomPicker: React.FC<Props> = (props) => {
	const [show, setShow] = useState(false);

	const handlePress = (val: string) => {
		props.onValueChange(val);
		setShow(false);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.4} onPress={() => setShow(true)}>
				<View style={styles.activeItemContainer}>
					<Text style={styles.activeItemText}>
						{props.activeItem}
					</Text>
					<AntDesign
						style={{ marginTop: 10, marginLeft: 15 }}
						name="down"
						size={18}
						color="#FEFEFE"
					/>
				</View>
			</TouchableOpacity>

			<Modal
				animationType="slide"
				transparent
				visible={show}
				onRequestClose={() => setShow(false)}
			>
				<TouchableOpacity
					activeOpacity={1}
					style={styles.touchOverlay}
					onPress={() => setShow(false)}
				>
					<View style={styles.modalItems}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={props.items}
							keyExtractor={(item) => item}
							renderItem={(item) => (
								<Item data={item.item} onPress={handlePress} />
							)}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	touchOverlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	activeItemContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 50,
	},
	activeItemText: {
		color: '#FEFEFE',
		fontSize: 24,
	},
	modalItems: {
		backgroundColor: 'rgba(18, 18, 18, 0.94)',
		paddingTop: 13,
		maxHeight: 250,
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
		borderRadius: 10,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
	},
	itemContainer: { alignItems: 'center', marginVertical: 10 },
	itemText: { color: '#FEFEFE', fontSize: 25 },
});

export default CustomPicker;
