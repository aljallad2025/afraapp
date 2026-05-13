import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Image } from "react-native";
import { colors } from "../../lib/theme";

export default function AttractionsScreen({ navigation }) {
  const [cat, setCat] = useState("All");
  const cats = ["All","Museums","Parks","Tours","Food","Shopping"];
  const items = [
    { name:"Burj Khalifa", city:"Dubai", cat:"Landmarks", price:35, rating:9.6, img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80", duration:"2-3 hrs" },
    { name:"Hagia Sophia", city:"Istanbul", cat:"Museums", price:0, rating:9.8, img:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80", duration:"1-2 hrs" },
    { name:"Tower of London", city:"London", cat:"Landmarks", price:42, rating:9.2, img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80", duration:"3-4 hrs" },
    { name:"Eiffel Tower", city:"Paris", cat:"Landmarks", price:28, rating:9.9, img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80", duration:"1-2 hrs" },
    { name:"Shibuya Crossing", city:"Tokyo", cat:"Parks", price:0, rating:9.4, img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", duration:"1 hr" },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <Text style={s.title}>Attractions</Text>
        <View style={s.avatar}><Text style={s.avatarTxt}>T</Text></View>
      </View>
      <View style={s.searchBox}>
        <Text style={{fontSize:16}}>🔍</Text>
        <Text style={s.searchPh}>Search attractions...</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{maxHeight:44}} contentContainerStyle={{paddingHorizontal:14,gap:6,alignItems:"center"}}>
        {cats.map((c,i) => (
          <TouchableOpacity key={i} style={[s.catBtn, cat===c && s.catActive]} onPress={() => setCat(c)}>
            <Text style={[s.catTxt, cat===c && s.catTxtActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.secTitle}>Top Attractions</Text>
        <View style={s.grid}>
          {items.map((a,i) => (
            <TouchableOpacity key={i} style={s.card} activeOpacity={0.85}>
              <Image source={{uri:a.img}} style={s.cardImg} resizeMode="cover"/>
              <View style={s.cardOverlay}/>
              <View style={s.cardTop}>
                <View style={s.ratingBadge}><Text style={s.ratingTxt}>{a.rating} ⭐</Text></View>
              </View>
              <View style={s.cardBot}>
                <Text style={s.cardName}>{a.name}</Text>
                <Text style={s.cardCity}>📍 {a.city} · ⏱ {a.duration}</Text>
                <Text style={s.cardPrice}>{a.price===0?"Free":"From $"+a.price}</Text>
              </View>
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
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,paddingTop:50,paddingBottom:12},
  title:{color:"#fff",fontSize:18,fontWeight:"700"},
  avatar:{width:32,height:32,borderRadius:16,backgroundColor:colors.accent,justifyContent:"center",alignItems:"center"},
  avatarTxt:{color:"#fff",fontWeight:"700",fontSize:14},
  searchBox:{marginHorizontal:16,backgroundColor:colors.secondary,borderRadius:14,padding:12,flexDirection:"row",alignItems:"center",gap:10,borderWidth:1,borderColor:colors.green,marginBottom:8},
  searchPh:{color:"rgba(255,255,255,0.35)",fontSize:13},
  catBtn:{backgroundColor:colors.secondary,borderRadius:20,paddingHorizontal:12,paddingVertical:6,borderWidth:1,borderColor:colors.green},
  catActive:{backgroundColor:colors.accent,borderColor:colors.accent},
  catTxt:{color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:"600"},
  catTxtActive:{color:"#fff"},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:8},
  secTitle:{fontSize:13,fontWeight:"700",color:colors.text,marginBottom:10},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
  card:{width:"47%",borderRadius:14,overflow:"hidden",height:160,position:"relative"},
  cardImg:{width:"100%",height:"100%",position:"absolute"},
  cardOverlay:{position:"absolute",inset:0,backgroundColor:"rgba(0,0,0,0.35)"},
  cardTop:{position:"absolute",top:8,right:8},
  ratingBadge:{backgroundColor:"rgba(0,0,0,0.6)",borderRadius:6,paddingHorizontal:6,paddingVertical:2},
  ratingTxt:{color:"#fff",fontSize:9,fontWeight:"700"},
  cardBot:{position:"absolute",bottom:0,left:0,right:0,padding:10,background:"linear-gradient(transparent,rgba(0,0,0,0.8))"},
  cardName:{color:"#fff",fontSize:12,fontWeight:"700"},
  cardCity:{color:"rgba(255,255,255,0.75)",fontSize:9,marginTop:2},
  cardPrice:{color:colors.accent,fontSize:11,fontWeight:"700",marginTop:3},
});
