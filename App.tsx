import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
	NavigationContainer,
	Theme,
	DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TStackScreens } from './app/config/types';
import MovieScreen from './app/screens/MovieScreen';
import HomeScreens from './app/screens/HomeScreens';
import Search from './app/screens/Search';
import SearchButton from './app/components/SearchButton';
import SearchInput from './app/components/SearchInput';
import { colors } from './app/config/config';

const client = new ApolloClient({
	uri: 'https://wmovies-api.herokuapp.com/graphql',
	cache: new InMemoryCache(),
});

// NAVIGATION
const Stack = createStackNavigator<TStackScreens>();

const App: React.FC = () => {
	const [movieSearch, setMovieSearch] = useState('');
	const { isInternetReachable } = useNetInfo();

	return (
		<SafeAreaView style={styles.container}>
			<ApolloProvider client={client}>
				<NavigationContainer theme={theme}>
					<Stack.Navigator initialRouteName="Home">
						<Stack.Screen
							name="Home"
							options={({ navigation }) => ({
								headerRight: () => (
									<SearchButton
										onPress={() =>
											navigation.navigate('Search')
										}
									/>
								),
							})}
						>
							{(props) => (
								<React.Fragment>
									{!isInternetReachable && (
										<View
											style={styles.noInternetContainer}
										>
											<Text style={styles.noInternetText}>
												No Internet Connection
											</Text>
										</View>
									)}
									<HomeScreens {...props} />
								</React.Fragment>
							)}
						</Stack.Screen>
						<Stack.Screen
							name="Movie"
							options={{ headerShown: false }}
						>
							{(props) => (
								<MovieScreen
									{...props}
									isInternetReachable={!!isInternetReachable}
								/>
							)}
						</Stack.Screen>
						<Stack.Screen
							listeners={{
								beforeRemove: () => setMovieSearch(''),
							}}
							name="Search"
							options={{
								headerTitle: () => (
									<SearchInput
										value={movieSearch}
										onClear={() => setMovieSearch('')}
										onChangeText={(val) =>
											setMovieSearch(val)
										}
									/>
								),
							}}
						>
							{(props) => (
								<React.Fragment>
									{!isInternetReachable && (
										<View
											style={styles.noInternetContainer}
										>
											<Text style={styles.noInternetText}>
												No Internet Connection
											</Text>
										</View>
									)}
									<Search
										{...props}
										movie={movieSearch}
										isInternetReachable={
											!!isInternetReachable
										}
									/>
								</React.Fragment>
							)}
						</Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar style="light" />
			</ApolloProvider>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	noInternetContainer: {
		backgroundColor: colors.error,
		alignItems: 'center',
		paddingVertical: 5,
	},
	noInternetText: {
		color: '#FEFEFE',
		fontSize: 20,
		textAlign: 'center',
	},
});

const theme: Theme = {
	...DarkTheme,
};

export default App;
