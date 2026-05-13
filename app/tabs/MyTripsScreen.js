import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../lib/theme';

export default function MyTripsScreen({ navigation }) {
  const [tab, setTab] = useState("Upcoming");
  const tabs = ["Upcoming","Completed","Cancelled"];
  const trips = [
    { id:"AF2024X", from:"IKA", to:"DXB", fromCity:"Tehran", toCity:"Dubai", date:"Jun 20, 2026", dep:"06:00", arr:"09:20", seat:"14A", class:"Economy", status:"Confirmed", price:299 },
    { id:"AF1812Y", from:"IKA", to:"IST", fromCity:"Tehran", toCity:"Istanbul", date:"Jul 5, 2026", dep:"14:30", arr:"18:40", seat:"22C", class:"Business", status:"Pending", price:599 },
  ];
  const statusColor = { Confirmed:colors.green, Pending:"#f59e0b", Cancelled:"#ef4444" };
  const statusBg = { Confirmed:colors.greenLight, Pending:"#fff8e1", Cancelled:"#fee2e2" };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <Text style={s.title}>My Trips</Text>
        <TouchableOpacity style={s.addBtn}><Text style={{color:colors.accent,fontSize:20}}>＋</Text></TouchableOpacity>
      </View>
      <View style={s.tabRow}>
        {tabs.map((t,i) => (
          <TouchableOpacity key={i} style={[s.tabBtn, tab===t && s.tabActive]} onPress={() => setTab(t)}>
            <Text style={[s.tabTxt, tab===t && s.tabTxtActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        {trips.map((tr,i) => (
          <View key={i} style={s.card}>
            <View style={s.cardTop}>
              <View style={{flexDirection:"row",alignItems:"center",gap:7}}>
                <View style={s.airIcon}><Text style={{fontSize:14}}>✈️</Text></View>
                <View>
                  <Text style={{fontSize:11,fontWeight:"700",color:colors.text}}>AFRA Airline</Text>
                  <Text style={{fontSize:9,color:"#aaa"}}>AF-{tr.id.slice(-4)}</Text>
                </View>
              </View>
              <View style={[s.statusBadge,{backgroundColor:statusBg[tr.status]}]}>
                <Text style={[s.statusTxt,{color:statusColor[tr.status]}]}>{tr.status}</Text>
              </View>
            </View>
            <View style={s.flightRow}>
              <View>
                <Text style={s.iata}>{tr.dep}</Text>
                <Text style={s.city}>{tr.from}</Text>
              </View>
              <View style={s.mid}>
                <Text style={s.dur}>3h 20m</Text>
                <View style={s.line}/>
                <Text style={{fontSize:9,color:colors.green,marginTop:3,fontWeight:"600"}}>Direct</Text>
              </View>
              <View style={{alignItems:"flex-end"}}>
                <Text style={s.iata}>{tr.arr}</Text>
                <Text style={s.city}>{tr.to}</Text>
              </View>
            </View>
            <View style={s.infoRow}>
              <View style={s.infoItem}><Text style={s.infoLabel}>Date</Text><Text style={s.infoVal}>{tr.date}</Text></View>
              <View style={s.infoItem}><Text style={s.infoLabel}>Seat</Text><Text style={s.infoVal}>{tr.seat}</Text></View>
              <View style={s.infoItem}><Text style={s.infoLabel}>Class</Text><Text style={s.infoVal}>{tr.class}</Text></View>
              <View style={s.infoItem}><Text style={s.infoLabel}>PNR</Text><Text style={[s.infoVal,{color:colors.accent}]}>{tr.id}</Text></View>
            </View>
            {tr.status === "Confirmed" && (
              <View style={{flexDirection:"row",gap:7}}>
                <TouchableOpacity style={s.checkinBtn}><Text style={{color:"#fff",fontSize:11,fontWeight:"700"}}>Check-in</Text></TouchableOpacity>
                <TouchableOpacity style={s.viewBtn}><Text style={{color:colors.text,fontSize:11,fontWeight:"600"}}>View Ticket</Text></TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        <View style={{height:20}}/>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,paddingTop:50,paddingBottom:12},
  title:{color:"#fff",fontSize:18,fontWeight:"700"},
  addBtn:{width:32,height:32,justifyContent:"center",alignItems:"center"},
  tabRow:{flexDirection:"row",gap:6,paddingHorizontal:16,marginBottom:4},
  tabBtn:{backgroundColor:colors.secondary,borderRadius:20,paddingHorizontal:14,paddingVertical:6,borderWidth:1,borderColor:colors.green},
  tabActive:{backgroundColor:colors.accent,borderColor:colors.accent},
  tabTxt:{color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:"600"},
  tabTxtActive:{color:"#fff"},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:4},
  card:{backgroundColor:"#fff",borderRadius:16,padding:13,marginBottom:12,borderWidth:0.5,borderColor:colors.border},
  cardTop:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:10},
  airIcon:{width:30,height:30,borderRadius:8,backgroundColor:colors.greenLight,justifyContent:"center",alignItems:"center"},
  statusBadge:{borderRadius:6,paddingHorizontal:8,paddingVertical:3},
  statusTxt:{fontSize:9,fontWeight:"700"},
  flightRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:10},
  iata:{fontSize:18,fontWeight:"800",color:colors.text},
  city:{fontSize:10,color:"#aaa"},
  mid:{flex:1,paddingHorizontal:10,alignItems:"center"},
  dur:{fontSize:9,color:"#aaa",marginBottom:4},
  line:{height:1,width:"100%",backgroundColor:colors.border},
  infoRow:{backgroundColor:colors.background,borderRadius:10,padding:8,flexDirection:"row",justifyContent:"space-between",marginBottom:10},
  infoItem:{alignItems:"center"},
  infoLabel:{fontSize:9,color:"#aaa"},
  infoVal:{fontSize:10,fontWeight:"700",color:colors.text},
  checkinBtn:{flex:1,backgroundColor:colors.accent,borderRadius:10,padding:9,alignItems:"center"},
  viewBtn:{flex:1,backgroundColor:colors.background,borderRadius:10,padding:9,alignItems:"center",borderWidth:0.5,borderColor:colors.border},
});
