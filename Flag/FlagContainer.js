import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Modal } from 'react-native'
import data from './data'
import CountDown from 'react-native-countdown-component';

export default class FlagContainer extends Component {

    state={
        array : [],
        answer : [],
        question : { },
        counterTrue : 0,
        counterFalse : 0,
        questionCount: 0,
        isVisible:false,
        time : 15,
    }

    newQuestion = () =>{
        var rnd = Math.floor(Math.random() * 81)+1; 
        this.state.question = {
            plaka : rnd,
            cities : data[rnd.toString()]
        }
        this.state.questionCount = this.state.questionCount + 1;
    }

    newAnswers = () =>{
        var answer = []
        for (let index = 0; answer.length < 3; index++) {
            var random = Math.floor(Math.random() * 81)+1;
            if((this.state.array.filter(x=> x.plaka === random.toString()).length === 0) && (random !== this.state.question.plaka)){
                answer = [...answer, random]
            }
        }
        answer = [...answer, this.state.question.plaka];
        while (answer.length > 0) {
            var random = Math.floor(Math.random() * answer.length);
            this.state.answer = [...this.state.answer, answer[random]]
            answer = answer.filter((x, index)=> {if(index !== random) return x } )
        }
        
    }

    componentDidMount = () =>{
        this.newQuestion();
        this.newAnswers();
        this.forceUpdate();
    }


    checkAnswers = (x) =>{
        if(x == this.state.question.plaka){
            this.state.counterTrue = this.state.counterTrue + 1;
        }
        else{
            this.state.counterFalse = this.state.counterFalse + 1;
        }
        this.state.answer = [];
        this.newQuestion();
        this.newAnswers();
        this.forceUpdate()

        if(this.state.questionCount === 11){
            this.state.isVisible = true
            this.setState({
                isVisible:true,
            });
        }
        this.forceUpdate()

        
    }

    onTime = () =>{
        this.state.answer = [];
        this.newQuestion();
        this.newAnswers();
        this.forceUpdate()

        if(this.state.questionCount === 11){
            this.state.isVisible = true
            this.setState({
                isVisible:true,
            });
        }
        this.forceUpdate()
    }

    setNew = () =>{
        this.state.questionCount = 0;
        this.state.counterFalse = 0;
        this.state.counterTrue = 0;
        this.state.answer = [];
        this.newQuestion();
        this.newAnswers();
        this.state.isVisible = false;
        this.forceUpdate()

    }
    onRefresh = () =>{
        this.state.counterFalse = 0,
        this.state.counterTrue = 0,
        this.state.questionCount = 0,
        this.forceUpdate()
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container} >
                    <View style={styles.counter} >
                     
                        <CountDown
                            key={this.state.questionCount}
                            until={60 * 0 + 15}
                            size={20}
                            onFinish={() => this.onTime()}
                            digitStyle={{backgroundColor: '#FFF'}}
                            digitTxtStyle={{color: '#1CC625'}}
                            timeToShow={['S']}
                            timeLabels={{ s: ''}}
                        />
                    </View>
                    <Text style={{fontSize:30}}  >
                        {this.state.questionCount}
                    </Text>
                    <View style= {styles.puan} >
                        <Text style={{fontSize:20, color:"green"}} >
                            Doğru: {this.state.counterTrue}
                        </Text>
                        <Text style={{fontSize:20, color:"red"}}>
                            Yanlış: {this.state.counterFalse}
                        </Text>
                    </View>
                    <ImageBackground style={styles.cities} source={require("../../image/turkey.gif")} resizeMode="contain" >
                        <Text style={{marginLeft:-40, fontSize:30, color:"red", fontWeight:"800"}} >
                            {this.state.question.cities}
                        </Text>
                    </ImageBackground>
                    <View style={styles.answersContainer} >
                        {this.state.answer.map(x=>(
                            <TouchableOpacity style={styles.button} onPress = {()=>this.checkAnswers(x)}  >
                                <Text>
                                    {x}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <Modal
                    visible={this.state.isVisible}
                    transparent={true}
                >
                    <View style={{width:'100%', height:'100%', alignItems:"center", justifyContent:"center", backgroundColor:"rgba(0,0,0,0.5)"}} >
                        <View style={styles.modalV} >
                            <Text style={{fontSize:20, color:"#fff"}} >
                                Doğru {this.state.counterTrue} / Yanlış {this.state.counterFalse}
                            </Text>
                            <TouchableOpacity style={styles.modalButton} onPress={()=> this.setNew() }  >
                                <Text style={{fontSize:20, color:"#211C18"}} >
                                   Tekrar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    cities:{
        width:'90%',
        height:200,
        alignItems:"center",
        marginLeft:40,
        justifyContent:"center",
        position:"absolute",
        top:100,
        left:10
    },
    container :{
        alignItems:"center",
        justifyContent:"center"
    },
    puan:{
        position:"absolute",
        top:20,
        right:20
    },
    button : {
        width:200,
        height:40,
        backgroundColor:"#DBCACA",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    },
    answersContainer:{
        position: "absolute",
        top:400,
        height:200,
        justifyContent:"space-around"
    },
    counter:{
        position:"absolute",
        top:20,
        left:10,
    },
    modalV:{
        width:'80%',
        height:'20%',
        backgroundColor:"black",
        borderRadius:20,
        alignItems:"center",
        justifyContent:"space-around"
    },
    modalButton:{
        width:'50%',
        height:40,
        backgroundColor:"#1CC625",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }
  });