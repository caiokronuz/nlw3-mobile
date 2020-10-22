import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import { useNavigation } from '@react-navigation/native';

import api from '../services/api'

interface Orphanage{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const {navigate} = useNavigation(); 
    
    useEffect(() => {
      api.get('/orphanages').then(response => {
          setOrphanages(response.data);
      })
    }, [orphanages])

    function HandleNavigateToOrphanageDetails(id: number){
      navigate('OrphanageDetails', {id})
    }

    function HandleNavigateToCreateOrphanage(){
      navigate('SelectMapPosition')
    }

    return(
        <View style={styles.container}>  
        <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map} 
          initialRegion={{
            latitude: -3.7899266,
            longitude: -38.5889878,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
            }}
        >
          {orphanages.map(orphanage => (
             <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
               x: 3.4,
               y: 1,
             }}
             coordinate={{
               latitude: orphanage.latitude,
               longitude: orphanage.longitude,
             }}
           >
             <Callout tooltip onPress={() => HandleNavigateToOrphanageDetails(orphanage.id)}>
               <View style={styles.calloutContainer}>
                 <Text style={styles.callouText}>{orphanage.name}</Text>
               </View>
             </Callout>
           </Marker>
          ))}
        </MapView>
  
        <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados.</Text>
  
            <TouchableOpacity style={styles.createOrphanageButton} onPress={HandleNavigateToCreateOrphanage}>
              <Feather name="plus" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
      </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    callouText: {
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  