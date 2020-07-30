import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from '@apollo/client';
import { Ionicons, Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { WebView } from 'react-native-webview';

import { TStackScreens } from '../config/types';
import { GET_MOVIE } from '../graphql/queries';

// TODO open webView in fullscreen

// PROPS TYPES
interface Props {
	route: RouteProp<TStackScreens, 'Movie'>;
	navigation: StackNavigationProp<TStackScreens, 'Movie'>;
}

// COMPONENT
const MovieScreen: React.FC<Props> = ({ route, navigation }) => {
	const { data, error, loading } = useQuery(GET_MOVIE, {
		variables: { id: route.params.id },
	});

	const handlePress = () => {
		console.log(data.movie.streamLink);
	};

	return (
		<View style={styles.container}>
			<View style={styles.returnBtnContainer}>
				<TouchableOpacity
					activeOpacity={0.4}
					style={{ width: 30, alignItems: 'center' }}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="ios-arrow-back" size={30} color="#FEFEFE" />
				</TouchableOpacity>
			</View>
			{loading ? (
				<View style={styles.loader}>
					<ActivityIndicator size="large" color="#FEFEFE" />
				</View>
			) : (
				<ImageBackground
					source={{ uri: data.movie.img.src }}
					style={styles.bgImage}
					blurRadius={3}
				>
					<ScrollView
						style={styles.infoScrollView}
						contentContainerStyle={styles.infoScrollViewContainer}
					>
						<Text style={styles.movieTitle}>
							{data.movie.title}
						</Text>
						<TouchableOpacity
							activeOpacity={0.4}
							onPress={handlePress}
							style={styles.playBtn}
						>
							<Feather name="play" size={50} color="#fde9df" />
						</TouchableOpacity>
						<Text style={styles.info}>
							Genre: <Text>{data.movie.genre.join(', ')}</Text>
						</Text>
						<Text style={styles.info}>
							Year: <Text>{data.movie.year}</Text>
						</Text>
						<Text style={styles.info}>
							Director: <Text>{data.movie.director}</Text>
						</Text>
						<Text style={styles.info}>
							Rating: <Text>{data.movie.rating}</Text>
						</Text>
						<Text style={styles.info}>
							Duration: <Text>{data.movie.duration}</Text>
						</Text>
						<Text style={{ ...styles.info, marginBottom: 30 }}>
							Description: <Text>{data.movie.description}</Text>
						</Text>
						<WebView
							javaScriptEnabled
							allowsFullscreenVideo
							source={{ uri: data.movie.streamLink }}
							style={{
								marginTop: 20,
								backgroundColor: 'red',
								width: 300,
								height: 300,
							}}
						/>
					</ScrollView>
				</ImageBackground>
			)}
			<StatusBar style="light" backgroundColor={statusBgColor} />
		</View>
	);
};

const statusBgColor = 'rgba(15, 15, 15, 0.4)';

const styles = StyleSheet.create({
	container: { flex: 1 },
	bgImage: { flexGrow: 1, resizeMode: 'cover' },
	movieTitle: {
		fontSize: 35,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fbf7f7',
		maxWidth: '75%',
	},
	infoScrollView: {
		marginTop: getStatusBarHeight() + 60,
		backgroundColor: statusBgColor,
		paddingTop: 20,
	},
	infoScrollViewContainer: {
		alignItems: 'center',
	},
	info: {
		color: '#FEFEFE',
		maxWidth: '78%',
		fontSize: 25,
		marginVertical: 10,
		textAlign: 'center',
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	playBtn: {
		marginVertical: 30,
	},
	returnBtnContainer: {
		backgroundColor: statusBgColor,
		position: 'absolute',
		justifyContent: 'center',
		paddingLeft: 10,
		height: 60,
		top: getStatusBarHeight(),
		left: 0,
		right: 0,
		zIndex: 100,
	},
});

export default MovieScreen;
