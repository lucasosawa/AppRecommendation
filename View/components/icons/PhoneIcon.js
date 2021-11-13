import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { tailwind } from '../../../tailwind'

const PhoneIcon = ({ size }) => {
  return (
    <View style={{...tailwind('flex self-center mr-1'), width: size, height: size}}>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 18">
        <Path
          fill="#FFF"
          d="M9.538 0H1.651C.896 0 .287.587.287 1.31v15.368c0 .723.61 1.31 1.364 1.31h7.887c.754 0 1.364-.587 1.364-1.31V1.31c0-.723-.61-1.31-1.364-1.31zm-5.89.796h3.894c.098 0 .178.14.178.315 0 .174-.08.316-.178.316H3.648c-.099 0-.177-.142-.177-.316 0-.174.078-.315.177-.315zm1.947 15.898c-.48 0-.87-.375-.87-.836 0-.462.39-.835.87-.835s.87.373.87.835c0 .461-.39.836-.87.836zM9.88 13.83H1.31V2.21h8.57v11.62z"
        />
      </Svg>
    </View>
  )
}

export default PhoneIcon