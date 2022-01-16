import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
    {
        id: 'Uber-X-123',
        title: 'UberX',
        multiplier: 1,
        image: require('../assets/UberX.webp')
    },
    {
        id: 'Uber-XL-456',
        title: 'Uber XL',
        multiplier: 1.2,
        image: require('../assets/UberXL.webp')
    },
    {
        id: 'Uber-LUX-789',
        title: 'Uber LUX',
        multiplier: 1.75,
        image: require('../assets/Lux.webp')
    }
]

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const SURGE_CHARGE_RATE = 1.5;
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Rides - {parseFloat((travelTimeInformation?.distance?.value) / 1000).toFixed(2)} km
                </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, multiplier, title, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10
                        ${id === selected?.id && "bg-gray-200"}`}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={image}
                        />
                        <View style={tw`-ml-6 px-3`}>
                            <Text style={tw`text-xl font-bold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                        </View>
                        <Text style={tw`text-xl`}>₹
                            {
                                parseFloat((travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 10).toFixed(2)
                            }
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black py-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
