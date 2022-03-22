import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native'
import { tailwind } from '../../../../tailwind'
import fetchData from '../../../../helpers/API/rawg'
import Header from '../../Header'
import { SearchContext } from '../../../../context/SearchContext'
import { useRoute } from '@react-navigation/native'
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold,} from '@expo-google-fonts/poppins'
import axios from 'axios'
import GameDetailHeader from '../../detail-screen/GameDetailHeader'
import GameDetailScreenshots from '../../detail-screen/GameDetailScreenshots'
import GameDetailStores from '../../detail-screen/GameDetailStores'
import GameDetailAbout from '../../detail-screen/GameDetailAbout'
import GameDetailInfoGrid from '../../detail-screen/GameDetailInfoGrid'
import GameDetailReviews from '../../detail-screen/GameDetailReviews'

const DetailScreen = () => {
  const [gameData, setGameData] = useState(null)
  const [gameScreenshots, setGameScreenshots] = useState(null)
  const [gameStores, setGameStores] = useState(null)
  const [gameReviews, setGameReviews] = useState(null)
  const { header } = useContext(SearchContext)
  const [expandHeader, setExpandHeader] = header
  const gameSlug = useRoute().params.slug
  useEffect(() => {
    setExpandHeader(false)
    getDameData()

    return () => {
      setExpandHeader(true)
      setGameData(null)
      setGameScreenshots(null)
      setGameStores(null)
      setGameReviews(null)
    }
  }, [])

  const getDameData = async () => {
    try {
      const gameData = await axios.all([
        fetchData(`games/${gameSlug}`, '?'),
        fetchData(`games/${gameSlug}/screenshots`, '?'),
        fetchData(`games/${gameSlug}/stores`, '?'),
        fetchData(`games/${gameSlug}/reviews`, '?'),
      ])

      setGameData(gameData[0])
      setGameScreenshots(gameData[1])
      setGameStores(gameData[2])
      setGameReviews(gameData[3])
    } catch (err) {
      console.error(err)
    }
  }

  const [fontsLoaded] = useFonts({Poppins_400Regular, Poppins_500Medium, Poppins_700Bold})

  return (
    <SafeAreaView style={tailwind('bg-main-grey flex-1')}>
      <View style={tailwind('flex-1')}>
        <Header arrow />
        {gameData &&
        gameScreenshots &&
        gameStores &&
        gameReviews &&
        fontsLoaded ? (
          <ScrollView style={tailwind('mt-4 flex-1')}>
            <GameDetailHeader
              releaseDate={gameData.released}
              platforms={gameData.parent_platforms}
              name={gameData.name}
            />

            {gameScreenshots.results.length ? (
              <GameDetailScreenshots data={gameScreenshots.results} />
            ) : null}

            {gameData.stores.length ? (
              <GameDetailStores gameData={gameData} gameStores={gameStores} />
            ) : null}

            {gameData.description_raw ? (
              <GameDetailAbout description={gameData.description_raw} />
            ) : null}

            <GameDetailInfoGrid
              platforms={gameData.parent_platforms}
              metacritic={gameData.metacritic}
              genres={gameData.genres}
              releaseDate={gameData.released}
              updateDate={gameData.updated}
              playtime={gameData.playtime}
              website={gameData.website}
              achievementsCount={gameData.achievements_count}
              esrb={gameData.esrb_rating}
            />

            {gameReviews.results.length ? (
              <GameDetailReviews reviews={gameReviews.results} />
            ) : null}
          </ScrollView>
        ) : (
          <View style={tailwind('justify-center items-center flex-1')}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default DetailScreen