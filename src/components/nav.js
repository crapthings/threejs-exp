import Icon from '@mdi/react'

import {
  mdiMovieRoll,
  mdiMenu,
} from '@mdi/js'

export default function Nav () {
  return (
    <div className='sticky top-0 flex justify-between items-center desktop:px-24 p-8 text-xl'>
      <div className='text-4xl'>Trendintek</div>

      <div>宣传片</div>

      <div>导航</div>
    </div>
  )
}
