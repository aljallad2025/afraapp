import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../lib/theme';

export default function FlightDetailScreen({ navigation, route }) {
  const fl = route?.params?.flight || { from:"IKA", to:"DXB", dep:"06:00", arr:"09:20", duration:"3h 20m", price:299, class:"Economy" };
  const [selected, setSelected] = useState("Economy");
  const classes = [
    { label:"Economy", icon:"💺", price:fl.price || 299 },
    { label:"Business", icon:"🛋️", price:(fl.price||299)+300 },
    { label:"First", icon:"👑", price:(fl.price||299)+700 },
  ];
  const amenities = [
    { icon:"🧳", title:"20kg Checked Baggage", sub:"1 piece included" },
    { icon:"📱", title:"In-flight Entertainment", sub:"Movies, music & more" },
    { icon:"📶", title:"Free Wi-Fi", sub:"Throughout the flight" },
    { icon:"🍽️", title:"Meal Included", sub:"Hot meal service" },
  ];
  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{color:"#fff",fontSize:18}}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Flight Details</Text>
      </View>
      <View style={s.flightCard}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <View style={{flexDirection:"row",alignItems:"center",gap:7}}>
            <View style={s.airIcon}><Text style={{fontSize:13}}>✈️</Text></View>
            <View>
              <Text style={{color:"#fff",fontSize:11,fontWeight:"700"}}>AFRA Airline</Text>
              <Text style={{color:"rgba(255,255,255,0.4)",fontSize:9}}>AF-2024 · Boeing 737</Text>
            </View>
          </View>
          <View style={s.directBadge}><Text style={{color:"#fff",fontSize:9,fontWeight:"700"}}>Direct</Text></View>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <View>
            <Text style={s.iata}>{fl.dep || "06:00"}</Text>
            <Text style={s.iataCity}>{fl.from} · Tehran</Text>
          </View>
          <View style={{flex:1,paddingHorizontal:12,alignItems:"center"}}>
            <Text style={{color:"rgba(255,255,255,0.4)",fontSize:9,marginBottom:5}}>{fl.duration}</Text>
            <View style={{height:1,width:"100%",backgroundColor:"rgba(255,255,255,0.15)"}}/>
          </View>
          <View style={{alignItems:"flex-end"}}>
            <Text style={s.iata}>{fl.arr || "09:20"}</Text>
            <Text style={s.iataCity}>{fl.to} · Dubai</Text>
          </View>
        </View>
      </View>
      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.secTitle}>Select Cabin Class</Text>
        <View style={{flexDirection:"row",gap:7,marginBottom:12}}>
          {classes.map((c,i) => (
            <TouchableOpacity key={i} style={[s.classCard, selected===c.label && s.classActive]} onPress={() => setSelected(c.label)}>
              <Text style={{fontSize:18,marginBottom:4}}>{c.icon}</Text>
              <Text style={{fontSize:10,fontWeight:"700",color:colors.text}}>{c.label}</Text>
              <Text style={{fontSize:11,fontWeight:"800",color:selected===c.label?colors.accent:colors.text,marginTop:2}}>${c.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={s.secTitle}>Included Amenities</Text>
        <View style={s.amenCard}>
          {amenities.map((a,i) => (
            <View key={i} style={[s.amenRow, i<amenities.length-1 && {borderBottomWidth:0.5,borderBottomColor:"#f0f0f0",paddingBottom:8,marginBottom:8}]}>
              <View style={s.amenIcon}><Text style={{fontSize:13}}>{a.icon}</Text></View>
              <View style={{flex:1}}>
                <Text style={{fontSize:11,fontWeight:"600",color:colors.text}}>{a.title}</Text>
                <Text style={{fontSize:9,color:"#aaa"}}>{a.sub}</Text>
              </View>
              <Text style={{color:colors.green,fontSize:14}}>✓</Text>
            </View>
          ))}
        </View>
        <View style={s.totalRow}>
          <View>
            <Text style={{fontSize:10,color:"#aaa"}}>Total Price</Text>
            <Text style={{fontSize:20,fontWeight:"800",color:colors.accent}}>${classes.find(c=>c.label===selected)?.price || 299}</Text>
            <Text style={{fontSize:9,color:"#aaa"}}>1 Adult · {selected}</Text>
          </View>
          <TouchableOpacity style={s.bookBtn} onPress={() => navigation.navigate("Booking", { flight:fl, class:selected })}>
            <Text style={{color:"#fff",fontSize:13,fontWeight:"700"}}>Book Now</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:20}}/>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary},
  header:{flexDirection:"row",alignItems:"center",paddingHorizontal:16,paddingTop:50,paddingBottom:12,gap:10},
  backBtn:{width:32,height:32,borderRadius:16,backgroundColor:colors.secondary,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:colors.green},
  title:{color:"#fff",fontSize:15,fontWeight:"700"},
  flightCard:{marginHorizontal:16,backgroundColor:colors.secondary,borderRadius:16,padding:14,borderWidth:1,borderColor:colors.green,marginBottom:4},
  airIcon:{width:28,height:28,borderRadius:8,backgroundColor:colors.primary,justifyContent:"center",alignItems:"center"},
  directBadge:{backgroundColor:colors.accent,borderRadius:6,paddingHorizontal:10,paddingVertical:3},
  iata:{color:"#fff",fontSize:20,fontWeight:"800"},
  iataCity:{color:"rgba(255,255,255,0.5)",fontSize:10},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:2},
  secTitle:{fontSize:12,fontWeight:"700",color:colors.text,marginBottom:8},
  classCard:{flex:1,backgroundColor:"#fff",borderRadius:12,padding:10,alignItems:"center",borderWidth:1.5,borderColor:colors.border},
  classActive:{borderColor:colors.accent,backgroundColor:"#fff8f5"},
  amenCard:{backgroundColor:"#fff",borderRadius:14,padding:12,marginBottom:12,borderWidth:0.5,borderColor:colors.border},
  amenRow:{flexDirection:"row",alignItems:"center",gap:9},
  amenIcon:{width:28,height:28,borderRadius:8,backgroundColor:colors.greenLight,justifyContent:"center",alignItems:"center"},
  totalRow:{backgroundColor:"#fff",borderRadius:14,padding:12,flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderWidth:0.5,borderColor:colors.border},
  bookBtn:{backgroundColor:colors.accent,borderRadius:12,paddingHorizontal:20,paddingVertical:12},
});
