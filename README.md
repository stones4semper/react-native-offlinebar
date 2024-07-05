# react-native-offlinebar

A React Native component to display offline or online status on mobile devices. 

Install the package via npm: `npm install react-native-offlinebar`, 
or via yarn: `yarn add react-native-offlinebar`. 

Import `OfflineBar` in your React Native component:
```javascript
import React from 'react'; 
import { View } from 'react-native'; 
import OfflineBar from 'react-native-offlinebar'; 
const App = () => { 
    return ( 
        <View style={{ flex: 1 }}> 
            <OfflineBar bgColor="#930F1F" title="You must connect to Wi-Fi or a cellular network to get online again" /> 
            {/* Your other components */} 
        </View> 
    ); 
}; 
export default App;
