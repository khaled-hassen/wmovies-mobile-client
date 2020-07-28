import React, { useCallback, useState } from 'react';
import {
	StyleSheet,
	FlatList,
	useWindowDimensions,
	View,
	Text,
	RefreshControl,
} from 'react-native';

import Card from './Card';
import { IMovie } from '../config/types';
import MoreButton from './MoreButton';

// PROPS TYPES
interface Props {
	flatList?: React.RefObject<FlatList<IMovie>>;
	onMorePressed?: () => Promise<void>;
	movies: IMovie[] | [];
	loading: boolean;
	totalMovies: number;
	onRefresh: () => void;
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

	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(false);
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const handleRefresh = async () => {
		setRefreshing(true);
		try {
			await props.onRefresh();
			setRefreshing(false);
		} catch (error) {
			setRefreshing(false);
		}
	};

	const handleOnPress = async () => {
		if (props.onMorePressed) {
			setLoading(true);
			try {
				await props.onMorePressed();
				setLoading(false);
			} catch {
				setLoading(false);
			}
		}
	};

	return (
		<React.Fragment>
			{props.loading ? (
				<View>
					<Text>Loading ...</Text>
				</View>
			) : (
				<React.Fragment>
					<FlatList
						ref={props.flatList}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={handleRefresh}
								colors={[
									'#845EC2',
									'#D65DB1',
									'#FF6F91',
									'#FF9671',
									'#FFC75F',
								]}
							/>
						}
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
								<MoreButton
									onPress={handleOnPress}
									loading={loading}
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
