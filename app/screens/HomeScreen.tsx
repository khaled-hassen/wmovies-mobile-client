import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Platform,
	FlatList,
	Text,
	Button,
	useWindowDimensions,
} from 'react-native';
import { useQuery } from '@apollo/client';

import Card from '../components/Card';
import { GET_MOVIES } from '../graphql/queries';
import { IMovie } from '../config/types';

// PROPS TYPES
interface Props {}

const renderMovie = ({ item }: { item: IMovie }) => (
	<Card id={item.id} title={item.title} img={item.img} />
);

// COMPONENT
const HomeScreen: React.FC<Props> = (props) => {
	const count = 10;

	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const [loadedMovies, setLoadedMovies] = useState(10);
	const { data, loading, error, fetchMore } = useQuery(GET_MOVIES, {
		variables: { pos: 0, count },
	});

	const handlePress = () => {
		const newPos = loadedMovies + count - 1;
		setLoadedMovies((prev) => prev + count);

		return fetchMore({
			variables: { pos: newPos, count },
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return Object.assign({}, prev, {
					movies: [...prev.movies, ...fetchMoreResult.movies],
				});
			},
		});
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<Text>Loading...</Text>
			) : (
				<FlatList
					contentContainerStyle={styles.list}
					keyExtractor={(movie: IMovie) => movie.id}
					data={data.movies}
					renderItem={renderMovie}
					key={screenHeight >= screenWidth ? 'portrait' : 'landscape'}
					numColumns={Math.floor(screenWidth / 153)}
					ListFooterComponent={
						<Button title="More" onPress={handlePress} />
					}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 50 : 0,
	},
	list: {
		flexGrow: 1,
	},
});

export default HomeScreen;
