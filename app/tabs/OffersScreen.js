import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Image } from "react-native";
import { colors } from "../../lib/theme";
import { api } from "../../lib/api";

export default function OffersScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("All");
  const tabs = ["All","Flights","Hotels","Packages"];

  useEffect(() => {
    api.getData().then(d => setData(d)).catch(() => {});
  }, []);

  const defaultOffers = [
    { title:"Summer Flash Sale", sub:"Up to 40% off flights to Europe", discount:"40% OFF", code:"SUMMER40", img:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80", tag:"Flights" },
    { title:"Dubai Getaway Package", sub:"Flight + 3 nights hotel included", discount:"30% OFF", code:"DUBAI30", img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80", tag:"Packages" },
    { title:"Istanbul Weekend Deal", sub:"Direct flights from $199", discount:"25% OFF", code:"IST25", img:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80", tag:"Flights" },
    { title:"London Hotel Special", sub:"5-star hotels from $280/night", discount:"20% OFF", code:"LON20", img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80", tag:"Hotels" },
    { title:"Paris Romantic Escape", sub:"Couples package with transfers", discount:"35% OFF", code:"PARIS35", img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80", tag:"Packages" },
  ];

  const offers = data?.offers?.length > 0 ? data.offers.map((o,i) => ({
    title: o.title?.en || defaultOffers[i%defaultOffers.length].title,
    sub: o.subtitle?.en || defaultOffers[i%defaultOffers.length].sub,
    discount: o.discount || defaultOffers[i%defaultOffers.length].discount,
    code: o.code || defaultOffers[i%defaultOffers.length].code,
    img: defaultOffers[i%defaultOffers.length].img,
    tag: defaultOffers[i%defaultOffers.length].tag,
  })) : defaultOffers;

  const filtered = tab === "All" ? offers : offers.filter(o => o.tag === tab);

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={s.header}>
        <Text style={s.title}>Exclusive Offers</Text>
        <View style={s.avatar}><Text style={s.avatarTxt}>T</Text></View>
      </View>
      <View style={s.tabRow}>
        {tabs.map((t,i) => (
          <TouchableOpacity key={i} style={[s.tabBtn, tab===t && s.tabActive]} onPress={() => setTab(t)}>
            <Text style={[s.tabTxt, tab===t && s.tabTxtActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        {filtered.map((o,i) => (
          <TouchableOpacity key={i} style={s.offerCard} activeOpacity={0.85} onPress={() => navigation.navigate("Search")}>
            <Image source={{uri:o.img}} style={s.offerImg} resizeMode="cover"/>
            <View style={s.offerOverlay}/>
            <View style={s.offerContent}>
              <View style={s.discBadge}><Text style={s.discTxt}>{o.discount}</Text></View>
              <Text style={s.offerTitle}>{o.title}</Text>
              <Text style={s.offerSub}>{o.sub}</Text>
              <View style={s.codeRow}>
                <View style={s.codeBox}><Text style={s.codeTxt}>Code: {o.code}</Text></View>
                <TouchableOpacity style={s.useBtn} onPress={() => navigation.navigate("Search")}>
                  <Text style={s.useBtnTxt}>Use Now →</Text>
                </TouchableOpacity>
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
  tabRow:{flexDirection:"row",gap:6,paddingHorizontal:16,marginBottom:4},
  tabBtn:{backgroundColor:colors.secondary,borderRadius:20,paddingHorizontal:14,paddingVertical:6,borderWidth:1,borderColor:colors.green},
  tabActive:{backgroundColor:colors.accent,borderColor:colors.accent},
  tabTxt:{color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:"600"},
  tabTxtActive:{color:"#fff"},
  body:{flex:1,backgroundColor:colors.background,borderRadius:24,padding:14,marginTop:2},
  offerCard:{borderRadius:16,overflow:"hidden",marginBottom:14,height:200,position:"relative"},
  offerImg:{width:"100%",height:"100%",position:"absolute"},
  offerOverlay:{position:"absolute",inset:0,backgroundColor:"rgba(0,0,0,0.5)"},
  offerContent:{position:"absolute",inset:0,padding:16,justifyContent:"flex-end"},
  discBadge:{backgroundColor:colors.accent,borderRadius:6,paddingHorizontal:10,paddingVertical:3,alignSelf:"flex-start",marginBottom:6},
  discTxt:{color:"#fff",fontSize:11,fontWeight:"800"},
  offerTitle:{color:"#fff",fontSize:16,fontWeight:"700",marginBottom:3},
  offerSub:{color:"rgba(255,255,255,0.75)",fontSize:11,marginBottom:10},
  codeRow:{flexDirection:"row",alignItems:"center",gap:8},
  codeBox:{backgroundColor:"rgba(255,255,255,0.2)",borderRadius:8,paddingHorizontal:10,paddingVertical:5,borderWidth:1,borderColor:"rgba(255,255,255,0.3)"},
  codeTxt:{color:"#fff",fontSize:10,fontWeight:"700"},
  useBtn:{backgroundColor:colors.accent,borderRadius:8,paddingHorizontal:14,paddingVertical:6},
  useBtnTxt:{color:"#fff",fontSize:11,fontWeight:"700"},
});
