import React, {Component} from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
  TouchableOpacity, 
  View, 
  Image,
  NetInfo,
  ListView,
  InteractionManager,
  TextInput,
  ScrollView,
  ToastAndroid,
  BackAndroid,
  DatePickerAndroid,
  TouchableHighlight,
} from 'react-native';
import Netinfo from './Netinfo';
import Home from './Home';
import FacebookTabBar from './FacebookTabBar';
import SecondPageComponent from './SecondPageComponent';
import Calendar from './Calendar'; 
import Contacts from './Contacts';
import News from './News';
import Setting from './Setting';
import Application from './Application';
import Approval from './Approval';
import Operation from './Operation';
import Token from './Token';
 
import ScrollableTabView from 'react-native-scrollable-tab-view';
 
export default class FacebookExample extends Component {
	constructor(props) { 
		super(props);
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
		this.state = {   
			tabNames: ['消息', '通讯录', '应用',  '我的'], 
			Barleft: '消息',  
		};
	}
	   
    
	componentWillUnmount() { 
	   
	    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid); 
	
	}

    onBackAndroid = () => {
       
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {  
            return false; 
        }

		this.lastBackPressed = Date.now();

		ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

		return true;

	};

 
	
  render() {
	  let tabNames = this.state.tabNames;
	  let Barleft = this.state.Barleft;
    return <View style={{flex:1,}}> 
	            
				
				 
				 <ScrollableTabView  
				  style={{flex:1,flexDirection: 'column',}}
				  initialPage={0}
				  renderTabBar={() => <FacebookTabBar Barleft={Barleft} tabNames={tabNames} />}
				  tabBarPosition='bottom' 
				  scrollWithoutAnimation = {true}
				  locked = {true}
				  >  
				  <View tabLabel="ios-chatboxes" style={styles.tabView}>
				       <View style={styles.card}>  
						  <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>  
										<Text style={{color:'white',fontSize:18}}>{data.data.companyName}</Text>
							</View>
						  </View>  
						</View>
						<Netinfo  {...this.props}/>
					   <Home {...this.props}/>
				  </View>
				  <View tabLabel="ios-person" style={styles.tabView}> 
                    <View style={styles.card}>  
					  <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
						<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>  
									<Text style={{color:'white',fontSize:18}}>通讯录</Text>
						</View>
					  </View>  
					</View>		
                    <Netinfo  {...this.props}/>					
					<View style={{flex:1,}}>
					   <Contacts {...this.props}/>
					</View>
				  </View>
				  <View tabLabel="ios-keypad" style={{flex: 1,flexDirection: 'column',backgroundColor:'#ececec',}}> 
					   <Application {...this.props}/> 
				  </View>
				    
				  <ScrollView tabLabel="md-menu"  style={{flex: 1,flexDirection: 'column', }}>
					<View  style={{flex:1,flexDirection: 'column',}}>
					  <Setting   {...this.props}/>
					</View>
				  </ScrollView>  
				</ScrollableTabView>
				 
	</View>
  }   
}
        
const styles = StyleSheet.create({  
  tabView: {
    flex: 1,
    flexDirection: 'column', 
	backgroundColor:'#fafafa', 
  },   
  card: { 
    height:45,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,
    
  },
});