import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../lib/theme';

export default function ResultsScreen({ navigation, route }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All','Direct','Cheapest','Fastest'];
  const flights = [
    { airline:'AFRA Airline', from:'IKA', to:'DXB', dep:'06:00', arr:'09:20', duration:'3h 20m', stops:'Direct', price:299, class:'Economy', bag:'20kg' },
    { airline:'AFRA Airline', from:'IKA', to:'DXB', dep:'14:30', arr:'18:40', duration:'4h 10m', stops:'Direct', price:199, class:'Business', bag:'32kg' },
    { airline:'AFRA Airline', from:'IKA', to:'DXB', dep:'20:00', arr:'23:05', duration:'3h 05m', stops:'1 Stop', price:549, class:'First', bag:'40kg' },
  ];
  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{color:"#fff",fontSize:18}}>←</Text>
        </TouchableOpacity>
        <View style={{flex:1}}>
          <Text style={s.title}>Tehran → Dubai</Text>
          <Text style={s.sub}>Jun 20 · 1 Adult · Economy</Text>
        </View>
        <Text style={{fontSize:18}}>⚙️</Text>
      </View>
      <View style={s.filterRow}>
        {filters.map((f,i) => (
          <TouchableOpacity key={i} style={[s.filterTab, filter===f && s.filterActive]} onPress={() => setFilter(f)}>
            <Text style={[s.filterTxt, filter===f && {color:"#fff"}]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={s.body}>
        <Text style={s.count}>12 flights found</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {flights.map((fl,i) => (
            <TouchableOpacity key={i} style={s.card} onPress={() => navigation.navigate("FlightDetail", { flight:fl })}>
              <View style={s.cardTop}>
                <View style={{flexDirection:"row",alignItems:"center",gap:7}}>
                  <View style={s.airIcon}><Text style={{fontSize:14}}>✈️</Text></View>
                  <Text style={s.airName}>{fl.airline}</Text>
                </View>
                <View style={{alignItems:"flex-end"}}>
                  <Text style={s.price}>${fl.price}</Text>
                  <Text style={{color:"#aaa",fontSize:9}}>per person</Text>
                </View>
              </View>
              <View style={s.flightRow}>
                <View>
                  <Text style={s.iata}>{fl.dep}</Text>
                  <Text style={s.city}>{fl.from}</Text>
                </View>
                <View style={s.mid}>
                  <Text style={s.dur}>{fl.duration}</Text>
                  <View style={s.line}/>
                  <Text style={[s.stops,{color:fl.stops==="Direct"?colors.green:"#f59e0b"}]}>{fl.stops}</Text>
                </View>
                <View style={{alignItems:"flex-end"}}>
                  <Text style={s.iata}>{fl.arr}</Text>
                  <Text style={s.city}>{fl.to}</Text>
                </View>
              </View>
              <View style={s.cardBot}>
                <View style={{flexDirection:"row",gap:5}}>
                  <View style={s.badge}><Text style={s.badgeTxt}>{fl.class}</Text></View>
                  <View style={[s.badge,{backgroundColor:"#fff3e0"}]}><Text style={[s.badgeTxt,{color:"#e65100"}]}>{fl.bag}</Text></View>
                </View>
                <View style={s.selBtn}><Text style={s.selBtnTxt}>Select</Text></View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary},
  header:{flexDirection:"row",alignItems:"center",paddingHorizontal:16,paddingTop:50,paddingBottom:12,gap:10},
  backBtn:{width:32,height:32,borderRadius:16,backgroundColor:colors.secondary,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:colors.green},
  title:{color:"#fff",fontSize:14,fontWeight:"700"},
  sub:{color:"rgba(255,255,255,0.45)",fontSize:10},
  filterRow:{flexDirection:"row",gap:6,paddingHorizontal:16,marginBottom:4},
  filterTab:{backgroundColor:colors.secondary,borderRadius:20,paddingHorizontal:12,paddingVertical:5,borderWidth:1,borderColor:colors.green},
  filterActive:{backgroundColor:colors.accent,borderColor:colors.accent},
  filterTxt:{color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:"600"},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:4},
  count:{fontSize:12,color:"#555",marginBottom:10},
  card:{backgroundColor:"#fff",borderRadius:16,padding:13,marginBottom:10,borderWidth:0.5,borderColor:colors.border},
  cardTop:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10},
  airIcon:{width:28,height:28,borderRadius:8,backgroundColor:colors.greenLight,justifyContent:"center",alignItems:"center"},
  airName:{fontSize:11,fontWeight:"700",color:colors.text},
  price:{color:colors.accent,fontSize:16,fontWeight:"800"},
  flightRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:10},
  iata:{fontSize:17,fontWeight:"800",color:colors.text},
  city:{fontSize:10,color:"#aaa"},
  mid:{flex:1,paddingHorizontal:10,alignItems:"center"},
  dur:{fontSize:9,color:"#aaa",marginBottom:4},
  line:{height:1,width:"100%",backgroundColor:colors.border},
  stops:{fontSize:9,marginTop:4,fontWeight:"600"},
  cardBot:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingTop:9,borderTopWidth:0.5,borderTopColor:"#f0f0f0"},
  badge:{backgroundColor:colors.greenLight,borderRadius:6,paddingHorizontal:8,paddingVertical:2},
  badgeTxt:{color:colors.green,fontSize:9,fontWeight:"700"},
  selBtn:{backgroundColor:colors.accent,borderRadius:8,paddingHorizontal:14,paddingVertical:6},
  selBtnTxt:{color:"#fff",fontSize:11,fontWeight:"700"},
});
