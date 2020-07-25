import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import colors from '../config/colors';

interface Props {
	id: string;
	title: string;
	img: { src: string };
}

const getImageSource = (img: { src: string }) => ({
	uri: img.src,
	width: 153,
	height: 230,
});

const formatTitle = (title: string) => {
	if (title.length <= 22) return title;

	return title.slice(0, 19) + '...';
};

const Card: React.FC<Props> = (props) => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.coverImage}
				source={getImageSource(props.img)}
				resizeMode="contain"
			/>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{formatTitle(props.title)}</Text>
			</View>
		</View>
	);
};

const padding = 20;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	coverImage: {
		borderRadius: 5,
	},
	titleContainer: {
		paddingLeft: padding,
		paddingRight: padding,
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		maxWidth: 153,
		justifyContent: 'center',
		marginTop: 5,
	},
	title: {
		color: colors.light,
		textAlign: 'center',
		fontSize: 15,
	},
});

export default Card;
