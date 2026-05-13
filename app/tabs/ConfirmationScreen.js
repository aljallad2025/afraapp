import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../lib/theme';

export default function ConfirmationScreen({ navigation }) {
  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.body}>
        <View style={s.iconWrap}><Text style={{fontSize:50}}>✅</Text></View>
        <Text style={s.title}>Booking Confirmed!</Text>
        <Text style={s.sub}>Your flight has been booked successfully. Check your email for the ticket.</Text>
        <View style={s.pnrCard}>
          <Text style={{color:"rgba(255,255,255,0.5)",fontSize:11,marginBottom:4}}>Booking Reference</Text>
          <Text style={{color:colors.accent,fontSize:28,fontWeight:"900",letterSpacing:4}}>AF2024X</Text>
        </View>
        <View style={s.infoCard}>
          <View style={s.infoRow}><Text style={s.infoLbl}>Flight</Text><Text style={s.infoVal}>Tehran → Dubai</Text></View>
          <View style={s.infoRow}><Text style={s.infoLbl}>Date</Text><Text style={s.infoVal}>Jun 20, 2026</Text></View>
          <View style={s.infoRow}><Text style={s.infoLbl}>Time</Text><Text style={s.infoVal}>06:00 – 09:20</Text></View>
          <View style={s.infoRow}><Text style={s.infoLbl}>Seat</Text><Text style={s.infoVal}>14A · Economy</Text></View>
        </View>
        <TouchableOpacity style={s.primaryBtn} onPress={() => navigation.navigate("MyTrips")}>
          <Text style={{color:"#fff",fontSize:13,fontWeight:"700"}}>View My Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.secondaryBtn} onPress={() => navigation.navigate("Home")}>
          <Text style={{color:colors.text,fontSize:13,fontWeight:"600"}}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary,justifyContent:"center"},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,margin:16,padding:24,alignItems:"center",justifyContent:"center"},
  iconWrap:{marginBottom:16},
  title:{fontSize:22,fontWeight:"800",color:colors.text,marginBottom:8,textAlign:"center"},
  sub:{fontSize:12,color:"#555",textAlign:"center",marginBottom:20,lineHeight:18},
  pnrCard:{backgroundColor:colors.secondary,borderRadius:16,padding:16,alignItems:"center",marginBottom:16,borderWidth:1,borderColor:colors.green,width:"100%"},
  infoCard:{backgroundColor:"#fff",borderRadius:14,padding:14,marginBottom:20,width:"100%",borderWidth:0.5,borderColor:colors.border},
  infoRow:{flexDirection:"row",justifyContent:"space-between",paddingVertical:6,borderBottomWidth:0.5,borderBottomColor:"#f0f0f0"},
  infoLbl:{fontSize:11,color:"#aaa"},
  infoVal:{fontSize:11,fontWeight:"700",color:colors.text},
  primaryBtn:{backgroundColor:colors.accent,borderRadius:14,padding:13,alignItems:"center",width:"100%",marginBottom:8},
  secondaryBtn:{backgroundColor:colors.background,borderRadius:14,padding:13,alignItems:"center",width:"100%",borderWidth:0.5,borderColor:colors.border},
});
