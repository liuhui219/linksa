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
  Animated,
  StatusBar,
  Dimensions,
  ToastAndroid,
  BackAndroid,
  DatePickerAndroid,
  Easing,
  TouchableHighlight,
} from 'react-native';
import Netinfo from './Netinfo';
import Home from './Home';
import FacebookTabBar from './FacebookTabBar';
import SecondPageComponent from './SecondPageComponent';
import TabNavigator from 'react-native-tab-navigator';
import Calendar from './Calendar'; 
import Contacts from './Contacts';
import News from './News';
import Add from './Add';
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
			selectedTab:'home',
			isshow:false,
			bars:'light-content',
			day:'',
			date:'',
			yearM:'',
			opacitys:new Animated.Value(0),
			bot1: new Animated.Value(-120),
			spin: new Animated.Value(0),
			bot2: new Animated.Value(-120),
			bot3: new Animated.Value(-120),
			bot4: new Animated.Value(-120),
			weekday:['日','一','二','三','四','五','六'],
			bgc:'#4385f4',
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
    
	adds(){
		this.setState({
		  bgc:'#4385f4',
	  })
	var { navigator } = this.props; 
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Add',
                component: Add,
            })
			})
        }
        setTimeout(()=>{
	        this.setState({
	          isshow: false,
	          bars:'light-content',
	          opacitys:new Animated.Value(0),
				bot1: new Animated.Value(-120),
				spin: new Animated.Value(0),
				bot2: new Animated.Value(-120),
				bot3: new Animated.Value(-120),
				bot4: new Animated.Value(-120),
	        })
       },800);
}
	
	
    Gdate(n){   
	  if(n<10){
	     return '0'+n;
	  }  
	   else{ 
	       return ''+n;
	  }
	}	
	
  oncancel(){
	  this.setState({
		  bgc:'#4385f4',
	  })
     setTimeout(()=>{
      this.setState({
          isshow: false,
          bars:'light-content',
		  
        })
       },450);
      Animated.parallel([
    Animated.timing(         
       this.state.bot1,    
       {toValue: -120,
        duration: 300,
        delay:250,
        easing: Easing.elastic(1),
      },          
    ),

    Animated.timing(         
       this.state.bot2,    
       {toValue: -120,
        duration: 300,
        delay:200,
        easing: Easing.elastic(1),
      },          
    ),

    Animated.timing(         
       this.state.bot3,    
       {toValue: -120,
        duration: 300,
        delay:150,
        easing: Easing.elastic(1),
      },          
    ),

    Animated.timing(         
       this.state.bot4,    
       {toValue: -120,
        duration: 300,
        delay:100,
        easing: Easing.elastic(1),
      },          
    ),

    Animated.timing(         
       this.state.opacitys,    
       {toValue: -0,
        duration: 300,
        delay:200, 
      },          
    ),
    Animated.timing(         
       this.state.spin,    
       {toValue: 0,
        duration: 400,
        easing: Easing.elastic(1),
      },          
    )
    ]).start();
  }

  
  onclick(){
  	this.setState({
	  bgc:'rgb(230,230,230)',
      isshow: true,
      bars:'default',
      day:'星期'+this.state.weekday[new Date().getDay()],
      date:this.Gdate(new Date().getDate()),
      yearM:this.Gdate(new Date().getMonth()+1)+'/'+ new Date().getFullYear(),
    });
  Animated.parallel([
    Animated.timing(         
       this.state.bot1,    
       {toValue: 200,
        duration: 300,
        delay:100,
        easing: Easing.elastic(1.1),
      },          
    ),

    Animated.timing(         
       this.state.bot2,    
       {toValue: 200,
        duration: 300,
        delay:150,
        easing: Easing.elastic(1.1),
      },          
    ),

    Animated.timing(         
       this.state.bot3,    
       {toValue: 200,
        duration: 300,
        delay:200,
        easing: Easing.elastic(1.1),
      },          
    ),

    Animated.timing(         
       this.state.bot4,    
       {toValue: 200,
        duration: 300,
        delay:250,
        easing: Easing.elastic(1.1),
      },          
    ),

    Animated.timing(         
       this.state.opacitys,    
       {toValue: 1,
        duration: 400,  
      },          
    ),

    Animated.timing(         
       this.state.spin,    
       {toValue: 1,
        duration: 900,
        easing: Easing.elastic(1),
      },          
    )
    ]).start();
  }
	
  render() {
	  let tabNames = this.state.tabNames;
	  let Barleft = this.state.Barleft;
	  let spins = this.state.spin.interpolate({
	    inputRange: [0, 1],
	    outputRange: ["0deg", "45deg"]
	  })
    return (
	         <View style={{height:Dimensions.get('window').height-25,width:Dimensions.get('window').width}}>
				<StatusBar
					animated = {true} 
					hidden={false} 
					backgroundColor={this.state.bgc}
					barStyle={this.state.bars}   
					translucent={false}    
					 
				 /> 
	            <TabNavigator tabBarStyle={{ height: 52,}} sceneStyle={{backgroundColor:'#fff'}}>
				  <TabNavigator.Item
					selected={this.state.selectedTab === 'home'}
					title="消息"
					renderIcon={() => <Image source={require('./imgs/newsx.png')} />}
                    renderSelectedIcon={() => <Image source={require('./imgs/news.png')} />}
					selectedTitleStyle={{color:'#4385f4'}} 
					titleStyle={{color:'#aaa'}}
                    allowFontScaling={false}					
					onPress={() => this.setState({ selectedTab: 'home' })}>
					<Home {...this.props}/>
				  </TabNavigator.Item>
				  <TabNavigator.Item
					selected={this.state.selectedTab === 'Contacts'}
					title="通讯录"
					renderIcon={() => <Image source={require('./imgs/contacts.png')} />}
                    renderSelectedIcon={() => <Image source={require('./imgs/contact.png')} />} 
					selectedTitleStyle={{color:'#4385f4'}} 
					titleStyle={{color:'#aaa'}}
                    allowFontScaling={false}					
					onPress={() => this.setState({ selectedTab: 'Contacts' })}>
					<Contacts {...this.props}/>
				  </TabNavigator.Item>
				  <TabNavigator.Item 
					renderIcon={() => <Image source={require('./imgs/add.png')} style={{top:8,width:50,height:47}}/>} 
					onPress={this.onclick.bind(this)}>  
					tabStyle={{marginTop:15,backgroundColor:'red'}}
				  </TabNavigator.Item>
				  <TabNavigator.Item
					selected={this.state.selectedTab === 'Application'}
					title="应用" 
					renderIcon={() => <Image source={require('./imgs/keypad.png')} />}
                    renderSelectedIcon={() => <Image source={require('./imgs/keypads.png')} />}
                    selectedTitleStyle={{color:'#4385f4'}} 
					titleStyle={{color:'#aaa'}}					
                    allowFontScaling={false}					
					onPress={() => this.setState({ selectedTab: 'Application' })}>
					<Application {...this.props}/> 
				  </TabNavigator.Item>
				  <TabNavigator.Item
					selected={this.state.selectedTab === 'Setting'}
					title="我的"
					renderIcon={() => <Image source={require('./imgs/person.png')} />}
                    renderSelectedIcon={() => <Image source={require('./imgs/persons.png')} />}
                    selectedTitleStyle={{color:'#4385f4'}} 
					titleStyle={{color:'#aaa'}}					
					allowFontScaling={false}
					onPress={() => this.setState({ selectedTab: 'Setting' })}>
					<Setting   {...this.props}/>
				  </TabNavigator.Item>
				</TabNavigator>
				{this.state.isshow ? <Animated.View style={{opacity:this.state.opacitys,height:Dimensions.get('window').height,width:Dimensions.get('window').width,position:'absolute',top:0,left:0,backgroundColor:'rgb(230,230,230)'}}>
                     <View style={{width:Dimensions.get('window').width,position:'absolute',bottom:25,left:0,height:50,alignItems:'center',justifyContent:'center'}}>
                     <TouchableHighlight onPress={this.oncancel.bind(this)} activeOpacity = {1} underlayColor='transparent' style={{height:50,alignItems:'center',justifyContent:'center',}}> 
                          <Animated.Image source={require('./imgs/plus.png')} style={{width: 30, height: 30,transform: [{rotate: spins}]}} />
                              
                         
                     </TouchableHighlight> 
                     </View>
                     <View style={{flexDirection:'row',marginTop:50,marginLeft:15,}}>
                         <View>
                             <Text style={{fontSize:54,color:'#555',letterSpacing:-2,  }} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.date}</Text>
                         </View>
                         <View style={{marginLeft:10}}>
                             <Text style={{marginTop:15,color:'#777',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.day}</Text>
                             <Text style={{marginTop:10,color:'#777',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.yearM}</Text>
                         </View>
                     </View>

                    
                           <Animated.View style={[styles.posisa,{bottom:this.state.bot1}]}>
                             <TouchableHighlight onPress={this.adds.bind(this)} underlayColor='transparent' style={{width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,alignItems:'center',justifyContent:'center',}}>
                               <View   style={{width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,alignItems:'center',justifyContent:'center',}}>
                               <View style={{width: 58, height: 58,borderRadius:29,backgroundColor:'#3BAFDA',alignItems:'center', justifyContent:'center'}}>
							      <Image source={require('./imgs/rc.png')} style={{width: 26, height: 26,}} />
							   </View>
							   <Text style={{marginTop:8,fontSize:12,}}allowFontScaling={false} adjustsFontSizeToFit={false}>
							      新建日程
							   </Text>
							   </View>
							 </TouchableHighlight> 
                           </Animated.View>

                           <Animated.View style={[styles.posisb,{bottom:this.state.bot2}]}>
                               <View style={{width: 58, height: 58,borderRadius:29,backgroundColor:'#cc3932',alignItems:'center', justifyContent:'center'}}>
							      <Image source={require('./imgs/gust.png')} style={{width: 26, height: 26,}} />
							   </View>
							   <Text style={{marginTop:8,fontSize:12,}}allowFontScaling={false} adjustsFontSizeToFit={false}>
							      新建客户
							   </Text>
                           </Animated.View>

                           <Animated.View style={[styles.posisc,{bottom:this.state.bot3}]}>
                               <View style={{width: 58, height: 58,borderRadius:29,backgroundColor:'#cc8732',alignItems:'center', justifyContent:'center'}}>
							      <Image source={require('./imgs/rc.png')} style={{width: 24, height: 24,}} />
							   </View>
							   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false} adjustsFontSizeToFit={false}>
							      新建日程
							   </Text>
                           </Animated.View>

                           <Animated.View style={[styles.posisd,{bottom:this.state.bot4}]}>
                               <View style={{width: 58, height: 58,borderRadius:29,backgroundColor:'#32ccb6',alignItems:'center', justifyContent:'center'}}>
							      <Image source={require('./imgs/rc.png')} style={{width: 24, height: 24,}} />
							   </View>
							   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false} adjustsFontSizeToFit={false}>
							      新建日程
							   </Text>
                           </Animated.View>
                           
                      
                      
			      </Animated.View> : null}
				 
			   </View>	  
				 
	 
	);
  }   
}
        
const styles = StyleSheet.create({  
  tabView: {
    flex: 1,
    flexDirection: 'column', 
	backgroundColor:'#fafafa', 
  },
posisa:{
  	width:Dimensions.get('window').width/4,
  	height:Dimensions.get('window').width/4,
  	alignItems:'center',
  	justifyContent:'center',
  	position:'absolute',
  	bottom:200,
  	left:0
  }, 
  posisb:{
  	width:Dimensions.get('window').width/4,
  	height:Dimensions.get('window').width/4,
  	alignItems:'center',
  	justifyContent:'center',
  	position:'absolute',
  	bottom:200,
  	left:Dimensions.get('window').width/4
  },
  posisc:{
  	width:Dimensions.get('window').width/4,
  	height:Dimensions.get('window').width/4,
  	alignItems:'center',
  	justifyContent:'center',
  	position:'absolute',
  	bottom:200,
  	left:Dimensions.get('window').width/2
  },
  posisd:{
  	width:Dimensions.get('window').width/4,
  	height:Dimensions.get('window').width/4,
  	alignItems:'center',
  	justifyContent:'center',
  	position:'absolute',
  	bottom:200,
  	left:Dimensions.get('window').width/4*3
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