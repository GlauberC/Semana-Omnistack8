import React, {useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import styled from 'styled-components/native'
import logo from '../assets/logo.png'
import api from '../services/api'

// KeyboardAvoidingView para subir o teclado (apenas no IOS ou no EXPO)

export default ( {navigation} ) => {
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', { user })
            }
        })
    }, [])


    handleLogin = async () => {
        const response = await api.post('/devs', { username: user })
        const { _id } = response.data

        await AsyncStorage.setItem('user', _id)

        navigation.navigate('Main', { _id })

    }


    const [user, setUser] = useState('')

    return(
        <Container>
            <Logo source = {logo}/>
            <LoginInput
                autoCorrect = {false}
                autoCapitalize = 'none'
                placeholder = "Digite o seu usuário do facebook"
                placeholderTextColor = "#999"
                value = {user}
                onChangeText = {setUser}
            />
            <LoginButton onPress = {handleLogin}>
                <LoginText>Entrar</LoginText>
            </LoginButton>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background: #f5f5f5;
    justify-content: center;
    align-items: center;
    padding: 30px;
`

const Logo = styled.Image`

`
const LoginInput = styled.TextInput`
    height: 46px;
    align-self: stretch;
    background: #fff;
    border-width: 1px;
    border-color: #ddd;
    border-radius: 4px;
    margin-top: 20px;
    padding: 0 15px;
`
const LoginButton = styled.TouchableOpacity`
    height: 46px;
    align-self: stretch;
    background: #df4723;
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