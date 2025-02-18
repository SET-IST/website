import { Text, Modal, Transition } from '@mantine/core'
import { PrizeCard } from './PrizeCard'
import { useAward, useProfile } from '@/lib/frontend/hooks'
import { fetchRedemptionSettings, RedemptionSettings, StudentProfile } from '@/lib/frontend/api'
import { useQuery } from '@tanstack/react-query'
import { awards } from '@/data/awards'
import { WheelDataType } from 'react-custom-roulette'
import React, { useEffect, useState } from 'react'
import { useBoundStore } from '@/lib/frontend/store'

// https://github.com/effectussoftware/react-custom-roulette/issues/135#issuecomment-2038621991
import dynamic from 'next/dynamic';
const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false, });


export function ModalContent() {
  const { data, isLoading: isUserLoading, isError: isUserError } = useProfile()

   const data_wheel: WheelDataType[] = [
    { option: 'OLA'},
    { option: 'ADEUS'},
    { option: 'TESTE'},
    { option: '0' },
    { option: '1' },
    { option: '2' },
  ]

  const [prizeNumber, setPrizeNumber] = useState(0);
  const [mustSpin, setMustSpin] = useState(true);
  


  const {
    data: awardData,
    isSuccess: awardLoaded,
    error: awardError,
    refetch
  } = useAward()

  const notEnoughPoints = awardError?.response?.status === 400

  const user = data as StudentProfile
  const redemptionSettings = useQuery<RedemptionSettings>(['redemptionSettings'], () => fetchRedemptionSettings())


  const [wheelStopped, setWheelStopped] = useState(false);

  const [lastAwardToken] = useState(() => useBoundStore.getState().token)
  console.log("lastAwardToken:", lastAwardToken);
  console.log("awardData:", awardData?.id);
  // if (!awardData) {
  //     refetch() // ✅ Fetch only when modal opens
  //   }
  refetch()
  console.log("refetching...")

  lastAwardToken == awardData?.id ? console.log("same") : console.log("different") // FIXME: on mobile, it shows always the wheel
  

  return (
    <div className="h-screen p-4 flex flex-col">
      <div className="w-full flex justify-end">
        <Modal.CloseButton
          iconSize={25}
          className="!text-white hover:!text-[#1C7ED6] hover:bg-white"
        />
      </div>
      <div className="grow flex flex-col items-center gap-8 mt-16">
        <div className="flex flex-col gap-8">
          <div>
            <Text c="white" ta="center" fz={25} fw={700}>
              Olá {user?.name.split(' ')[0]}
            </Text>
            {/* <Text c="white" ta="center" fz="lg" fw={500}>
              Tens <strong>{user?.studentDetails?.points}</strong> pontos por
              gastar
            </Text> */}
            {notEnoughPoints && (
              <Text c="white" ta="center" fz="md" fw={500}>
                Faltam-te{' '}
                <strong>{(redemptionSettings.data?.REDEEM ?? 0) - (user?.studentDetails?.points ?? 0)}</strong>{' '}
                pontos para teres um brinde
              </Text>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-4">
              <Transition
                mounted={awardLoaded}
                transition="slide-up"
                duration={200}
                timingFunction="ease"
                keepMounted
              >
              {(styles) => (
                <div
                  className="w-full flex flex-col gap-4 items-center"
                  style={styles}
                >

                {/* {lastAwardToken == awardData?.id ? (
                  <PrizeCard award={awardData} />
                ) :( */}
                  <div>
                    
                
                    {!wheelStopped ? (
                      <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data_wheel}
                        onStopSpinning={() => setWheelStopped(true)} // Hide wheel and show prize
                        spinDuration={0.70}
                      />
                    ) : (
                      <PrizeCard award={awardData} />
                    )}
                  </div>
                {/* )} */}
                </div>
                )}
              </Transition>
            </div>
          </div>
        </div>

        {wheelStopped && (
          <div>
            <Text c="white" ta="center" fz="sm" fw={500}>
              Apresenta este código na receção para reclamares o teu brinde
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
