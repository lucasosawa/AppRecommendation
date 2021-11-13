import React from 'react'
import { Text } from 'react-native'
import NintendoIcon from '../View/components/icons/NintendoIcon'
import WindowsIcon from '../View/components/icons/WindowsIcon'
import PlaystationIcon from '../View/components/icons/PlaystationIcon'
import XboxIcon from '../View/components/icons/XboxIcon'
import PhoneIcon from '../View/components/icons/PhoneIcon'
import AndroidIcon from '../View/components/icons/AndroidIcon'
import LinuxIcon from '../View/components/icons/LinuxIcon'
import AppleIcon from '../View/components/icons/AppleIcon'
import GlobeIcon from '../View/components/icons/GlobeIcon'
import AtariIcon from '../View/components/icons/AtariIcon'
import SegaIcon from '../View/components/icons/SegaIcon'
import CommodoreIcon from '../View/components/icons/CommodoreIcon'
import ThreeDOIcon from '../View/components/icons/ThreeDOIcon'
import EpicGamesIcon from '../View/components/icons/EpicGamesIcon'
import SteamIcon from '../View/components/icons/SteamIcon'
import AppstoreIcon from '../View/components/icons/AppstoreIcon'
import GogIcon from '../View/components/icons/GogIcon'
import PlaystoreIcon from '../View/components/icons/PlaystoreIcon'
import ItchIcon from '../View/components/icons/ItchIcon'
import { tailwind } from '../tailwind'
import fetchData from '../helpers/API/rawg'
import moment from 'moment'
import Intl from "intl"
import 'intl/locale-data/jsonp/en';

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-EN').format(number)
}

export const formatDate = (date) => {
  return moment(date).format('MMM D, YYYY')
}

export const getIcon = (platform) => {
  switch (platform) {
    case 'Xbox':
      return <XboxIcon size={14} />
    case 'PlayStation':
      return <PlaystationIcon size={16} />
    case 'PC':
      return <WindowsIcon size={13} />
    case 'iOS':
      return <PhoneIcon size={15} />
    case 'Android':
      return <AndroidIcon size={16} />
    case 'Web':
      return <GlobeIcon size={14} />
    case 'Apple Macintosh':
      return <AppleIcon size={15} />
    case 'Linux':
      return <LinuxIcon size={16} />
    case 'Nintendo':
      return <NintendoIcon size={16} />
    case 'SEGA':
      return <SegaIcon size={16} />
    case 'Atari':
      return <AtariIcon size={16} />
    case 'Commodore / Amiga':
      return <CommodoreIcon size={16} />
    case '3DO':
      return <ThreeDOIcon size={16} />
    default:
      return console.warn(platform)
  }
}

export const getStoreIcon = (store) => {
  switch (store) {
    case 'xbox360':
      return <XboxIcon size={14} />
    case 'gog':
      return <GogIcon size={17} />
    case 'xbox-store':
      return <XboxIcon size={14} />
    case 'playstation-store':
      return <PlaystationIcon size={17} />
    case 'epic-games':
      return <EpicGamesIcon size={17} />
    case 'steam':
      return <SteamIcon size={15} />
    case 'nintendo':
      return <NintendoIcon size={17} />
    case 'apple-appstore':
      return <AppstoreIcon size={15} />
    case 'google-play':
      return <PlaystoreIcon size={15} />
    case 'itch':
      return <ItchIcon size={24} />
    default:
      return <Text style={tailwind('text-white')}>{store}</Text>
  }
}

export const getScoreColor = (score) => {
  const parsedScore = parseInt(score)

  if (!score) {
    console.error('cannot return score color: no score provided')
  }

  if (parsedScore > 50 && parsedScore < 75) {
    return '#FDCA52'
  } else if (parsedScore >= 75) {
    return '#44BD49'
  } else {
    return '#fff'
  }
}

export const fetchNextData = async (currentContext, contextAction) => {
  try {
    if (currentContext.next) {
      const data = await fetchData(currentContext.next)

      if (!data) {
        return console.error('no data')
      }

      if (currentContext.results.length && data.results.length) {
        contextAction((oldData) => ({
          ...data,
          results: [...oldData.results, ...data.results],
        }))
      }
    }
  } catch (err) {
    console.error(err)
  }
}
