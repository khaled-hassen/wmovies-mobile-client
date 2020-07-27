import React, { useCallback } from 'react';
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
	totalMovies: number;
	onMovieSelected: (id: string, title: string) => void;
}

// COMPONENT
const MoviesListContainer: React.FC<Props> = (props) => {
	const renderMovie = useCallback(
		({ item }: { item: IMovie }) => (
			<Card
				onMovieSelected={props.onMovieSelected}
				id={item.id}
				title={item.title}
				img={item.img}
			/>
		),
		[]
	);

	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	return (
		<React.Fragment>
			{props.loading ? (
				<View>
					<Text>Loading ...</Text>
				</View>
			) : (
				<React.Fragment>
					<FlatList
						contentContainerStyle={styles.container}
						keyExtractor={(movie) => movie.id}
						data={props.movies}
						renderItem={renderMovie}
						key={
							screenHeight >= screenWidth
								? 'portrait'
								: 'landscape'
						}
						numColumns={Math.floor(screenWidth / 153)}
						ListFooterComponent={
							props.onMorePressed &&
							props.movies.length < props.totalMovies ? (
								<Button
									title="More"
									onPress={props.onMorePressed}
								/>
							) : null
						}
					/>
				</React.Fragment>
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
