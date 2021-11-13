import React, { useContext, useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { tailwind } from '../../tailwind'
import { useFonts, Poppins_400Regular, Poppins_900Black,} from '@expo-google-fonts/poppins'
import { SearchContext } from '../../context/SearchContext'
import fetchData from '../../helpers/API/rawg'
import { Ionicons } from '@expo/vector-icons'
import RawgSelect from './search-screen/RawgSelect'
import { useRoute } from '@react-navigation/native'
import { formatNumber } from '../../utilities/Utils'
import { useNavigation } from '@react-navigation/native'

const Header = ({ arrow }) => {
  useEffect(() => {
    getGamesCount()
    getPlatforms()

    return () => {
      setGamesCount(0)
      setGamesPlatforms(null)
    }
  }, [])

  const route = useRoute()
  const routeName = route.name
  const navigation = useNavigation()

  const [fontsLoaded] = useFonts({Poppins_400Regular,Poppins_900Black,})

  const { result, text, header } = useContext(SearchContext)
  const [searchResult, setSearchResult] = result
  const [searchText, setSearchText] = text
  const [expandHeader, setExpandHeader] = header
  const [gamesCount, setGamesCount] = useState(0)
  const [gamesPlatforms, setGamesPlatforms] = useState(null)

  const getSearchResult = async () => {
    let query

    if (!searchText) {
      query = fetchData('games', '?')
    } else {
      query = fetchData(`games?search=${searchText}`, '&')
    }

    try {
      navigation.navigate('Search', { filters: true, card: 'game' })
      const text = searchText.split(' ').join('-')
      const gamesList = await query
      setSearchResult(gamesList)
    } catch (err) {
      console.error(err)
    }
  }

  const getGamesCount = async () => {
    try {
      const gamesList = await fetchData('games', '?')
      const count = formatNumber(gamesList.count)
      setGamesCount(count)
    } catch (err) {
      console.error(err)
    }
  }

  const getPlatforms = async () => {
    try {
      const platformsData = await fetchData('platforms', '?')
      const platforms = []
      platformsData.results.forEach((p) => {
        platforms.push({ label: p.name, value: p.id })
      })

      setGamesPlatforms(platforms)
    } catch (err) {
      console.error(err)
    }
  }

  const handleBackArrow = () => {
    if (routeName === 'Search') {
      setTimeout(() => {
        setSearchResult(null)
      }, 200)
    }

    if (routeName === 'Search' || routeName === 'Detail') {
      setExpandHeader(true)
    }

    navigation.pop()
  }

  const searchInput = useRef(null)

  return (
    <>
      {fontsLoaded ? (
        <View style={tailwind('px-4 py-10')}>
          <View style={tailwind('flex flex-row items-center mt-6 mb-2')}>
            {arrow ? (
              <TouchableOpacity style={tailwind('mr-2')} onPress={() => handleBackArrow()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ) : null}
            <Text style={{...tailwind('text-white text-4xl tracking-widest text-center'),fontFamily: 'Poppins_900Black',}}>
              GDevSkills
            </Text>
          </View>

          {expandHeader ? (
            <View style={tailwind('mb-6')}>
              <View style={tailwind('flex flex-row bg-secondary-grey rounded-full h-10 text-white')}>
                <TouchableOpacity style={tailwind('flex items-center justify-center w-12')}onPress={() => searchInput.current.focus()}>
                  <Ionicons name="search-sharp" size={18} color="rgba(255,255,255,0.6)"/>
                </TouchableOpacity>
                <TextInput placeholder={gamesCount ? `Search ${gamesCount} games` : null} placeholderTextColor="rgba(255,255,255,0.6)" keyboardType="web-search" keyboardAppearance="dark" autoCapitalize="none" autoCorrect={false} style={tailwind('flex-1 pr-8 text-white')} onSubmitEditing={getSearchResult} onChangeText={setSearchText} value={searchText} ref={searchInput}/>
              </View>

              {routeName === 'Search' &&
              gamesPlatforms &&
              route.params &&
              route.params.filters ? (
                <View >
          
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}
    </>
  )
}

export default Header