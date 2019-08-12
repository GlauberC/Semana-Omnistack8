import React, {useEffect, useState} from 'react'
import styled from 'styled-components//native'
import AsyncStorage from '@react-native-community/async-storage'

// SafeAreaView - Deixa o conteudo em baixo do statusbar (Visualmente só altera no IOS e EXPO)

import api from '../services/api'

import logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'

import { StyleSheet } from 'react-native'

export default ({ navigation }) => {
    const id = navigation.getParam('user')

    const [users, setUsers] = useState([])
    
    useEffect(() => {
        const loadUsers = async () => {
            const response = await api.get('/devs', {
                headers: {
                    user: id
                }
            })
            setUsers(response.data)
        }
        loadUsers()
    }, [id])

    const handleLike =  async () => {
        const [user, ... rest] = users
        await api.post(`/devs/${user._id}/likes`, null, {
            headers: {user: id}
        })
        setUsers(rest)
    }
    const handleDislike =  async () => {
        const [user, ... rest] = users
        await api.post(`/devs/${user._id}/deslikes`, null, {
            headers: {user: id}
        })
        setUsers(rest)
    }
    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Login')
    }

    return (
        <Container>
            <LogoBtn onPress = {handleLogout}>
                <Logo source = {logo} />
            </LogoBtn>
            <CardsContainer>
                { users.length === 0 
                    ? <EmptyText>Nenhum usuário disponível :(</EmptyText>
                    : users.map((user, index) => (
                        <CardView key = {user._id} style = {{zIndex: users.length - index}}>
                            <FotoUsuario source = {{uri: user.avatar}}/>
                            <FooterCardView>
                                <NomeText>{user.name}</NomeText>
                                <BioText numberOfLines = {3}>{user.bio}</BioText>
                            </FooterCardView>
                        </CardView>    
                    ))
                    }            
            </CardsContainer>
            <ButtonsContainer>
                <ButtonLD style = {styles.shadow} onPress = {handleDislike}>
                    <ImageLD source = {dislike}/>
                </ButtonLD>
                <ButtonLD style = {styles.shadow} onPress = {handleLike}>
                    <ImageLD source = {like}/>
                </ButtonLD>
            </ButtonsContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background: #f5f5f5;
    align-items: center;
    justify-content: space-between;
`

const LogoBtn = styled.TouchableOpacity`
`
const Logo = styled.Image``

const CardsContainer = styled.View`
    flex: 1;
    align-self: stretch;
    justify-content: center;
    max-height: 500px;

`
const CardView = styled.View`
    border-width: 1px;
    border-color: #ddd;
    border-radius: 8px;
    margin: 30px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const FotoUsuario = styled.Image`
    flex: 1;
    height: 300px;
`
const FooterCardView = styled.View`
    background: #fff;
    padding: 15px 20px;
`
const NomeText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`

const BioText = styled.Text`
    font-size: 14px;
    color: #999;
    margin-top: 5px;
    line-height: 18px;
`
const ButtonsContainer = styled.View`
    flex-direction: row;
    margin-bottom: 30px;
`
const ButtonLD = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: #fff;
    justify-content: center;
    align-items: center;
    margin: 0px 20px;
`
const ImageLD = styled.Image`
`


const styles = StyleSheet.create({
    shadow:{
        // Android 
        elevation: 2,

        // IOS
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    }
})

const EmptyText = styled.Text`
    align-self: center;
    color: #999;
    font-size: 24px;
    font-weight: bold;

`
