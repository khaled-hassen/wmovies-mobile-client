import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Platform,
	FlatList,
	Text,
	Button,
} from 'react-native';
import { useQuery } from '@apollo/client';

import Card from '../components/Card';
import { GET_MOVIES } from '../graphql/queries';
import { IMovie } from '../config/types';

interface Props {}

const renderMovie = ({ item }: { item: IMovie }) => (
	<Card id={item.id} title={item.title} img={item.img} />
);

const HomeScreen: React.FC<Props> = (props) => {
	const [loadedMovies, setLoadedMovies] = useState(10);

	const count = 10;

	const { data, loading, error, fetchMore } = useQuery(GET_MOVIES, {
		variables: { pos: 0, count },
	});

	const handlePress = async () => {};

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
					numColumns={2}
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
		// alignContent: 'center',
	},
});

export default HomeScreen;
