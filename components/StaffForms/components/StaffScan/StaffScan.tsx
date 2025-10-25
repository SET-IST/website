import { Modal } from '@mantine/core'
import { Reader, ScannerProps } from './Reader'

export function StaffScan(props: ScannerProps) {
  return (
    <Modal
      opened={props.visible}
      onClose={() => props.onClose()}
      styles={{
        content: {
          backgroundColor: 'rgb(28, 126, 214)',
        },
        body: {
          padding: '0px',
        },
        header: {
          backgroundColor: 'transparent',
        },
      }}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'scale-y', duration: 200 }}
      withCloseButton={false}
    >
      <div className="h-screen p-4 flex flex-col">
        <div className="w-full flex justify-end">
          <Modal.CloseButton
            iconSize={25}
            className="!text-white hover:!text-[#1C7ED6] hover:bg-white"
          />
        </div>
        <div className="grow flex flex-col items-center justify-start mt-10">
          <div className="flex flex-col gap-5">
            <Reader {...props} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
