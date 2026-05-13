import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import { colors, radius } from '../../lib/theme';

export default function SearchScreen({ navigation }) {
  const [tripType, setTripType] = useState('One Way');
  const [from, setFrom] = useState('Tehran — IKA');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('Jun 20, 2026');
  const [passengers, setPassengers] = useState('1 Adult');
  const [cabinClass, setCabinClass] = useState('Economy');

  const trips = ['One Way', 'Round Trip', 'Multi-City'];
  const routes = [
    { from:'IKA', to:'DXB', fromCity:'Tehran', toCity:'Dubai', duration:'3h 20m', price:299 },
    { from:'IKA', to:'IST', fromCity:'Tehran', toCity:'Istanbul', duration:'4h 10m', price:199 },
    { from:'IKA', to:'LHR', fromCity:'Tehran', toCity:'London', duration:'6h 30m', price:499 },
    { from:'IKA', to:'BEY', fromCity:'Tehran', toCity:'Beirut', duration:'2h 50m', price:149 },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{color:"#fff",fontSize:18}}>←</Text>
        </TouchableOpacity>
        <Text style={s.title}>Search Flights</Text>
        <Text style={{fontSize:18}}>⚙️</Text>
      </View>

      {/* Trip type */}
      <View style={s.tripRow}>
        {trips.map((t,i) => (
          <TouchableOpacity key={i} style={[s.tripTab, tripType===t && s.tripTabActive]} onPress={() => setTripType(t)}>
            <Text style={[s.tripTabTxt, tripType===t && s.tripTabTxtActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* From / To */}
      <View style={s.routeCard}>
        <View style={s.routeRow}>
          <View style={s.routeIcon}><Text style={{fontSize:16}}>🛫</Text></View>
          <View>
            <Text style={s.routeLabel}>From</Text>
            <Text style={s.routeValue}>{from}</Text>
          </View>
        </View>
        <View style={s.routeDivider}/>
        <TouchableOpacity style={s.swapBtn}><Text style={{color:"#fff",fontSize:14}}>⇅</Text></TouchableOpacity>
        <View style={s.routeRow}>
          <View style={s.routeIcon}><Text style={{fontSize:16}}>🛬</Text></View>
          <View>
            <Text style={s.routeLabel}>To</Text>
            <TextInput style={s.routeInput} placeholder="Select destination" placeholderTextColor="rgba(255,255,255,0.3)"
              value={to} onChangeText={setTo} />
          </View>
        </View>
      </View>

      <View style={s.body}>
        {/* Date & Passengers */}
        <View style={s.infoRow}>
          <View style={s.infoCard}>
            <Text style={s.infoLabel}>Departure</Text>
            <Text style={s.infoValue}>{date}</Text>
            <Text style={s.infoSub}>📅 Friday</Text>
          </View>
          <View style={s.infoCard}>
            <Text style={s.infoLabel}>Passengers</Text>
            <Text style={s.infoValue}>{passengers}</Text>
            <Text style={s.infoSub}>👤 {cabinClass}</Text>
          </View>
        </View>

        {/* Search button */}
        <TouchableOpacity style={s.searchBtn} onPress={() => navigation.navigate("Results", { from, to, date })}>
          <Text style={s.searchBtnTxt}>Search Flights →</Text>
        </TouchableOpacity>

        {/* Popular routes */}
        <Text style={s.secTitle}>Popular Routes</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {routes.map((r,i) => (
            <TouchableOpacity key={i} style={s.flightCard}
              onPress={() => navigation.navigate("Results", { from:r.from, to:r.to })}>
              <View style={s.airlineRow}>
                <View style={s.airlineIcon}><Text style={{fontSize:14}}>✈️</Text></View>
                <Text style={s.airlineName}>AFRA Airline</Text>
                <Text style={s.price}>${r.price}</Text>
              </View>
              <View style={s.flightRow}>
                <View>
                  <Text style={s.iata}>{r.from}</Text>
                  <Text style={s.city}>{r.fromCity}</Text>
                </View>
                <View style={s.flightMid}>
                  <Text style={s.duration}>{r.duration} · Direct</Text>
                  <View style={s.flightLine}/>
                </View>
                <View style={{alignItems:"flex-end"}}>
                  <Text style={s.iata}>{r.to}</Text>
                  <Text style={s.city}>{r.toCity}</Text>
                </View>
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
  title:{flex:1,color:"#fff",fontSize:15,fontWeight:"700"},
  tripRow:{flexDirection:"row",gap:6,paddingHorizontal:16,marginBottom:12},
  tripTab:{backgroundColor:colors.secondary,borderRadius:20,paddingHorizontal:14,paddingVertical:6,borderWidth:1,borderColor:colors.green},
  tripTabActive:{backgroundColor:colors.accent,borderColor:colors.accent},
  tripTabTxt:{color:"rgba(255,255,255,0.55)",fontSize:10,fontWeight:"600"},
  tripTabTxtActive:{color:"#fff"},
  routeCard:{marginHorizontal:16,backgroundColor:colors.secondary,borderRadius:16,padding:14,borderWidth:1,borderColor:colors.green,marginBottom:0,position:"relative"},
  routeRow:{flexDirection:"row",alignItems:"center",gap:10,marginBottom:10},
  routeIcon:{width:32,height:32,borderRadius:16,backgroundColor:colors.primary,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:colors.green},
  routeLabel:{color:"rgba(255,255,255,0.4)",fontSize:10},
  routeValue:{color:"#fff",fontSize:15,fontWeight:"700"},
  routeInput:{color:"#fff",fontSize:15,fontWeight:"600"},
  routeDivider:{height:0.5,backgroundColor:"rgba(255,255,255,0.1)",marginBottom:10},
  swapBtn:{position:"absolute",right:14,top:"50%",width:28,height:28,borderRadius:14,backgroundColor:colors.accent,justifyContent:"center",alignItems:"center"},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:4},
  infoRow:{flexDirection:"row",gap:8,marginBottom:12},
  infoCard:{flex:1,backgroundColor:colors.card,borderRadius:14,padding:12,borderWidth:0.5,borderColor:colors.border},
  infoLabel:{color:"#aaa",fontSize:10,marginBottom:2},
  infoValue:{color:colors.text,fontSize:13,fontWeight:"700"},
  infoSub:{color:"#aaa",fontSize:10,marginTop:3},
  searchBtn:{backgroundColor:colors.accent,borderRadius:14,padding:14,alignItems:"center",marginBottom:14},
  searchBtnTxt:{color:"#fff",fontSize:13,fontWeight:"700"},
  secTitle:{fontSize:13,fontWeight:"700",color:colors.text,marginBottom:8},
  flightCard:{backgroundColor:colors.card,borderRadius:16,padding:13,marginBottom:10,borderWidth:0.5,borderColor:colors.border},
  airlineRow:{flexDirection:"row",alignItems:"center",marginBottom:10,gap:7},
  airlineIcon:{width:28,height:28,borderRadius:8,backgroundColor:colors.greenLight,justifyContent:"center",alignItems:"center"},
  airlineName:{flex:1,fontSize:11,fontWeight:"700",color:colors.text},
  price:{color:colors.accent,fontSize:16,fontWeight:"800"},
  flightRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  iata:{fontSize:17,fontWeight:"800",color:colors.text},
  city:{fontSize:10,color:"#aaa"},
  flightMid:{flex:1,paddingHorizontal:10,alignItems:"center"},
  duration:{fontSize:9,color:"#aaa",marginBottom:4},
  flightLine:{height:1,width:"100%",backgroundColor:colors.border},
});
