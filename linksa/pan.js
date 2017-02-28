import React from 'react';
import {
    View,
	StyleSheet,
    Navigator, 
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	ToastAndroid,
	BackAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons'; 
import pana from './pana';
var array = []; 
var aa=[];
export default class pan extends React.Component {
    
    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = { 
		 
	  };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }  
		return false;
    }
    componentDidMount() {
        
    }
	
	
	componentWillUnmount() {        
	  
	  BackAndroid.removeEventListener('hardwareBackPress', this._pressButton); 	   
	}   
	 
	_self(){
		var { navigator } = this.props; 
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'pana',
                component: pana			
            })
			})
        }
	} 
	
	
    render() {
           return (
                <View style={{flex:1,flexDirection:'column',}}>
		           <View style={styles.card}>
						  <View style={{flex:1,justifyContent:'center'}}>
									 <TouchableOpacity onPress={this._pressButton.bind(this)}>
										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>  
												<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
												<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
										  </View>
									</TouchableOpacity>  
						  </View>    
						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>  
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false}>网盘</Text>
									</View>
						  </View> 
						  <View style={{flex:1,justifyContent:'center'}}>   
									
						  </View>      
					</View>
					
					<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
					   <View style={{backgroundColor:'#fff',}}>
					     <TouchableHighlight onPress={this._self.bind(this)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,}}>
								<View style={{width: 35, height: 35,backgroundColor:'#3ea7da',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/pan_r.png')} style={{width: 20, height: 20,}} />   
								</View>
								<View style={{flex:1,marginLeft:15,borderBottomWidth:1,borderColor:'#ddd',height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text style={{color:'#666',fontSize:16}}>个人网盘</Text>
								   <Image source={require('./imgs/right.png')} style={{width: 20, height: 18,}} />   
								</View>
							 </View>
						 </TouchableHighlight>
						 <TouchableHighlight onPress={()=>console.log(1)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10}}>
								<View style={{width: 35, height: 35,backgroundColor:'#5fc7e0',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/pan_f.png')} style={{width: 20, height: 20,}} />
								</View>
								<View style={{flex:1,marginLeft:15,borderBottomWidth:1,borderColor:'#ddd',height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text style={{color:'#666',fontSize:16}}>共享网盘</Text>
								   <Image source={require('./imgs/right.png')} style={{width: 20, height: 18,}} />   
								</View>
							 </View>
						 </TouchableHighlight>
						 <TouchableHighlight onPress={()=>console.log(1)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10}}>
								<View style={{width: 35, height: 35,backgroundColor:'#5fd9e0',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/pan_g.png')} style={{width: 20, height: 20,}} />   
								</View>
								<View style={{flex:1,marginLeft:15,borderBottomWidth:1,borderColor:'#ddd',height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text style={{color:'#666',fontSize:16}}>公司网盘</Text>
								   <Image source={require('./imgs/right.png')} style={{width: 20, height: 18,}} />   
								</View>    
							 </View>
						 </TouchableHighlight>
						 <TouchableHighlight onPress={()=>console.log(1)} underlayColor="#d6d6d6">
							 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}>
								<View style={{width: 35, height: 35,backgroundColor:'#5fe0d5',alignItems:'center', justifyContent:'center'}}>
								   <Image source={require('./imgs/yun.png')} style={{width: 26, height: 26,}} />
								</View>
								<View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
								   <Text style={{color:'#666',fontSize:16}}>应用附件</Text>
								   <Image source={require('./imgs/right.png')} style={{width: 20, height: 18,}} />   
								</View>
							 </View>
						 </TouchableHighlight>
					  </View>	 
					</View>
	            </View>
           	)
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
  loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
       
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    },
	footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },

    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,
    
  },
});