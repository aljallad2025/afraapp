import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { colors, radius } from '../../lib/theme';
import { api } from '../../lib/api';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getData().then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <View style={s.center}><ActivityIndicator size="large" color={colors.accent} /></View>;

  const destinations = data?.destinations || [];
  const offers = data?.offers || [];
  const heroSlides = data?.heroSlides || [];

  const cats = [
    { icon:"✈️", label:"Flights", screen:"Search" },
    { icon:"🏨", label:"Hotels", screen:null },
    { icon:"📦", label:"Packages", screen:null },
    { icon:"🚗", label:"Cars", screen:null },
  ];
  const cats2 = [
    { icon:"🗺️", label:"Attractions" },
    { icon:"👥", label:"Tours" },
    { icon:"🛣️", label:"Planner" },
    { icon:"⭐", label:"Rewards" },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      {/* Dark Header */}
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Welcome to</Text>
          <Text style={s.brand}>AFRA Booking ✈</Text>
        </View>
        <View style={s.avatar}><Text style={s.avatarTxt}>T</Text></View>
      </View>
      <TouchableOpacity style={s.searchBar} onPress={() => navigation.navigate("Search")}>
        <Text style={{fontSize:16,color:"rgba(255,255,255,0.5)"}}>🔍</Text>
        <Text style={s.searchPh}>Where do you want to go?</Text>
        <View style={s.searchBtn}><Text style={s.searchBtnTxt}>Search</Text></View>
      </TouchableOpacity>

      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        {/* Main cats */}
        <View style={s.catRow}>
          {cats.map((c,i) => (
            <TouchableOpacity key={i} style={s.catCard} onPress={() => c.screen && navigation.navigate(c.screen)}>
              <View style={s.catIcon}><Text style={{fontSize:18}}>{c.icon}</Text></View>
              <Text style={s.catLbl}>{c.label}</Text>
              <View style={s.catDot}/>
            </TouchableOpacity>
          ))}
        </View>
        {/* Secondary cats */}
        <View style={s.cat2Row}>
          {cats2.map((c,i) => (
            <View key={i} style={s.cat2Item}>
              <View style={s.cat2Icon}><Text style={{fontSize:16}}>{c.icon}</Text></View>
              <Text style={s.cat2Lbl}>{c.label}</Text>
            </View>
          ))}
        </View>
        {/* Feature btns */}
        <View style={s.featRow}>
          <View style={s.featBtn}><Text style={{fontSize:14}}>🛣️</Text><Text style={s.featTxt}>Trip Planner</Text></View>
          <View style={s.featBtn}><Text style={{fontSize:14}}>📖</Text><Text style={s.featTxt}>Travel Guide</Text></View>
        </View>
        {/* Offer */}
        {offers[0] && (
          <View style={s.offerCard}>
            <View>
              <View style={s.offerBadge}><Text style={s.offerBadgeTxt}>Exclusive Deal</Text></View>
              <Text style={s.offerTitle}>{offers[0].title?.en || "30% Off Summer Flights"}</Text>
              <Text style={s.offerSub}>{offers[0].discount || "Expires Jul 31, 2026"}</Text>
            </View>
            <View style={{alignItems:"center"}}>
              <Text style={s.offerPct}>{offers[0].discount || "30%"}</Text>
              <TouchableOpacity style={s.offerBtn} onPress={() => navigation.navigate("Search")}>
                <Text style={s.offerBtnTxt}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* Destinations */}
        <Text style={s.secTitle}>Top Destinations</Text>
        <View style={s.destGrid}>
          {(destinations.length > 0 ? destinations : [
            {city:"Dubai",country:"UAE",price:299},
            {city:"Istanbul",country:"Turkey",price:199},
            {city:"Beirut",country:"Lebanon",price:149},
            {city:"London",country:"UK",price:499},
          ]).slice(0,4).map((d,i) => (
            <TouchableOpacity key={i} style={[s.destCard, {backgroundColor:["#1a4a2e","#1a2a4a","#4a2a1a","#2a1a4a"][i%4]}]}
              onPress={() => navigation.navigate("Search")}>
              <Text style={s.destPrice}>From ${d.price || 199}</Text>
              <Text style={s.destCity}>{d.city}</Text>
              <Text style={s.destSub}>{d.country || ""}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{height:20}}/>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root:{flex:1,backgroundColor:colors.primary},
  center:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:colors.primary},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,paddingTop:50,paddingBottom:12},
  greeting:{color:"rgba(255,255,255,0.5)",fontSize:12},
  brand:{color:"#fff",fontSize:17,fontWeight:"700"},
  avatar:{width:38,height:38,borderRadius:19,backgroundColor:colors.accent,justifyContent:"center",alignItems:"center",borderWidth:2,borderColor:colors.accentLight},
  avatarTxt:{color:"#fff",fontWeight:"700",fontSize:15},
  searchBar:{marginHorizontal:16,backgroundColor:colors.secondary,borderRadius:14,padding:12,flexDirection:"row",alignItems:"center",borderWidth:1,borderColor:colors.green,marginBottom:0,gap:8},
  searchPh:{flex:1,color:"rgba(255,255,255,0.35)",fontSize:13},
  searchBtn:{backgroundColor:colors.accent,borderRadius:8,paddingHorizontal:12,paddingVertical:6},
  searchBtnTxt:{color:"#fff",fontSize:11,fontWeight:"700"},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,marginTop:-2},
  catRow:{flexDirection:"row",justifyContent:"space-between",padding:14,gap:8},
  catCard:{flex:1,backgroundColor:colors.card,borderRadius:14,padding:8,alignItems:"center",borderWidth:0.5,borderColor:colors.border},
  catIcon:{width:38,height:38,borderRadius:19,backgroundColor:colors.greenLight,justifyContent:"center",alignItems:"center",marginBottom:4},
  catLbl:{fontSize:9,color:colors.text,fontWeight:"600"},
  catDot:{width:4,height:4,borderRadius:2,backgroundColor:colors.accent,marginTop:3},
  cat2Row:{flexDirection:"row",justifyContent:"space-around",paddingHorizontal:14,marginBottom:12},
  cat2Item:{alignItems:"center"},
  cat2Icon:{width:36,height:36,borderRadius:18,backgroundColor:colors.greenLight,justifyContent:"center",alignItems:"center",marginBottom:3},
  cat2Lbl:{fontSize:9,color:"#555"},
  featRow:{flexDirection:"row",gap:8,marginHorizontal:14,marginBottom:12},
  featBtn:{flex:1,backgroundColor:colors.card,borderRadius:10,padding:10,flexDirection:"row",alignItems:"center",gap:6,borderWidth:0.5,borderColor:colors.border},
  featTxt:{fontSize:11,color:colors.text,fontWeight:"600"},
  offerCard:{marginHorizontal:14,backgroundColor:colors.secondary,borderRadius:16,padding:14,flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderWidth:1,borderColor:colors.green,marginBottom:14},
  offerBadge:{backgroundColor:colors.accent,borderRadius:4,paddingHorizontal:8,paddingVertical:2,alignSelf:"flex-start",marginBottom:5},
  offerBadgeTxt:{color:"#fff",fontSize:9,fontWeight:"700"},
  offerTitle:{color:"#fff",fontSize:12,fontWeight:"700",marginBottom:2},
  offerSub:{color:"rgba(255,255,255,0.5)",fontSize:10},
  offerPct:{color:colors.accent,fontSize:22,fontWeight:"900"},
  offerBtn:{backgroundColor:colors.accent,borderRadius:8,paddingHorizontal:14,paddingVertical:6,marginTop:4},
  offerBtnTxt:{color:"#fff",fontSize:10,fontWeight:"700"},
  secTitle:{fontSize:13,fontWeight:"700",color:colors.text,marginHorizontal:14,marginBottom:8},
  destGrid:{flexDirection:"row",flexWrap:"wrap",gap:8,marginHorizontal:14},
  destCard:{width:"47%",borderRadius:16,padding:12,height:90,justifyContent:"flex-end"},
  destPrice:{color:colors.accent,fontSize:9,fontWeight:"700"},
  destCity:{color:"#fff",fontSize:13,fontWeight:"700"},
  destSub:{color:"rgba(255,255,255,0.6)",fontSize:9},
});
