import React from 'react';
import {
	StyleSheet,
	FlatList,
	Button,
	useWindowDimensions,
	View,
	Text,
} from 'react-native';

import Card from './Card';
import { IMovie } from '../config/types';

// PROPS TYPES
interface Props {
	onMorePressed?: () => void;
	movies: IMovie[] | [];
	loading: boolean;
}

const renderMovie = ({ item }: { item: IMovie }) => (
	<Card id={item.id} title={item.title} img={item.img} />
);

// COMPONENT
const MoviesListContainer: React.FC<Props> = (props) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	return (
		<React.Fragment>
			{props.loading ? (
				<View>
					<Text>Loading ...</Text>
				</View>
			) : (
				<FlatList
					contentContainerStyle={styles.container}
					keyExtractor={(movie) => movie.id}
					data={props.movies}
					renderItem={renderMovie}
					key={screenHeight >= screenWidth ? 'portrait' : 'landscape'}
					numColumns={Math.floor(screenWidth / 153)}
					ListFooterComponent={
						props.onMorePressed ? (
							<Button
								title="More"
								onPress={props.onMorePressed}
							/>
						) : null
					}
				/>
			)}
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
});

export default MoviesListContainer;
