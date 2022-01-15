import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { setDestination } from '../slices/navSlice'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigations = useNavigation();
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning, Arvin</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder="Where To?"
                        minLength={2}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                        styles={toInputBoxStyles}
                        onFail={(error) => {
                            console.log(error);
                        }}
                        onPress={(data, details) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description
                                })
                            );
                            navigations.navigate('RideOptionsCard');
                        }}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: "en",
                        }}

                    />
                </View>
                <NavFavourites />
            </View>
            <View style={tw`flex-row justify-evenly py-1 mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                    onPress={() => navigations.navigate('RideOptionsCard')}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-evenly bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon name="fast-food" type="ionicon" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
