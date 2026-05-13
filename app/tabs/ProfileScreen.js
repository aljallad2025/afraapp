import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../lib/theme';

export default function ProfileScreen({ navigation }) {
  const stats = [
    { label:"Flights", value:"12" },
    { label:"Miles", value:"24K" },
    { label:"Points", value:"1,850" },
  ];
  const menu = [
    { icon:"🎫", label:"My Bookings" },
    { icon:"❤️", label:"Saved Flights" },
    { icon:"🔔", label:"Notifications" },
    { icon:"💳", label:"Payment Methods" },
    { icon:"🌐", label:"Language" },
    { icon:"🔒", label:"Privacy & Security" },
    { icon:"❓", label:"Help & Support" },
    { icon:"⭐", label:"Rate the App" },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <Text style={s.title}>Profile</Text>
        <TouchableOpacity><Text style={{fontSize:18}}>⚙️</Text></TouchableOpacity>
      </View>
      <View style={s.profileCard}>
        <View style={s.avatar}><Text style={s.avatarTxt}>T</Text></View>
        <View style={{flex:1}}>
          <Text style={{color:"#fff",fontSize:16,fontWeight:"700"}}>Thair Al-Jallad</Text>
          <Text style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>thair@super-ai.com</Text>
          <View style={s.goldBadge}><Text style={{color:"#fff",fontSize:9,fontWeight:"700"}}>✈ Gold Member</Text></View>
        </View>
      </View>
      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        <View style={s.statsRow}>
          {stats.map((st,i) => (
            <View key={i} style={s.statCard}>
              <Text style={s.statValue}>{st.value}</Text>
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          ))}
        </View>
        <View style={s.loyaltyCard}>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:8}}>
            <Text style={{color:"#fff",fontSize:12,fontWeight:"700"}}>Loyalty Points</Text>
            <Text style={{color:colors.accent,fontSize:12,fontWeight:"700"}}>1,850 pts</Text>
          </View>
          <View style={s.progressBg}>
            <View style={[s.progressFill,{width:"62%"}]}/>
          </View>
          <Text style={{color:"rgba(255,255,255,0.5)",fontSize:9,marginTop:4}}>1,150 pts to Platinum status</Text>
        </View>
        <Text style={s.secTitle}>Account</Text>
        <View style={s.menuCard}>
          {menu.map((m,i) => (
            <TouchableOpacity key={i} style={[s.menuItem, i<menu.length-1 && {borderBottomWidth:0.5,borderBottomColor:colors.border}]}>
              <Text style={{fontSize:18,marginRight:10}}>{m.icon}</Text>
              <Text style={{flex:1,fontSize:13,color:colors.text,fontWeight:"500"}}>{m.label}</Text>
              <Text style={{color:"#ccc",fontSize:16}}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={s.logoutBtn}>
          <Text style={{color:"#ef4444",fontSize:13,fontWeight:"700"}}>Log Out</Text>
        </TouchableOpacity>
        <View style={{height:20}}/>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,paddingTop:50,paddingBottom:12},
  title:{color:"#fff",fontSize:18,fontWeight:"700"},
  profileCard:{flexDirection:"row",alignItems:"center",gap:14,paddingHorizontal:16,marginBottom:4},
  avatar:{width:60,height:60,borderRadius:30,backgroundColor:colors.accent,justifyContent:"center",alignItems:"center",borderWidth:3,borderColor:colors.accentLight},
  avatarTxt:{color:"#fff",fontWeight:"800",fontSize:22},
  goldBadge:{backgroundColor:colors.accent,borderRadius:10,paddingHorizontal:8,paddingVertical:2,alignSelf:"flex-start",marginTop:4},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:4},
  statsRow:{flexDirection:"row",gap:8,marginBottom:12},
  statCard:{flex:1,backgroundColor:"#fff",borderRadius:12,padding:12,alignItems:"center",borderWidth:0.5,borderColor:colors.border},
  statValue:{fontSize:16,fontWeight:"800",color:colors.accent},
  statLabel:{fontSize:10,color:"#aaa",marginTop:2},
  loyaltyCard:{backgroundColor:colors.secondary,borderRadius:14,padding:12,marginBottom:14,borderWidth:1,borderColor:colors.green},
  progressBg:{height:6,backgroundColor:"rgba(255,255,255,0.15)",borderRadius:3},
  progressFill:{height:6,backgroundColor:colors.accent,borderRadius:3},
  secTitle:{fontSize:12,fontWeight:"700",color:colors.text,marginBottom:8},
  menuCard:{backgroundColor:"#fff",borderRadius:16,overflow:"hidden",marginBottom:12,borderWidth:0.5,borderColor:colors.border},
  menuItem:{flexDirection:"row",alignItems:"center",padding:14},
  logoutBtn:{backgroundColor:"#fee2e2",borderRadius:14,padding:14,alignItems:"center",borderWidth:0.5,borderColor:"#fca5a5"},
});
