import React from 'react';
import {
    View,
	StyleSheet,
    Navigator, 
	TouchableOpacity,
	TouchableHighlight,
	Text,
	StatusBar,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	ToastAndroid,
	Alert,
	BackAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Webviewst from './Webviewst';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Barcode from 'react-native-smart-barcode'
var array = []; 
var aa=[];
export default class Scanner extends React.Component {
    
    constructor(props) {
		super(props);
        this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {     
            viewAppear:false,		
            light:true,	
			bgcolor:'#000',
		};
	}
	
	componentDidMount() {
		 this.timer = setTimeout(
		    () => {  this.setState({viewAppear:true,})
		 },1000)
	}
	
	componentWillUnmount () {
        this.timer && clearTimeout(this.timer);
		BackAndroid.removeEventListener('hardwareBackPress', this._pressButton); 
    }
	  
    _pressButton() {
		this.setState({bgcolor:'#4385f4'})
        const { navigator } = this.props;
        if(navigator) {
 
            navigator.pop();
         }
        
    }
    
     

	_onBarCodeRead = (e) => {
         
        this._stopScan()
		 
        if(e.nativeEvent.data.code.indexOf("http://")!=-1 || e.nativeEvent.data.code.indexOf("https://")!=-1 || e.nativeEvent.data.code.indexOf("file://")!=-1){
			 
			var url=e.nativeEvent.data.code;
			var { navigator } = this.props; 
			if(navigator) {
				InteractionManager.runAfterInteractions(() => {
				navigator.replace({
					name: 'Webviewst',
					component: Webviewst,  
					params: {
						url: url
						 
					}				
				})
				})
			}
			
		} 
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }  
	 
	 
	
	
    render() {
           return (
                <View style={{flex: 1, backgroundColor: 'black',}}>
				    <StatusBar
					    animated = {true}
						backgroundColor={this.state.bgcolor}
						hidden={false} 
						barStyle="light-content"   
						translucent={false}    
						style={{height: 25}}
					 />
					{this.state.viewAppear ? <Barcode style={{flex: 1, }}
					  ref={ component => this._barCode = component }
					  onBarCodeRead={this._onBarCodeRead}/> : null}
					  <View style={{flex:1,position:'absolute',top:0,left:0,height:45, flexDirection:'row',width:Dimensions.get('window').width,justifyContent:'space-between'}}>
                  
							<View style={{justifyContent:'center',alignItems:'center',}}>  
							   <TouchableOpacity onPress={this._pressButton.bind(this)}>
								 <View style={{justifyContent:'flex-start',alignItems:'center',paddingLeft:0,backgroundColor:'transparent',flexDirection:'row'}}> 
								   <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
								   <Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
								 </View>
							   </TouchableOpacity>
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