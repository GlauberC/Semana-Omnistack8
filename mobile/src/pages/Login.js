import React, { useState, useEffect} from 'react'
import styled from 'styled-components/native'
import { AsyncStorage } from 'react-native';
import {
    Image,
    KeyboardAvoidingView  // Joga o conteúdo pra cima quando acionar o teclado
} from 'react-native'

import logo from '../assets/logo.png'

export default ( {navigation} ) => {

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', { user })
            }
        })
    }, [])

    const handleLogin = async () => {

        // O Axios não estava funcionando
        const responseReq = await fetch('http://177.89.36.87:3333/devs', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
            }),
          });


        const {_id} = await responseReq.json()
        await AsyncStorage.setItem('user', _id)
        navigation.navigate('Main', { _id })
    }

    const [user, setUser] = useState('')

    return(

        <ContainerView
        behavior = "padding"
        >
            <Image source = {logo}/>
            <LoginInput placeholder = "Digite seu usuário no github"
                autoCorrect = {false}
                placeholderTextColor = "#999"
                autoCapitalize = "none"
                value = {user}
                onChangeText = {setUser}
                />
            <LoginButton onPress = {handleLogin}>
                <LoginText>Entrar</LoginText>
            </LoginButton>
        </ContainerView>
    )
}

const ContainerView = styled.KeyboardAvoidingView`
    flex: 1;
    background: #f5f5f5;
    justify-content: center;
    align-items: center;
    padding: 30px;
`

const LoginInput = styled.TextInput`
    height: 46px;
    align-self: stretch;
    background: #fff;
    border-width: 1;
    border-color: #ddd;
    border-radius: 4px;
    margin-top: 20px;
    padding: 0 15px;
`
const LoginButton = styled.TouchableOpacity`
    height: 46px;
    align-self: stretch;
    background: #df4323;
    border-radius: 4px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
`
const LoginText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`