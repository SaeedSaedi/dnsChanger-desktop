import { useState } from 'react'
import { Button, Tooltip } from 'react-daisyui'
import { FaBroom } from 'react-icons/fa'
import { appNotif } from '../../notifications/appNotif'

export function FlushDNS_BtnComponent() {
  const [loading, setLoading] = useState<boolean>(false)

  async function handleClick() {
    if (loading) return
    setLoading(true)
    const result = await window.ipc.flushDns()
    setLoading(false)
    if (result.success) {
      appNotif('Success', `DNS Flushed Successfully`, 'SUCCESS')
    } else {
      appNotif('Failed', `Failed to Flush DNS`, 'ERROR')
    }
  }

  return (
    <div>
      <Tooltip message="Flush DNS" position="top">
        <Button
          shape={'circle'}
          size={'sm'}
          onClick={handleClick}
          disabled={loading}
          className={
            'bg-[#e2e2e2] hover:bg-[#d3d2d2] dark:bg-[#383838] hover:dark:bg-[#323232]  border-none text-center'
          }>
          <FaBroom
            className={`dark:text-gray-600 text-gray-700  ${loading ? 'animate-pulse' : ''}`}
            size={16}
          />
        </Button>
      </Tooltip>
    </div>
  )
}
