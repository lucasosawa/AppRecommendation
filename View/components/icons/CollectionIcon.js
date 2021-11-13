import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { View } from 'react-native'
import { tailwind } from '../../../tailwind'

const CollectionIcon = ({ size }) => {
  return (
    <View style={{...tailwind('flex self-center'), width: size, height: size}}>
      <Svg
        class="SVGInline-svg discover-sidebar__icon-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 18"
      >
        <Path
          fill="#FFF"
          fill-rule="evenodd"
          d="M1.31 1.481c0-.106.087-.193.196-.193h5.605c.053 0 .103.02.14.057L8.454 2.53c.281.276.67.433 1.065.433h7.273c1.047 0 1.898.839 1.898 1.869v.192H4.91c-.83 0-1.505.666-1.505 1.483v10.205h-.197c-1.047 0-1.898-.839-1.898-1.869V1.481zm8.209.194a.199.199 0 01-.139-.057L8.177.434A1.508 1.508 0 007.111 0H1.506C.676 0 0 .664 0 1.481v13.362C0 16.584 1.44 18 3.208 18h13.584C18.56 18 20 16.584 20 14.843V4.832c0-1.74-1.44-3.157-3.208-3.157H9.519z"
        />
      </Svg>
    </View>
  )
}

export default CollectionIcon