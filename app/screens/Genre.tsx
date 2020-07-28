import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { layout, MOVIES_LOADED_PER_REQUEST, GENRES } from '../config/config';
import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-community/picker';

import {
	GET_MOVIES_BY_GENRE,
	GET_MOVIES_NUMBER_BY_GENDER,
} from '../graphql/queries';
import MoviesListContainer from '../components/MoviesListContainer';
import { IMovie } from '../config/types';

// TODO add letter selection

// PROPS TYPES
interface Props {
	flatList?: React.RefObject<FlatList<IMovie>>;
	onMovieSelected: (id: string, title: string) => void;
}

// COMPONENT
const Genre: React.FC<Props> = (props) => {
	const [activeGenre, setActiveGenre] = useState('Action');
	const queryPosition = useRef(0);

	const { data, loading, error, fetchMore, refetch } = useQuery(
		GET_MOVIES_BY_GENRE,
		{
			variables: {
				genre: activeGenre,
				pos: 0,
				count: MOVIES_LOADED_PER_REQUEST,
			},
		}
	);
	const { data: numberData, loading: numberLoading } = useQuery(
		GET_MOVIES_NUMBER_BY_GENDER,
		{
			variables: { genre: activeGenre },
		}
	);

	const handlePress = () => {
		queryPosition.current =
			queryPosition.current + MOVIES_LOADED_PER_REQUEST - 1;

		return fetchMore({
			variables: {
				genre: activeGenre,
				pos: queryPosition.current,
				count: MOVIES_LOADED_PER_REQUEST,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return Object.assign({}, prev, {
					moviesByGenre: [
						...prev.moviesByGenre,
						...fetchMoreResult.moviesByGenre,
					],
				});
			},
		});
	};

	const handleRefresh = () => {};

	useEffect(() => {
		queryPosition.current = 0;
	}, [activeGenre]);

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={activeGenre}
				style={{ height: 50, width: 100 }}
				onValueChange={(genre) => setActiveGenre(genre.toString())}
			>
				{GENRES.map((genre) => (
					<Picker.Item label={genre} value={genre} key={genre} />
				))}
			</Picker>
			<MoviesListContainer
				flatList={props.flatList}
				onRefresh={handleRefresh}
				onMovieSelected={props.onMovieSelected}
				totalMovies={
					numberData && !numberLoading
						? numberData.moviesByGenreNumber
						: undefined
				}
				loading={loading}
				movies={data ? data.moviesByGenre : []}
				onMorePressed={handlePress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: layout.paddingTop,
	},
});

export default Genre;
