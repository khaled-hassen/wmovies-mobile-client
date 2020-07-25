import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import HomeScreen from './app/screens/HomeScreen';
import colors from './app/config/colors';

const client = new ApolloClient({
	uri: 'https://wmovies-api.herokuapp.com/graphql',
	cache: new InMemoryCache(),
});

const App: React.FC = () => {
	return (
		<ApolloProvider client={client}>
			<SafeAreaView style={styles.container}>
				<HomeScreen />
				<StatusBar style="light" />
			</SafeAreaView>
		</ApolloProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.dark,
	},
});

export default App;
