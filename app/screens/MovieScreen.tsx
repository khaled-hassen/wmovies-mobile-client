import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Button,
	ScrollView,
	RefreshControl,
} from 'react-native';
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
	const [refreshing, setRefreshing] = useState(false);
	const { data, error, loading, refetch } = useQuery(GET_MOVIE, {
		variables: { id: route.params.id },
	});

	const handlePress = () => {
		console.log(data.movie.streamLink);
	};

	const handleRefresh = async () => {
		setRefreshing(true);
		try {
			await refetch({ id: route.params.id });
			setRefreshing(false);
		} catch {
			setRefreshing(false);
		}
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<Text>Loading ...</Text>
			) : (
				<ImageBackground
					source={{ uri: data.movie.img.src }}
					style={styles.bgImage}
					blurRadius={2}
				>
					<ScrollView
						contentContainerStyle={styles.infoContainer}
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
					>
						<Text>{data.movie.title}</Text>
						<Button title="Play" onPress={handlePress} />
						<Text style={styles.infoTitle}>
							Genre:{' '}
							<Text style={styles.infoValue}>
								{data.movie.genre.join(', ')}
							</Text>
						</Text>
						<Text style={styles.infoTitle}>
							Year:{' '}
							<Text style={styles.infoValue}>
								{data.movie.year}
							</Text>
						</Text>
						<Text style={styles.infoTitle}>
							Director:{' '}
							<Text style={styles.infoValue}>
								{data.movie.director}
							</Text>
						</Text>
						<Text style={styles.infoTitle}>
							Rating:{' '}
							<Text style={styles.infoValue}>
								{data.movie.rating}
							</Text>
						</Text>
						<Text style={styles.infoTitle}>
							Duration:{' '}
							<Text style={styles.infoValue}>
								{data.movie.duration}
							</Text>
						</Text>
						<Text style={styles.infoTitle}>
							Description:{' '}
							<Text style={styles.infoValue}>
								{data.movie.description}
							</Text>
						</Text>
					</ScrollView>
				</ImageBackground>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	bgImage: { flexGrow: 1, resizeMode: 'cover' },
	infoContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoTitle: {
		color: 'white',
		maxWidth: '60%',
	},
	infoValue: {
		color: '#f1f1f1',
	},
});

export default MovieScreen;
