import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { layout, MOVIES_LOADED_PER_REQUEST, ALPHABET } from '../config/config';
import { useQuery } from '@apollo/client';

import {
	GET_MOVIES_BY_LETTER,
	GET_MOVIES_NUMBER_BY_LETTER,
} from '../graphql/queries';
import MoviesListContainer from '../components/MoviesListContainer';
import { IMovie } from '../config/types';
import CustomPicker from '../components/CustomPicker';

// PROPS TYPES
interface Props {
	flatList?: React.RefObject<FlatList<IMovie>>;
	onMovieSelected: (id: string, title: string) => void;
}

// COMPONENT
const AZ: React.FC<Props> = (props) => {
	const [activeLetter, setActiveLetter] = useState('A');
	const queryPosition = useRef(0);

	const { data, loading, error, fetchMore, refetch } = useQuery(
		GET_MOVIES_BY_LETTER,
		{
			variables: {
				letter: activeLetter,
				pos: 0,
				count: MOVIES_LOADED_PER_REQUEST,
			},
		}
	);
	const { data: numberData, loading: numberLoading } = useQuery(
		GET_MOVIES_NUMBER_BY_LETTER,
		{
			variables: { letter: activeLetter },
		}
	);

	const handlePress = async () => {
		queryPosition.current =
			queryPosition.current + MOVIES_LOADED_PER_REQUEST - 1;

		await fetchMore({
			variables: {
				letter: activeLetter,
				pos: queryPosition.current,
				count: MOVIES_LOADED_PER_REQUEST,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;

				return Object.assign({}, prev, {
					moviesByLetter: [
						...prev.moviesByLetter,
						...fetchMoreResult.moviesByLetter,
					],
				});
			},
		});
	};

	const handleRefresh = async () => {
		await refetch({
			letter: activeLetter,
			pos: 0,
			count: MOVIES_LOADED_PER_REQUEST,
		});
	};

	useEffect(() => {
		queryPosition.current = 0;
	}, [activeLetter]);

	return (
		<View style={styles.container}>
			<CustomPicker
				items={ALPHABET}
				activeItem={activeLetter}
				onValueChange={(letter) => setActiveLetter(letter)}
			/>
			<MoviesListContainer
				flatList={props.flatList}
				onRefresh={handleRefresh}
				onMovieSelected={props.onMovieSelected}
				totalMovies={
					numberData && !numberLoading
						? numberData.moviesByLetterNumber
						: undefined
				}
				loading={loading}
				movies={data ? data.moviesByLetter : []}
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

export default AZ;
