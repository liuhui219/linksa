import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator, 
	TouchableOpacity,
	Text,
	DatePickerAndroid,
	TimePickerAndroid,
	ScrollView,
	ToastAndroid,
	TextInput,
	Animated,
	StatusBar,
	ActivityIndicator,  
	WebView,
	Dimensions,
	BackAndroid, 
	Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'; 
import Picker from 'react-native-picker' 
import Token from './Token';
import Netinfo from './Netinfo';
import Application from './Application'; 
 
 
var WEBVIEW_REF = 'webview';
export default class Webviewst extends Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton); 
        this.state = {   
			 isfalse:false,
			 isshow:true,
			 isreload:true,
			 url:'',
			 isloading:false,
		};
    }
    
	componentDidMount() {  
		 this.setState({
			url:this.props.url,
		 })
		
	  }
	
	
	_pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.popToTop({   
				component: Application,
				name: 'Application'
			});
			return true;
        }  
		return false;   
    } 
    
	componentWillUnmount() {  
	
	    BackAndroid.removeEventListener('hardwareBackPress', this._pressButton); 
	
	}                                                                                                                       
	onNavigationStateChange(navState) {   
		 
		 
		 
			this.setState({  
				isfalse:true,
				 
			})
		 
	 }
	
	renderLoading(){  
		   return(
		        <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-60,width:Dimensions.get('window').width, position:'absolute',top:0,left:0,}}>
					 
				     <View style={styles.loading}>
						<ActivityIndicator color="#999" size="large"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>正在加载中...</Text>
					</View>
				</View>
				
		   )      
	} 
	
	renderError(){               
        	                                                                              
		if(this.state.isreload){
		return(
		   <View>
		     
			 <TouchableOpacity activeOpacity={1} onPress={this._shuax.bind(this)}>
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-60,}}>
				    <Icon name="ios-refresh-outline" color="#ccc"size={60}  />
				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#ccc'}}>点击屏幕，重新加载</Text>                  
				</View>
			  </TouchableOpacity> 
			   		  
          </View>			  
		   )                                                                                                                           
		}else{
			return(
			    <View></View>            
			)
		}
	}
	
	_shuax(){ 
	    
		this.setState({
			isshow: true,    
            isfalse: true,  
            isloading:true,			
		});    
        this.refs[WEBVIEW_REF].reload();
		
	}
	
	onLoad(){       
		 
		this.setState({                
				isshow:false,
			})
	}
	
	onLoadEnd(){
		                                                                     
		this.setState({                       			
			url:this.props.url,
			isloading:false,
		});  
	}
	
	onError(){
		     
		this.setState({
			isshow: true,    
            isfalse: false,        
            isloading:false,					
		}); 
	}
	
    render() {
    return (                       
	   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
			   <StatusBar
			        animated = {true}
					backgroundColor={'#4385f4'}
					hidden={false} 
					barStyle="light-content"   
					translucent={false}    
					style={{height: 25}}
				 />
			  {this.state.isfalse ? <View style={styles.card}>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity onPress={this._pressButton.bind(this)}>
								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>  
								        <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:16,marginLeft:-5,}}>返回</Text>
								  </View>
							</TouchableOpacity>  
				  </View>    
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>  
										<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'white',fontSize:18}}></Text>
							</View>
				  </View> 
				  <View style={{flex:1,justifyContent:'center'}}>   
							
				  </View>         
			  </View> : null} 
             <WebView style={{  flex:1,}}   
                  ref={WEBVIEW_REF}			 
				  source={{uri:this.props.url}}       
				  startInLoadingState={true}
				  domStorageEnabled={false}                                        
				  scalesPageToFit={false}    
				  onLoad = {this.onLoad.bind(this)}
				  renderLoading={this.renderLoading.bind(this)} 
                  onNavigationStateChange={this.onNavigationStateChange.bind(this)}				  
				  javaScriptEnabled={true} 
				  onError={this.onError.bind(this)} 
				  renderError={this.renderError.bind(this)}
				  onLoadEnd={this.onLoadEnd.bind(this)}
			  >
			 </WebView>     
             
			 {this.state.isloading ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-60,width:Dimensions.get('window').width,backgroundColor:'#fff',position:'absolute',top:0,left:0,}}>
				     <View style={styles.loading}>
						<ActivityIndicator color="#999" size="large"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>正在加载...</Text>
					</View>
				</View> : <View></View>}
			                          
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