//根据页面
'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  Navigator,
  StatusBar,
  BackAndroid,
  InteractionManager,
  View,
  Platform
} from 'react-native';

import Splash from './Splash';

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19
var _navigator;
class rootApp extends Component {
    constructor(props) {
       super(props);
       this.renderScene = this.renderScene.bind(this);
     
	   this.state = {
	  	translucent:true,
		backgroundColor:'rgba(255, 255, 255, 0)'
	   };  
   }
  componentDidMount() {
    
     
		   
        this.setState({ translucent: false,backgroundColor:'#4385f4' });
       
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
 
  renderScene(route, navigator) {
    let Component = route.component;
    _navigator = navigator;
    return (
      <Component navigator={navigator} {...route.params} route={route} />
    );
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }
  
  render() {   
    return (
      <View style={{flex: 1}}>
        <StatusBar
		    backgroundColor={'#4385f4'} 
			barStyle="light-content"   
			translucent={false}    
            style={{height: STATUS_BAR_HEIGHT}}
       />  
        <Navigator
          ref='navigator'
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          initialRoute={{
            component: Splash,
            name: 'Splash'
          }}
        />
      </View>
    );
  } 
}
let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default rootApp;

