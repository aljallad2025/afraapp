import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, Image, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../../lib/theme";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const login = () => {
    if (!email || !pass) { setErr("Please fill all fields"); return; }
    navigation.replace("Main");
  };

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS==="ios"?"padding":"height"}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <Image source={require("../../assets/icon.png")} style={s.logo} resizeMode="contain"/>
        <Text style={s.brand}>AFRA Booking</Text>
        <Text style={s.sub}>Sign in to continue</Text>
      </View>
      <View style={s.card}>
        <Text style={s.cardTitle}>Welcome Back 👋</Text>
        {err ? <View style={s.errBox}><Text style={s.errTxt}>{err}</Text></View> : null}
        <View style={s.inputWrap}>
          <Text style={s.inputLabel}>Email Address</Text>
          <View style={s.inputRow}>
            <Text style={{fontSize:16,marginRight:8}}>📧</Text>
            <TextInput style={s.input} value={email} onChangeText={v=>{setEmail(v);setErr("");}}
              placeholder="your@email.com" placeholderTextColor="#ccc" keyboardType="email-address" autoCapitalize="none"/>
          </View>
        </View>
        <View style={s.inputWrap}>
          <Text style={s.inputLabel}>Password</Text>
          <View style={s.inputRow}>
            <Text style={{fontSize:16,marginRight:8}}>🔒</Text>
            <TextInput style={s.input} value={pass} onChangeText={v=>{setPass(v);setErr("");}}
              placeholder="••••••••" placeholderTextColor="#ccc" secureTextEntry={!show}/>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Text style={{fontSize:16}}>{show?"🙈":"👁️"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={s.forgotBtn}><Text style={s.forgotTxt}>Forgot Password?</Text></TouchableOpacity>
        <TouchableOpacity style={s.loginBtn} onPress={login}>
          <Text style={s.loginBtnTxt}>Sign In</Text>
        </TouchableOpacity>
        <View style={s.divider}>
          <View style={s.divLine}/><Text style={s.divTxt}>or continue with</Text><View style={s.divLine}/>
        </View>
        <View style={s.socialRow}>
          <TouchableOpacity style={s.socialBtn} onPress={() => navigation.replace("Main")}>
            <Text style={{fontSize:20}}>🍎</Text><Text style={s.socialTxt}>Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.socialBtn} onPress={() => navigation.replace("Main")}>
            <Text style={{fontSize:20}}>🔵</Text><Text style={s.socialTxt}>Google</Text>
          </TouchableOpacity>
        </View>
        <View style={s.registerRow}>
          <Text style={{color:"#aaa",fontSize:13}}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{color:colors.accent,fontSize:13,fontWeight:"700"}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary},
  header:{alignItems:"center",paddingTop:60,paddingBottom:20},
  logo:{width:80,height:80,marginBottom:10},
  brand:{color:"#fff",fontSize:22,fontWeight:"800"},
  sub:{color:"rgba(255,255,255,0.5)",fontSize:13,marginTop:4},
  card:{flex:1,backgroundColor:"#fff",borderRadius:32,padding:24,marginTop:4},
  cardTitle:{fontSize:20,fontWeight:"800",color:colors.text,marginBottom:16},
  errBox:{backgroundColor:"#fee2e2",borderRadius:10,padding:10,marginBottom:12,borderWidth:0.5,borderColor:"#fca5a5"},
  errTxt:{color:"#ef4444",fontSize:12,fontWeight:"600"},
  inputWrap:{marginBottom:14},
  inputLabel:{fontSize:11,color:"#aaa",fontWeight:"700",marginBottom:6,textTransform:"uppercase"},
  inputRow:{flexDirection:"row",alignItems:"center",backgroundColor:colors.background,borderRadius:12,padding:12,borderWidth:1,borderColor:colors.border},
  input:{flex:1,color:colors.text,fontSize:14,fontWeight:"500"},
  forgotBtn:{alignSelf:"flex-end",marginBottom:16},
  forgotTxt:{color:colors.accent,fontSize:12,fontWeight:"600"},
  loginBtn:{backgroundColor:colors.accent,borderRadius:14,padding:15,alignItems:"center",marginBottom:16},
  loginBtnTxt:{color:"#fff",fontSize:15,fontWeight:"700"},
  divider:{flexDirection:"row",alignItems:"center",gap:10,marginBottom:16},
  divLine:{flex:1,height:0.5,backgroundColor:colors.border},
  divTxt:{color:"#aaa",fontSize:11},
  socialRow:{flexDirection:"row",gap:10,marginBottom:20},
  socialBtn:{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8,backgroundColor:colors.background,borderRadius:12,padding:12,borderWidth:0.5,borderColor:colors.border},
  socialTxt:{fontSize:13,fontWeight:"600",color:colors.text},
  registerRow:{flexDirection:"row",justifyContent:"center"},
});
