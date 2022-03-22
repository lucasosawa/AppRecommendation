import React, { useEffect, useContext } from 'react'
import { SafeAreaView, ScrollView, View, StatusBar } from 'react-native'
import { tailwind } from '../../../../tailwind'
import BrowseSection from '../../home-screen/BrowseSection'
import GamesCarousel from '../../home-screen/GamesCarousel'
import Header from '../../Header'
import fetchData from '../../../../helpers/API/rawg'
import axios from 'axios'
import AppLoading from 'expo-app-loading'
import { HomeContext } from '../../../../context/HomeContext'


const HomeScreen = () => {
  const { releases, score } = useContext(HomeContext)
  const [newReleases, setNewReleases] = releases
  const [bestScore, setBestScore] = score

  const getData = async () => {
    try {
      const homeRequests = await axios.all([
        fetchData('games?ordering=released', '&'),
        fetchData('games?ordering=-metacritic', '&'),
      ])
      // console.log(homeRequests[1])
      setNewReleases(homeRequests[0])
      setBestScore(homeRequests[1])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData()

    return () => {
      setNewReleases(null)
      setBestScore(null)
    }
  }, [])

  return (
    <>
      {newReleases && bestScore ? (
        <SafeAreaView style={tailwind('bg-main-grey flex-1')}>
          <View style={tailwind('bg-main-grey flex-1')}>
            <ScrollView>
              <Header />
              {/* <BrowseSection /> */}
              <GamesCarousel
                context={[newReleases, setNewReleases]}
                title="New releases"
                data={newReleases ? newReleases.results : null}
                loading={newReleases ? false : true}
              />
              <GamesCarousel
                context={[bestScore, setBestScore]}
                title="Best score"
                data={bestScore ? bestScore.results : null}
                loading={bestScore ? false : true}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
      ) : (
        <AppLoading />
      )}
    </>
  )
}

export default HomeScreen