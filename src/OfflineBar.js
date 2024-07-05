import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { SafeAreaView, StatusBar, Animated, Easing, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

const createStyles = (theme) => {
	return StyleSheet.create({
			container: {
			paddingTop: 16,
		},
		statusText: {
			color: '#fff',
			padding: 8,
			textAlign: 'center',
			fontWeight: '500',
			fontSize: 14,
		},
	});
};

const OfflineBar = ({bgColor='#930F1F', title='You must connect to Wi-fi or a cellular network to get online again'}) => {
	const theme = useTheme();
	const styles = useMemo(() => createStyles(theme), [theme]);

	const animationConstants = useMemo(
		() => ({
			DURATION: 800,
			TO_VALUE: 4,
			INPUT_RANGE: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
			OUTPUT_RANGE: [0, -15, 0, 15, 0, -15, 0, 15, 0],
		}), [],
	);

	const [connected, setConnected] = useState(null);
	const animation = useRef(new Animated.Value(0)).current;

	const triggerAnimation = useCallback(() => {
		animation.setValue(0);
		Animated.timing(animation, {
			duration: animationConstants.DURATION,
			toValue: animationConstants.TO_VALUE,
			useNativeDriver: true,
			easing: Easing.bounce,
		}).start();
	}, [animation, animationConstants]);

	useEffect(() => {
		const checkInitialConnection = async () => {
			const state = await NetInfo.fetch();
			const { isConnected } = state;
			console.log('Initial connectivity:', isConnected);
			setConnected(isConnected);
		};

		checkInitialConnection();

		const unsubscribe = NetInfo.addEventListener(state => {
			const { isConnected } = state;
			console.log('Connectivity changed:', isConnected);
			setConnected(isConnected);
			triggerAnimation();
		});

		return () => {
			unsubscribe();
		};
	}, [triggerAnimation]);

	const interpolated = animation.interpolate({
		inputRange: animationConstants.INPUT_RANGE,
		outputRange: animationConstants.OUTPUT_RANGE,
	});
	const animationStyle = {
		transform: [{ translateX: interpolated }],
	};
  

	return !connected ? (
		<SafeAreaView style={{...styles.container, backgroundColor: bgColor}}>
			<StatusBar backgroundColor={bgColor} />
			<Animated.Text style={[styles.offlineText, animationStyle]}>
				{title}
			</Animated.Text>
		</SafeAreaView>
	) : null;
};

export default OfflineBar;