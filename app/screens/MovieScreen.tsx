import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
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
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Video } from 'expo-av';
import axios from 'axios';

import ErrorModal from '../components/ErrorModal';
import { TStackScreens } from '../config/types';
import { GET_MOVIE } from '../graphql/queries';
import { colors } from '../config/config';

// PROPS TYPES
interface Props {
	route: RouteProp<TStackScreens, 'Movie'>;
	navigation: StackNavigationProp<TStackScreens, 'Movie'>;
	isInternetReachable: boolean;
}

// COMPONENT
const MovieScreen: React.FC<Props> = ({
	route,
	navigation,
	isInternetReachable,
}) => {
	const { data, loading } = useQuery(GET_MOVIE, {
		variables: { id: route.params.id },
	});

	const [showVideo, setShowVideo] = useState(false);
	const [videoLoading, setVideoLoading] = useState(false);
	const [mp4Url, setMp4Url] = useState('');
	const [mp4UrlLoading, setMp4UrlLoading] = useState(false);
	const [showError, setShowError] = useState(false);

	const errorModalTimer = useRef(0);

	const showErrorModal = () => {
		if (!showError) {
			setShowError(true);
			errorModalTimer.current = setTimeout(
				() => setShowError(false),
				2500
			);
		}
	};

	const handlePress = () => {
		if (mp4Url.trim().length > 0 && isInternetReachable) setShowVideo(true);
		else showErrorModal();
	};

	// clear timer
	useEffect(
		() => () => {
			clearTimeout(errorModalTimer.current);
		},
		[]
	);

	// extract the mp4 file
	useEffect(() => {
		(async () => {
			if (!loading && data) {
				setMp4UrlLoading(true);
				if (data.movie.streamLink.trim().length === 0) {
					setMp4Url('');
					setMp4UrlLoading(false);
					showErrorModal();
				} else {
					try {
						const res = (await axios.get(
							data.movie.streamLink
						)) as {
							data: string;
						};

						const mp4FileIndex = res.data.lastIndexOf(
							'file:"https://'
						);
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
						showErrorModal();
					}
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
			) : data ? (
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
						{mp4UrlLoading && (
							<View style={{ marginVertical: 38 }}>
								<ActivityIndicator
									size="large"
									color="#FEFEFE"
								/>
							</View>
						)}
						{!mp4UrlLoading &&
							(mp4Url.trim().length === 0 ||
								!isInternetReachable) && (
								<TouchableOpacity
									activeOpacity={0.4}
									onPress={handlePress}
									style={{ marginVertical: 30 }}
								>
									<AntDesign
										name="close"
										size={50}
										color="#fde9df"
									/>
								</TouchableOpacity>
							)}
						{!mp4UrlLoading &&
							mp4Url.trim().length > 0 &&
							isInternetReachable && (
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

					<ErrorModal
						show={showError}
						message={
							isInternetReachable
								? 'Cannot fetch streaming link. Please try later.'
								: 'No Internet Connection'
						}
						onRequestClose={() => {
							setShowError(false);
							clearTimeout(errorModalTimer.current);
						}}
					/>

					<Modal
						animationType="fade"
						visible={showVideo}
						statusBarTranslucent={showVideo}
						onRequestClose={() => setShowVideo(false)}
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
							onError={() => {
								setShowVideo(false);
								showErrorModal();
							}}
						/>
					</Modal>
				</ImageBackground>
			) : (
				<View style={styles.noInternetContainer}>
					<Text style={styles.noInternetText}>
						No Internet Connection
					</Text>
				</View>
			)}
			<StatusBar
				style="light"
				backgroundColor={statusBgColor}
				hidden={showVideo}
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
	noInternetContainer: {
		backgroundColor: colors.error,
		alignItems: 'center',
		paddingVertical: 5,
		marginTop: getStatusBarHeight() + 60,
	},
	noInternetText: {
		color: '#FEFEFE',
		fontSize: 20,
		textAlign: 'center',
	},
});

export default MovieScreen;
