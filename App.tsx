import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const BIKES = [
  { id: '1', name: 'Pinarello', price: '1800', disc: '1350', category: 'Roadbike', img: require('./image/1.png'), desc: 'A premium road bike with high performance frame.' },
  { id: '2', name: 'Pina Mountain', price: '1700', disc: '1450', category: 'Mountain', img: require('./image/2.png'), desc: 'Mountain bike designed for rugged terrains.' },
  { id: '3', name: 'Pina Bike', price: '1500', disc: '1200', category: 'Roadbike', img: require('./image/3.png'), desc: 'Lightweight road bike for speed and stability.' },
  { id: '4', name: 'Pinarello', price: '1900', disc: '1600', category: 'Roadbike', img: require('./image/4.png'), desc: 'Special edition with advanced carbon components.' },
  { id: '5', name: 'Pinarello', price: '1900', disc: '1600', category: 'Mountain', img: require('./image/3.png'), desc: 'Special edition with advanced carbon components.' },
  { id: '6', name: 'Pinarello', price: '1900', disc: '1600', category: 'Roadbike', img: require('./image/2.png'), desc: 'Special edition with advanced carbon components.' },
];

function Bike({ navigation }: any) {
  return (
    <SafeAreaView style={s.page}>
      <Text style={{ textAlign: 'center' }}>A premium online store for sporter and their stylish choice</Text>
      <View style={s.card}>
        <Image source={BIKES[0].img} style={{ width: 200, height: 150 }} resizeMode="contain" />
        <Text style={s.title}>POWER BIKE{'\n'} SHOP</Text>
      </View>
      <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('Home')}>
        <Text style={s.btnTxt}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function Home({ navigation }: any) {
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? BIKES : BIKES.filter((item) => item.category === category);

  return (
    <SafeAreaView style={s.page}>
      <Text style={s.header}>The world's Best Bike </Text>
      <View style={s.filterRow}>
        {['All', 'Roadbike', 'Mountain'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[s.tab, category === cat && s.tabActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={{ color: category === cat ? '#E94A4A' : '#BEB6B6', fontWeight: 'bold' }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(i) => i.id}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
        renderItem={({ item }) => (
<TouchableOpacity style={[s.card, { width: '48%', padding: 10 }]} onPress={() => navigation.navigate('Detail', { bike: item })}>
            <Image source={item.img} style={{ width: 100, height: 80 }} resizeMode="contain" />
            <Text style={{ fontWeight: '500' }}>{item.name}</Text>
            <Text style={s.price}><Text style={{ color: '#E94A4A' }}>$</Text>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

function Detail({ route, navigation }: any) {
  const { bike } = route.params || { bike: BIKES[0] };
  return (
    <SafeAreaView style={s.page}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
          <Text style={{ color: '#E94A4A', fontWeight: 'bold' }}>← Back</Text>
        </TouchableOpacity>
        <View style={s.card}>
          <Image source={bike.img} style={{ width: 220, height: 160 }} resizeMode="contain" />
        </View>
        <Text style={s.title}>{bike.name}</Text>
        <Text style={s.price}>${bike.disc} <Text style={{ textDecorationLine: 'line-through', color: '#888', fontSize: 14 }}>${bike.price}</Text></Text>
        <Text style={s.title}>Description</Text>
        <Text style={{ color: '#666', marginVertical: 5 }}>{bike.desc}</Text>
        <TouchableOpacity style={s.btn}>
          <Text style={s.btnTxt}>Add to cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bike" component={Bike} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: { backgroundColor: '#FDECEF', borderRadius: 20, padding: 15, alignItems: 'center', marginVertical: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  header: { fontSize: 18, fontWeight: 'bold', color: '#E94A4A', marginVertical: 10 },
  price: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  btn: { backgroundColor: '#E94A4A', padding: 14, borderRadius: 25, alignItems: 'center', marginTop: 'auto' },
  btnTxt: { color: '#fff', fontWeight: 'bold' },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  tab: { borderWidth: 1, borderColor: '#E94A4A33', borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 },
  tabActive: { backgroundColor: '#FDECEF', borderColor: '#E94A4A' },
});