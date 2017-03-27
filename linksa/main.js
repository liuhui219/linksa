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
import Icon from 'react-native-vector-icons/Ionicons';
import weather from './weather';
import PushNotification from 'react-native-push-notification';
import ScrollableTabView from 'react-native-scrollable-tab-view'; 
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map'; 
import io from "socket.io-client/socket.io";
window.navigator.userAgent = "react-native";
const socket = io('http://192.168.1.156:3000',{ jsonp:false});

socket.on('newMsg',(user, msg, color) => {
			PushNotification.localNotification({
			 
				id: '0', 
				ticker: "My Notification Ticker", 
				autoCancel: true, 
				largeIcon: "ic_launcher", 
				smallIcon: "ic_notification", 
				bigText: "My big text that will be shown when notification is expanded", 
				subText: msg, 
				color: "blue", 
				vibrate: true,  
				vibration: 300, 
				tag: 'some_tag', 
				group: "group", 
				ongoing: false,  
				title: msg, 
				message: "今天天气很好！！！",  
				playSound: true,    
				soundName: 'default',            
				number: '1' // (Android only) See the doc for notification actions to know more
			}); 
		})
 
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
			isshows:false,
			infost:'',
			longitude:'',
			latitude:'',
			location:'',
			Datas:{},
			images:null,
			infos:'',
			times:'',
			weathers:false,
		};
	}
	
    componentDidMount() {
		
		this.location();
	}
	componentWillUnmount() { 
	    
	    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid); 
	
	}
    
	
	location(){
		var that = this;
		Geolocation.getCurrentPosition()
              .then(data => { 
				  if(data.country == undefined){  
					  this.setState({
						 
						  statua: true,                                                          
			              loaded: true,
					  })
                      
				  }else{    
					 this.setState({    
						  map:data.address,
						  longitude:data.longitude,
						  latitude:data.latitude,
						  isfalse:true, 
						  location:data.latitude +':'+ data.longitude,  
					  })
					  that.fetchData();
				  }
              })
              .catch(e =>{
               
              })
		
		
	 
 }
	
	fetchData(){
     fetch('https://api.thinkpage.cn/v3/weather/now.json?key=ptzo3jrfv3tq1wez&location='+this.state.location+'&language=zh-Hans&unit=c')
		  .then((response) => response.json())   
		  .then((responseData) => {  
		  
              console.log(responseData)
              this.setState({Datas:responseData.results[0],times:responseData.results[0].last_update.slice(11,16),weathers:true,});
              if(responseData.results[0].now['code'] == 0){
                 this.setState({images:require('./imgs/weather/0.png'),infos:'晴'})
              }else if(responseData.results[0].now['code'] == 1){
              	 this.setState({images:require('./imgs/weather/1.png'),infos:'晴'})
              }else if(responseData.results[0].now['code'] == 2){
              	 this.setState({images:require('./imgs/weather/2.png'),infos:'晴'})
              }else if(responseData.results[0].now['code'] == 3){
              	 this.setState({images:require('./imgs/weather/3.png'),infos:'晴'})
              }else if(responseData.results[0].now['code'] == 4){
              	 this.setState({images:require('./imgs/weather/4.png'),infos:'多云'})
              }else if(responseData.results[0].now['code'] == 5){
              	 this.setState({images:require('./imgs/weather/5.png'),infos:'晴转多云'})
              }else if(responseData.results[0].now['code'] == 6){
              	 this.setState({images:require('./imgs/weather/6.png'),infos:'晴转多云'})
              }else if(responseData.results[0].now['code'] == 7){
              	 this.setState({images:require('./imgs/weather/7.png'),infos:'大部多云'})
              }else if(responseData.results[0].now['code'] == 8){
              	 this.setState({images:require('./imgs/weather/8.png'),infos:'大部多云'})
              }else if(responseData.results[0].now['code'] == 9){
              	 this.setState({images:require('./imgs/weather/9.png'),infos:'阴'})
              }else if(responseData.results[0].now['code'] == 10){
              	 this.setState({images:require('./imgs/weather/10.png'),infos:'阵雨'})
              }else if(responseData.results[0].now['code'] == 11){
              	 this.setState({images:require('./imgs/weather/11.png'),infos:'雷阵雨'})
              }else if(responseData.results[0].now['code'] == 12){
              	 this.setState({images:require('./imgs/weather/12.png'),infos:'雷阵雨伴有冰雹'})
              }else if(responseData.results[0].now['code'] == 13){
              	 this.setState({images:require('./imgs/weather/13.png'),infos:'小雨'})
              }else if(responseData.results[0].now['code'] == 14){
              	 this.setState({images:require('./imgs/weather/14.png'),infos:'中雨'})
              }else if(responseData.results[0].now['code'] == 15){
              	 this.setState({images:require('./imgs/weather/15.png'),infos:'大雨'})
              }else if(responseData.results[0].now['code'] == 16){
              	 this.setState({images:require('./imgs/weather/16.png'),infos:'暴雨'})
              }else if(responseData.results[0].now['code'] == 17){
              	 this.setState({images:require('./imgs/weather/17.png'),infos:'大暴雨'})
              }else if(responseData.results[0].now['code'] == 18){
              	 this.setState({images:require('./imgs/weather/18.png'),infos:'特大暴雨'})
              }else if(responseData.results[0].now['code'] == 19){
              	 this.setState({images:require('./imgs/weather/19.png'),infos:'冻雨'})
              }else if(responseData.results[0].now['code'] ==20){
              	 this.setState({images:require('./imgs/weather/20.png'),infos:'雨夹雪'})
              }else if(responseData.results[0].now['code'] == 21){
              	 this.setState({images:require('./imgs/weather/21.png'),infos:'阵雪'})
              }else if(responseData.results[0].now['code'] == 22){
              	 this.setState({images:require('./imgs/weather/22.png'),infos:'小雪'})
              }else if(responseData.results[0].now['code'] == 23){
              	 this.setState({images:require('./imgs/weather/23.png'),infos:'中雪'})
              }else if(responseData.results[0].now['code'] == 24){
              	 this.setState({images:require('./imgs/weather/24.png'),infos:'大雪'})
              }else if(responseData.results[0].now['code'] == 25){
              	 this.setState({images:require('./imgs/weather/25.png'),infos:'暴雪'})
              }else if(responseData.results[0].now['code'] == 26){
              	 this.setState({images:require('./imgs/weather/26.png'),infos:'浮尘'})
              }else if(responseData.results[0].now['code'] == 27){
              	 this.setState({images:require('./imgs/weather/27.png'),infos:'扬沙'})
              }else if(responseData.results[0].now['code'] == 28){
              	 this.setState({images:require('./imgs/weather/28.png'),infos:'沙尘暴'})
              }else if(responseData.results[0].now['code'] == 29){
              	 this.setState({images:require('./imgs/weather/29.png'),infos:'强沙尘暴'})
              }else if(responseData.results[0].now['code'] == 30){
              	 this.setState({images:require('./imgs/weather/30.png'),infos:'雾'})
              }else if(responseData.results[0].now['code'] == 31){
              	 this.setState({images:require('./imgs/weather/31.png'),infos:'霾'})
              }else if(responseData.results[0].now['code'] == 32){
              	 this.setState({images:require('./imgs/weather/32.png'),infos:'风'})
              }else if(responseData.results[0].now['code'] == 33){
              	 this.setState({images:require('./imgs/weather/33.png'),infos:'大风'})
              }else if(responseData.results[0].now['code'] == 34){
              	 this.setState({images:require('./imgs/weather/34.png'),infos:'飓风'})
              }else if(responseData.results[0].now['code'] == 35){
              	 this.setState({images:require('./imgs/weather/35.png'),infos:'热带风暴'})
              }else if(responseData.results[0].now['code'] == 36){
              	 this.setState({images:require('./imgs/weather/36.png'),infos:'龙卷风'})
              }
		  })
		  .catch((error) => {
			  
			                                                                      
		  });
 }
	
	
	reloads(){
		this.location();
	 }
	 
	 ck(){
		var that = this;
		this.setState({
		  bgc:'#4385f4',
	    })
		var { navigator } = this.props; 
			if(navigator) {
				InteractionManager.runAfterInteractions(() => {
				navigator.push({
					name: 'weather',
					component: weather,
					params: {
						datas: that.state.Datas,
						images:that.state.images,
						location:that.state.location
					}
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
                     <View style={{flexDirection:'row',marginTop:30,marginLeft:15,}}>
                         <View>
                             <Text style={{fontSize:54,color:'#555',letterSpacing:-2,  }} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.date}</Text>
                         </View>
                         <View style={{marginLeft:10}}>
                             <Text style={{marginTop:15,color:'#777',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.day}</Text>
                             <Text style={{marginTop:10,color:'#777',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.yearM}</Text>
                         </View>
                     </View>
                     {this.state.weathers ? <TouchableHighlight onPress={this.reloads.bind(this)} underlayColor='transparent' activeOpacity = {1} style={{position:'absolute',top:45,right:20,alignItems:'center',flexDirection:'column'}}>
	                     <View style={{alignItems:'center',flexDirection:'column'}}>
	                         
	                            <Text style={{fontSize:12}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.times}更新</Text>    
	                            <Icon name="ios-refresh-outline" color="#666"size={30}  />
	                          
	                     </View>
                     </TouchableHighlight> : null}                                                                          
                     {this.state.weathers ? <View style={{marginTop:20,flexDirection:'row',marginRight:18,width:Dimensions.get('window').width}}>
                         <View style={{flexDirection:'column',flex:1,alignItems:'flex-start',justifyContent:'flex-start',position:'absolute',top:10,left:15}}> 
                            <Text style={{marginBottom:5,fontSize:12}} allowFontScaling={false} adjustsFontSizeToFit={false}>所在城市</Text>
                            <Text style={{fontSize:16,fontFamily:'CourierNewPSMT',}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.Datas.location['name']}</Text>
                         </View>
                         <View style={{alignItems:'center',flexDirection:'column',justifyContent:'center',width:Dimensions.get('window').width}}>    
                            <View>
                                <Image source={this.state.images} style={{width: 80, height: 80,}} />
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', }}> 
                                <Text style={{fontSize:24,color:'#666'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.Datas.now['temperature']}° / {this.state.Datas.now['text']}</Text>
                            
                            </View> 
                         </View>
                         <View style={{flex:1}}> 
                               
                         </View>
                     </View> : null}
                     {this.state.weathers ? <View style={{alignItems:'center',marginTop:10}}> 
                       <TouchableHighlight onPress={this.ck.bind(this)} underlayColor='transparent' activeOpacity = {1}>
                        <View style={{alignItems:'center',}}>
                          <Text style={{color:'#666',fontSize:12,}} allowFontScaling={false} adjustsFontSizeToFit={false}>查看详情></Text>
                        </View>  
                        </TouchableHighlight> 
                     </View> : null}
                    
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