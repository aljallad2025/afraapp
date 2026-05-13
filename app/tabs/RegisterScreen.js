import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../../lib/theme";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const register = () => {
    if (!name || !email || !pass) { setErr("Please fill all fields"); return; }
    navigation.replace("Main");
  };

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS==="ios"?"padding":"height"}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{color:"#fff",fontSize:18}}>←</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/icon.png")} style={s.logo} resizeMode="contain"/>
        <Text style={s.brand}>Create Account</Text>
        <Text style={s.sub}>Join AFRA Booking today</Text>
      </View>
      <ScrollView style={s.card} showsVerticalScrollIndicator={false}>
        <Text style={s.cardTitle}>Sign Up ✈</Text>
        {err ? <View style={s.errBox}><Text style={s.errTxt}>{err}</Text></View> : null}
        <View style={s.inputWrap}>
          <Text style={s.inputLabel}>Full Name</Text>
          <View style={s.inputRow}>
            <Text style={{fontSize:16,marginRight:8}}>👤</Text>
            <TextInput style={s.input} value={name} onChangeText={v=>{setName(v);setErr("");}}
              placeholder="Your full name" placeholderTextColor="#ccc"/>
          </View>
        </View>
        <View style={s.inputWrap}>
          <Text style={s.inputLabel}>Email Address</Text>
          <View style={s.inputRow}>
            <Text style={{fontSize:16,marginRight:8}}>📧</Text>
            <TextInput style={s.input} value={email} onChangeText={v=>{setEmail(v);setErr("");}}
              placeholder="your@email.com" placeholderTextColor="#ccc" keyboardType="email-address" autoCapitalize="none"/>
          </View>
        </View>
        <View style={s.inputWrap}>
          <Text style={s.inputLabel}>Phone Number</Text>
          <View style={s.inputRow}>
            <Text style={{fontSize:16,marginRight:8}}>📱</Text>
            <TextInput style={s.input} value={phone} onChangeText={setPhone}
              placeholder="+962 79 000 0000" placeholderTextColor="#ccc" keyboardType="phone-pad"/>
          </View>
        </View>
        <View style={s.inputWrap}>
          <Text style={s.inputLabel}>Password</Text>
          <View style={s.inputRow}>
            <Text style={{fontSize:16,marginRight:8}}>🔒</Text>
            <TextInput style={s.input} value={pass} onChangeText={v=>{setPass(v);setErr("");}}
              placeholder="Min 8 characters" placeholderTextColor="#ccc" secureTextEntry={!show}/>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Text style={{fontSize:16}}>{show?"🙈":"👁️"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={s.terms}>By signing up, you agree to our <Text style={{color:colors.accent}}>Terms of Service</Text> and <Text style={{color:colors.accent}}>Privacy Policy</Text></Text>
        <TouchableOpacity style={s.registerBtn} onPress={register}>
          <Text style={s.registerBtnTxt}>Create Account →</Text>
        </TouchableOpacity>
        <View style={s.loginRow}>
          <Text style={{color:"#aaa",fontSize:13}}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{color:colors.accent,fontSize:13,fontWeight:"700"}}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:30}}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary},
  header:{alignItems:"center",paddingTop:50,paddingBottom:16,position:"relative"},
  backBtn:{position:"absolute",left:16,top:50,width:32,height:32,borderRadius:16,backgroundColor:colors.secondary,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:colors.green},
  logo:{width:60,height:60,marginBottom:8},
  brand:{color:"#fff",fontSize:20,fontWeight:"800"},
  sub:{color:"rgba(255,255,255,0.5)",fontSize:12,marginTop:3},
  card:{flex:1,backgroundColor:"#fff",borderRadius:32,padding:24,marginTop:4},
  cardTitle:{fontSize:20,fontWeight:"800",color:colors.text,marginBottom:16},
  errBox:{backgroundColor:"#fee2e2",borderRadius:10,padding:10,marginBottom:12,borderWidth:0.5,borderColor:"#fca5a5"},
  errTxt:{color:"#ef4444",fontSize:12,fontWeight:"600"},
  inputWrap:{marginBottom:14},
  inputLabel:{fontSize:11,color:"#aaa",fontWeight:"700",marginBottom:6,textTransform:"uppercase"},
  inputRow:{flexDirection:"row",alignItems:"center",backgroundColor:colors.background,borderRadius:12,padding:12,borderWidth:1,borderColor:colors.border},
  input:{flex:1,color:colors.text,fontSize:14,fontWeight:"500"},
  terms:{color:"#aaa",fontSize:11,textAlign:"center",marginBottom:16,lineHeight:16},
  registerBtn:{backgroundColor:colors.accent,borderRadius:14,padding:15,alignItems:"center",marginBottom:16},
  registerBtnTxt:{color:"#fff",fontSize:15,fontWeight:"700"},
  loginRow:{flexDirection:"row",justifyContent:"center"},
});
