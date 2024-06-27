/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {useLayout} from '../../core'

type Props = {
  DefaultTitle: any
  pageModal?: any
}

const Toolbar3: FC<Props> = ({DefaultTitle, pageModal}) => {
  const {classes} = useLayout()

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(
          classes.toolbarContainer.join(' '),
          'd-flex flex-stack justify-content-between fw-bolder text-uppercase'
        )}
      >
        <h3 className='font-wh text-white'>{DefaultTitle}</h3>
        {/* begin::Actions */}
        <div className='d-flex align-items-center py-1'>
          {/* begin::Button */}

          {pageModal}
          {/* end::Button */}
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar3}
