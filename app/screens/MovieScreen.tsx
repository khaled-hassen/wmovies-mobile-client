import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
	Modal,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from '@apollo/client';
import { Ionicons, Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Video } from 'expo-av';
import axios from 'axios';

import { TStackScreens } from '../config/types';
import { GET_MOVIE } from '../graphql/queries';

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

	const [show, setShow] = useState(false);
	const [videoLoading, setVideoLoading] = useState(false);
	const [mp4Url, setMp4Url] = useState('');
	const [mp4UrlLoading, setMp4UrlLoading] = useState(false);

	const handlePress = () => {
		// TODO add error modal
		if (mp4Url.trim().length > 0) setShow(true);
	};

	// extract the mp4 file
	useEffect(() => {
		(async () => {
			if (!loading && data) {
				setMp4UrlLoading(true);
				if (data.movie.streamLink.trim().length === 0) {
					setMp4Url('');
					setMp4UrlLoading(false);
				}

				try {
					const res = (await axios.get(data.movie.streamLink)) as {
						data: string;
					};

					const mp4FileIndex = res.data.lastIndexOf('file:"https://');
					const fileExtensionIndex = res.data.indexOf('mp4');

					const mp4File = res.data.slice(
						mp4FileIndex + 'file:"'.length,
						fileExtensionIndex + 'mp4'.length
					);
					setMp4Url(mp4File);
					setMp4UrlLoading(false);
				} catch {
					setMp4Url('');
					setMp4UrlLoading(false);
				}
			}
		})();
	}, [data, loading]);

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
						{mp4UrlLoading ? (
							<View style={{ marginVertical: 38 }}>
								<ActivityIndicator
									size="large"
									color="#FEFEFE"
								/>
							</View>
						) : (
							<TouchableOpacity
								activeOpacity={0.4}
								onPress={handlePress}
								style={{ marginVertical: 30 }}
							>
								<Feather
									name="play"
									size={50}
									color="#fde9df"
								/>
							</TouchableOpacity>
						)}
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
					</ScrollView>

					<Modal
						animationType="fade"
						visible={show}
						statusBarTranslucent={show}
						onRequestClose={() => setShow(false)}
					>
						{videoLoading && (
							<View style={styles.videoLoader}>
								<ActivityIndicator
									size="large"
									color="#FEFEFE"
								/>
							</View>
						)}
						<Video
							source={{ uri: mp4Url }}
							rate={1.0}
							volume={1.0}
							isMuted={false}
							shouldPlay
							resizeMode="contain"
							style={styles.videoPlayer}
							useNativeControls
							onLoadStart={() => setVideoLoading(true)}
							onLoad={() => setVideoLoading(false)}
							onError={() => 0 /*// TODO add error modal */}
						/>
					</Modal>
				</ImageBackground>
			)}
			<StatusBar
				style="light"
				backgroundColor={statusBgColor}
				hidden={show}
			/>
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
	videoPlayer: {
		backgroundColor: 'black',
		width: '100%',
		height: '100%',
	},
	videoLoader: { position: 'absolute', zIndex: 100, top: '46%', left: '46%' },
});

export default MovieScreen;
