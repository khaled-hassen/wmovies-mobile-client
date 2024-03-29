import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { colors } from '../config/config';

// TODO change fallback image

interface Props {
	missing: boolean;
	id: string;
	title: string;
	img: { src: string };
	onMovieSelected: (id: string, title: string) => void;
}

const getImageSource = (src: string) => ({ uri: src, width: 153, height: 230 });

const formatTitle = (title: string) => {
	if (title.length <= 22) return title;

	return title.slice(0, 19) + '...';
};

const MovieCard: React.FC<Props> = (props) => {
	const FALLBACK_IMAGE_SRC =
		'https://vw.ffmovies.sc/wp-content/themes/assets/images/noimg.png';
	const [imageSrc, setImageSrc] = useState(props.img.src);

	return (
		<View style={styles.container}>
			{!props.missing && (
				<React.Fragment>
					<TouchableOpacity
						onPress={() =>
							props.onMovieSelected(props.id, props.title)
						}
					>
						<Image
							style={styles.coverImage}
							source={getImageSource(imageSrc)}
							resizeMode="contain"
							fadeDuration={100}
							onError={() => setImageSrc(FALLBACK_IMAGE_SRC)}
						/>
					</TouchableOpacity>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>
							{formatTitle(props.title)}
						</Text>
					</View>
				</React.Fragment>
			)}
		</View>
	);
};

const padding = 20;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		alignItems: 'center',
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

export default MovieCard;
