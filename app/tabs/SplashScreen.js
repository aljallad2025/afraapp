import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { colors } from "../../lib/theme";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Login"), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Image source={require("../../assets/icon.png")} style={s.logo} resizeMode="contain"/>
      <Text style={s.brand}>AFRA Booking</Text>
      <Text style={s.sub}>Your Journey Starts Here</Text>
      <View style={s.dots}>
        <View style={[s.dot, s.dotActive]}/>
        <View style={s.dot}/>
        <View style={s.dot}/>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary,justifyContent:"center",alignItems:"center"},
  logo:{width:140,height:140,marginBottom:20},
  brand:{color:"#fff",fontSize:28,fontWeight:"900",letterSpacing:1},
  sub:{color:"rgba(255,255,255,0.5)",fontSize:14,marginTop:6,marginBottom:40},
  dots:{flexDirection:"row",gap:8},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:"rgba(255,255,255,0.3)"},
  dotActive:{width:24,backgroundColor:colors.accent},
});
