import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import { colors } from '../../lib/theme';

export default function PaymentScreen({ navigation, route }) {
  const fl = route?.params?.flight || {};
  const cls = route?.params?.class || "Economy";
  const [method, setMethod] = useState("Card");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const methods = ["Card","Apple Pay","Google Pay"];
  const price = fl.price || 299;

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{color:"#fff",fontSize:18}}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Payment</Text>
      </View>
      <View style={s.stepsRow}>
        <View style={s.stepDone}><Text style={{color:"#fff",fontSize:11}}>✓</Text></View>
        <View style={[s.stepLine,{backgroundColor:colors.accent}]}/>
        <View style={s.stepActive}><Text style={{color:"#fff",fontSize:11,fontWeight:"700"}}>2</Text></View>
        <View style={s.stepLine}/>
        <View style={s.stepInactive}><Text style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>3</Text></View>
      </View>
      <View style={s.stepsLbl}>
        <Text style={{color:colors.green,fontSize:9,fontWeight:"700"}}>✓ Passenger</Text>
        <Text style={{color:colors.accent,fontSize:9,fontWeight:"700"}}>Payment</Text>
        <Text style={{color:"rgba(255,255,255,0.3)",fontSize:9}}>Confirm</Text>
      </View>
      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        <View style={s.summaryCard}>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:6}}>
            <Text style={s.sumLabel}>Flight</Text>
            <Text style={s.sumValue}>IKA → DXB · Jun 20</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:6}}>
            <Text style={s.sumLabel}>Class</Text>
            <Text style={s.sumValue}>{cls}</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:6}}>
            <Text style={s.sumLabel}>Passenger</Text>
            <Text style={s.sumValue}>1 Adult</Text>
          </View>
          <View style={{height:0.5,backgroundColor:"rgba(255,255,255,0.1)",marginBottom:8}}/>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Text style={{color:"rgba(255,255,255,0.6)",fontSize:11,fontWeight:"700"}}>Total</Text>
            <Text style={{color:colors.accent,fontSize:20,fontWeight:"800"}}>${price}</Text>
          </View>
        </View>
        <Text style={s.secTitle}>Payment Method</Text>
        <View style={{flexDirection:"row",gap:7,marginBottom:12}}>
          {methods.map((m,i) => (
            <TouchableOpacity key={i} style={[s.methodCard, method===m && s.methodActive]} onPress={() => setMethod(m)}>
              <Text style={{fontSize:20,marginBottom:3}}>{["💳","🍎","🔵"][i]}</Text>
              <Text style={{fontSize:10,fontWeight:"600",color:method===m?colors.accent:colors.text}}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {method === "Card" && (
          <View style={s.cardForm}>
            <View style={s.inputWrap}>
              <Text style={s.inputLabel}>Card Number</Text>
              <TextInput style={s.input} value={card} onChangeText={setCard} placeholder="4242 4242 4242 4242" placeholderTextColor="#ccc" keyboardType="number-pad" maxLength={19}/>
            </View>
            <View style={{flexDirection:"row",gap:7}}>
              <View style={[s.inputWrap,{flex:1}]}>
                <Text style={s.inputLabel}>Expiry</Text>
                <TextInput style={s.input} value={expiry} onChangeText={setExpiry} placeholder="MM/YY" placeholderTextColor="#ccc"/>
              </View>
              <View style={[s.inputWrap,{flex:1}]}>
                <Text style={s.inputLabel}>CVV</Text>
                <TextInput style={s.input} value={cvv} onChangeText={setCvv} placeholder="•••" placeholderTextColor="#ccc" secureTextEntry maxLength={3}/>
              </View>
            </View>
          </View>
        )}
        <TouchableOpacity style={s.payBtn} onPress={() => navigation.navigate("Confirmation")}>
          <Text style={{color:"#fff",fontSize:13,fontWeight:"700"}}>🔒  Pay ${price} Securely</Text>
        </TouchableOpacity>
        <View style={{height:20}}/>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary},
  header:{flexDirection:"row",alignItems:"center",paddingHorizontal:16,paddingTop:50,paddingBottom:8,gap:10},
  backBtn:{width:32,height:32,borderRadius:16,backgroundColor:colors.secondary,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:colors.green},
  title:{color:"#fff",fontSize:15,fontWeight:"700"},
  stepsRow:{flexDirection:"row",alignItems:"center",paddingHorizontal:16,marginBottom:4},
  stepDone:{width:26,height:26,borderRadius:13,backgroundColor:colors.green,justifyContent:"center",alignItems:"center"},
  stepActive:{width:26,height:26,borderRadius:13,backgroundColor:colors.accent,justifyContent:"center",alignItems:"center"},
  stepInactive:{width:26,height:26,borderRadius:13,backgroundColor:colors.secondary,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:colors.green},
  stepLine:{flex:1,height:2,backgroundColor:colors.accent,borderRadius:2},
  stepsLbl:{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:16,marginBottom:4},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:2},
  summaryCard:{backgroundColor:colors.secondary,borderRadius:14,padding:12,marginBottom:12,borderWidth:1,borderColor:colors.green},
  sumLabel:{color:"rgba(255,255,255,0.5)",fontSize:10},
  sumValue:{color:"#fff",fontSize:10,fontWeight:"600"},
  secTitle:{fontSize:12,fontWeight:"700",color:colors.text,marginBottom:8},
  methodCard:{flex:1,backgroundColor:"#fff",borderRadius:12,padding:10,alignItems:"center",borderWidth:0.5,borderColor:colors.border},
  methodActive:{borderColor:colors.accent,borderWidth:1.5},
  cardForm:{backgroundColor:"#fff",borderRadius:16,padding:13,marginBottom:12,borderWidth:0.5,borderColor:colors.border,gap:7},
  inputWrap:{},
  inputLabel:{fontSize:9,color:"#aaa",marginBottom:2},
  input:{backgroundColor:colors.background,borderRadius:10,padding:10,borderWidth:1,borderColor:colors.border,fontSize:12,fontWeight:"600",color:colors.text},
  payBtn:{backgroundColor:colors.accent,borderRadius:14,padding:13,alignItems:"center",marginBottom:10},
});
