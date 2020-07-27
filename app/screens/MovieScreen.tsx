import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useQuery } from '@apollo/client';

import { TStackScreens } from '../config/types';
import { GET_MOVIE } from '../graphql/queries';

// PROPS TYPES
interface Props {
	route: RouteProp<TStackScreens, 'Movie'>;
}

// COMPONENT
const MovieScreen: React.FC<Props> = ({ route }) => {
	const { data, error, loading, refetch } = useQuery(GET_MOVIE, {
		variables: { id: route.params.id },
	});

	return (
		<View style={styles.container}>
			{loading ? (
				<Text>Loading ...</Text>
			) : (
				<Text>
					{data.movie.title} {data.movie.duration}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({ container: {} });

export default MovieScreen;
