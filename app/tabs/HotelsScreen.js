import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Image } from "react-native";
import { colors } from "../../lib/theme";

export default function HotelsScreen({ navigation }) {
  const [tab, setTab] = useState("Hotels");
  const tabs = ["Hotels","Apartments","Resorts","Villas"];
  const hotels = [
    { name:"Burj Al Arab", city:"Dubai", stars:5, price:450, rating:9.8, img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
    { name:"Four Seasons Istanbul", city:"Istanbul", stars:5, price:280, rating:9.5, img:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80" },
    { name:"The Ritz London", city:"London", stars:5, price:620, rating:9.7, img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80" },
    { name:"Hotel Martinez", city:"Cannes", stars:4, price:180, rating:8.9, img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80" },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <Text style={s.title}>Hotels</Text>
        <View style={s.avatar}><Text style={s.avatarTxt}>T</Text></View>
      </View>
      <View style={s.searchBox}>
        <Text style={{fontSize:16}}>🔍</Text>
        <Text style={s.searchPh}>Search hotels, cities...</Text>
      </View>
      <View style={s.tabRow}>
        {tabs.map((t,i) => (
          <TouchableOpacity key={i} style={[s.tabBtn, tab===t && s.tabActive]} onPress={() => setTab(t)}>
            <Text style={[s.tabTxt, tab===t && s.tabTxtActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.secTitle}>Featured Hotels</Text>
        {hotels.map((h,i) => (
          <TouchableOpacity key={i} style={s.hotelCard} activeOpacity={0.85}>
            <Image source={{uri:h.img}} style={s.hotelImg} resizeMode="cover"/>
            <View style={s.hotelInfo}>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                <Text style={s.hotelName}>{h.name}</Text>
                <View style={s.ratingBadge}><Text style={s.ratingTxt}>{h.rating}</Text></View>
              </View>
              <Text style={s.hotelCity}>📍 {h.city}</Text>
              <Text style={s.hotelStars}>{"⭐".repeat(h.stars)}</Text>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                <View>
                  <Text style={{fontSize:9,color:"#aaa"}}>Per night from</Text>
                  <Text style={s.hotelPrice}>${h.price}</Text>
                </View>
                <TouchableOpacity style={s.bookBtn}><Text style={s.bookBtnTxt}>Book</Text></TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
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
  avatar:{width:32,height:32,borderRadius:16,backgroundColor:colors.accent,justifyContent:"center",alignItems:"center"},
  avatarTxt:{color:"#fff",fontWeight:"700",fontSize:14},
  searchBox:{marginHorizontal:16,backgroundColor:colors.secondary,borderRadius:14,padding:12,flexDirection:"row",alignItems:"center",gap:10,borderWidth:1,borderColor:colors.green,marginBottom:4},
  searchPh:{color:"rgba(255,255,255,0.35)",fontSize:13},
  tabRow:{flexDirection:"row",gap:6,paddingHorizontal:16,marginVertical:8},
  tabBtn:{backgroundColor:colors.secondary,borderRadius:20,paddingHorizontal:12,paddingVertical:6,borderWidth:1,borderColor:colors.green},
  tabActive:{backgroundColor:colors.accent,borderColor:colors.accent},
  tabTxt:{color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:"600"},
  tabTxtActive:{color:"#fff"},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:2},
  secTitle:{fontSize:13,fontWeight:"700",color:colors.text,marginBottom:10},
  hotelCard:{backgroundColor:"#fff",borderRadius:16,overflow:"hidden",marginBottom:12,borderWidth:0.5,borderColor:colors.border},
  hotelImg:{width:"100%",height:160},
  hotelInfo:{padding:12},
  hotelName:{fontSize:14,fontWeight:"700",color:colors.text,flex:1,marginRight:8},
  hotelCity:{fontSize:11,color:"#777",marginBottom:3},
  hotelStars:{fontSize:11,marginBottom:2},
  ratingBadge:{backgroundColor:colors.secondary,borderRadius:6,paddingHorizontal:8,paddingVertical:3},
  ratingTxt:{color:"#fff",fontSize:11,fontWeight:"700"},
  hotelPrice:{color:colors.accent,fontSize:18,fontWeight:"800"},
  bookBtn:{backgroundColor:colors.accent,borderRadius:8,paddingHorizontal:16,paddingVertical:8},
  bookBtnTxt:{color:"#fff",fontSize:11,fontWeight:"700"},
});
