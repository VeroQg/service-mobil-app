import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import * as WebBrowser from "expo-web-browser"
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import Colors from '../../Utils/Colors';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();

    //const { startOAuthFlow } = useOAuth({ strategy:"oauth_google"});
    
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
            
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

  return (
    <View style={{alignItems: 'center'}}>
        <Image source={require('./../../../assets/images/login.png')}
                style={styles.loginImage}
        />
        <View style={styles.subContainer}>
            <Text style={{fontSize: 27, color: Colors.WHITE, textAlign: 'center'}}>
                Encuentra 
                <Text style={{fontWeight: 'bold'}}> profesionales de servicio </Text> 
                de limpieza y reparacion        
            </Text>
            <Text style={{fontSize: 17, color: Colors.WHITE, textAlign: 'center', marginTop: 20}}>
                Esta es la mejor aplicacion para encontrar servicios cerca
                de ti que te provee servicios profesionales
            </Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{textAlign: 'center', fontSize: 17, color: Colors.PRIMARY}}>
                    Empecemos
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginImage:{
        width: 230,
        height: 450,
        marginTop: 70,
        borderWidth: 4,
        borderColor: Colors.BLACK,
        borderRadius: 15
    },
    subContainer:{
        width: '100%',
        height: '70%',
        backgroundColor: Colors.PRIMARY,
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
    },
    button:{
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        marginTop: 40
    }
})