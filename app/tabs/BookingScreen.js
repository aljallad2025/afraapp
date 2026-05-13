import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import { colors } from '../../lib/theme';

export default function BookingScreen({ navigation, route }) {
  const fl = route?.params?.flight || {};
  const cls = route?.params?.class || "Economy";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passport, setPassport] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{color:"#fff",fontSize:18}}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Passenger Details</Text>
      </View>
      {/* Steps */}
      <View style={s.stepsRow}>
        <View style={s.stepActive}><Text style={{color:"#fff",fontSize:11,fontWeight:"700"}}>1</Text></View>
        <View style={s.stepLine}/>
        <View style={s.stepInactive}><Text style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>2</Text></View>
        <View style={[s.stepLine,{backgroundColor:colors.secondary}]}/>
        <View style={s.stepInactive}><Text style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>3</Text></View>
      </View>
      <View style={s.stepsLbl}>
        <Text style={{color:colors.accent,fontSize:9,fontWeight:"700"}}>Passenger</Text>
        <Text style={{color:"rgba(255,255,255,0.3)",fontSize:9}}>Payment</Text>
        <Text style={{color:"rgba(255,255,255,0.3)",fontSize:9}}>Confirm</Text>
      </View>
      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        {/* Flight summary */}
        <View style={s.summaryCard}>
          <Text style={{fontSize:16}}>✈️</Text>
          <View>
            <Text style={{fontSize:10,fontWeight:"700",color:colors.text}}>Tehran → Dubai · Jun 20</Text>
            <Text style={{fontSize:9,color:"#555"}}>06:00 – 09:20 · {cls} · $299</Text>
          </View>
        </View>
        {/* Passenger form */}
        <View style={s.formCard}>
          <View style={s.formHeader}>
            <View style={s.formIcon}><Text style={{fontSize:13}}>👤</Text></View>
            <Text style={{fontSize:12,fontWeight:"700",color:colors.text}}>Adult Passenger 1</Text>
          </View>
          <View style={{flexDirection:"row",gap:7,marginBottom:7}}>
            <View style={s.inputWrap}>
              <Text style={s.inputLabel}>First Name</Text>
              <TextInput style={s.input} value={firstName} onChangeText={setFirstName} placeholder="First name" placeholderTextColor="#ccc"/>
            </View>
            <View style={s.inputWrap}>
              <Text style={s.inputLabel}>Last Name</Text>
              <TextInput style={s.input} value={lastName} onChangeText={setLastName} placeholder="Last name" placeholderTextColor="#ccc"/>
            </View>
          </View>
          <View style={s.inputFull}>
            <Text style={s.inputLabel}>Passport Number</Text>
            <TextInput style={s.input} value={passport} onChangeText={setPassport} placeholder="A12345678" placeholderTextColor="#ccc"/>
          </View>
        </View>
        {/* Contact form */}
        <View style={s.formCard}>
          <View style={s.formHeader}>
            <View style={s.formIcon}><Text style={{fontSize:13}}>📧</Text></View>
            <Text style={{fontSize:12,fontWeight:"700",color:colors.text}}>Contact Info</Text>
          </View>
          <View style={s.inputFull}>
            <Text style={s.inputLabel}>Email Address</Text>
            <TextInput style={s.input} value={email} onChangeText={setEmail} placeholder="your@email.com" placeholderTextColor="#ccc" keyboardType="email-address"/>
          </View>
          <View style={s.inputFull}>
            <Text style={s.inputLabel}>Phone Number</Text>
            <TextInput style={s.input} value={phone} onChangeText={setPhone} placeholder="+962 79 000 0000" placeholderTextColor="#ccc" keyboardType="phone-pad"/>
          </View>
        </View>
        <TouchableOpacity style={s.continueBtn} onPress={() => navigation.navigate("Payment", { flight:fl, class:cls })}>
          <Text style={{color:"#fff",fontSize:13,fontWeight:"700"}}>Continue to Payment →</Text>
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
  stepActive:{width:26,height:26,borderRadius:13,backgroundColor:colors.accent,justifyContent:"center",alignItems:"center"},
  stepInactive:{width:26,height:26,borderRadius:13,backgroundColor:colors.secondary,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:colors.green},
  stepLine:{flex:1,height:2,backgroundColor:colors.accent,borderRadius:2},
  stepsLbl:{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:16,marginBottom:4},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:2},
  summaryCard:{backgroundColor:colors.greenLight,borderRadius:12,padding:10,marginBottom:10,flexDirection:"row",alignItems:"center",gap:8,borderWidth:1,borderColor:"#c8e6c9"},
  formCard:{backgroundColor:"#fff",borderRadius:16,padding:13,marginBottom:10,borderWidth:0.5,borderColor:colors.border},
  formHeader:{flexDirection:"row",alignItems:"center",gap:7,marginBottom:12},
  formIcon:{width:28,height:28,borderRadius:8,backgroundColor:colors.greenLight,justifyContent:"center",alignItems:"center"},
  inputWrap:{flex:1},
  inputFull:{marginBottom:7},
  inputLabel:{fontSize:9,color:"#aaa",marginBottom:2},
  input:{backgroundColor:colors.background,borderRadius:10,padding:10,borderWidth:1,borderColor:colors.border,fontSize:12,fontWeight:"600",color:colors.text},
  continueBtn:{backgroundColor:colors.accent,borderRadius:14,padding:13,alignItems:"center",marginBottom:10},
});
