import { Text, Modal, Transition } from '@mantine/core'
import { PrizeCard } from './PrizeCard'
import { useAward, useProfile } from '@/lib/frontend/hooks'
import { fetchRedemptionSettings, RedemptionSettings, StudentProfile, Awards, fetchAwardsList } from '@/lib/frontend/api'
import { useQuery } from '@tanstack/react-query'
import { WheelDataType } from 'react-custom-roulette'
import React, { useEffect, useState } from 'react'
import { useBoundStore } from '@/lib/frontend/store'

// https://github.com/effectussoftware/react-custom-roulette/issues/135#issuecomment-2038621991
import dynamic from 'next/dynamic';
const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false, });


export function ModalContent() {
  const disableInitialAnimation = false;  // Isto morre qnd se mete a true; n vamos questionar os deuses das react custom roulettes
  const radiusLineWidth = 5;
  const outerBorderWidth = 5;
  const innerBorderWidth = 0;
  const outerBorderColor = '#FFFFFF';
  const innerBorderColor = '#FFFFFF';
  const radiusLineColor = '#FFFFFF';
  const backgroundColors = [
    '#FF6900',
    '#FCB900',
    '#7BDCB5',
    '#00D084',
    '#8ED1FC',
    '#ABB8C3',
    '#EB144C',
    '#F78DA7',
    '#9900EF',
  ];
  const textColors = [
    '#202020',
  ]
  const fontSize = 18;

  const [prizeNumber, setPrizeNumber] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);
  const [wheelStopped, setWheelStopped] = useState(false);
  // const [lastAwardToken, setLastToken] = useBoundStore((state) => state.LastAwardToken)
  const setLastToken = useBoundStore((state) => state.setLastToken)
  const lastAwardToken = useBoundStore((state) => state.token)
  const [token, setToken] = useState('')
  const showRedeemModal = useBoundStore((state) => state.showRedeemModal)

  // Fetch user data
  const { data, isLoading: isUserLoading, isError: isUserError } = useProfile()

  // Fetch award data
  const {
    data: awardData,
    isSuccess: awardLoaded,
    error: awardError,
  } = useAward()

  // Check if user has enough points for a redeem
  const notEnoughPoints = awardError?.response?.status === 400

  const user = data as StudentProfile
  const redemptionSettings = useQuery<RedemptionSettings>(['redemptionSettings'], () => fetchRedemptionSettings())

  // Load awards list
  const { data: awardsListData, isLoading: isAwardsListLoading, isError: isAwardsListError, isSuccess: wheel_data_loaded } = useQuery<Awards>(['awardsList'], () => fetchAwardsList())

  // Create data for the wheel
  const data_wheel: WheelDataType[] = Array.isArray(awardsListData) && awardData?.type
  ? awardsListData?.filter((award) => award.type === awardData.type)?.map((award) => ({ option: award.name, optionSize: award.amountAvailable }))
  : [{ option: "Carregando..." }];

  // Checkes if the award token has been previously seen
  const isSameToken = lastAwardToken === awardData?.id;

  // Starts the wheel when the award is loaded
  useEffect(() => {
    if (awardLoaded && data_wheel.length > 1 && !notEnoughPoints && !mustSpin) {
      const prizeIndex = data_wheel.findIndex((item) => item.option === awardData?.award.name);
      setPrizeNumber(prizeIndex);
      setMustSpin(true);
    }
  }, [awardLoaded, data_wheel]);

  // Closes model after redeeming
  useEffect(() => {
    if(awardLoaded){
      if (token === ''){
        setToken(awardData?.id || '')
      } else if (token !== awardData?.id){        // Another token was loaded
        showRedeemModal(false)
      }
    }
    // No Token
    else{
      // AwardError means there are no points
      // AwardData means that there were points previousle
      // meaning a qr was redeemed and all points were spent
      // token === '' means user reopened the prize with no points after redeeming the last one
      if(awardError && awardData && token !==''){
        showRedeemModal(false)
      }
    }
  }, [awardData, awardError]);

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
            <Text c="white" ta="center" fz="lg" fw={500}>
              Tens <strong>{user?.studentDetails?.points}</strong> pontos por
              gastar
            </Text>
            {notEnoughPoints ? (
              <Text c="white" ta="center" fz="md" fw={500}>
                Faltam-te{' '}
                <strong>{(redemptionSettings.data?.REDEEM ?? 0) - (user?.studentDetails?.points ?? 0)}</strong>{' '}
                pontos para teres um brinde
              </Text>
            ) : (
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
                  <div>
                    {isSameToken ? (
                      <PrizeCard award={awardData} />
                    ) : (
                      !wheelStopped ? (
                        <Wheel
                          mustStartSpinning={mustSpin}
                          backgroundColors={backgroundColors}
                          outerBorderColor={outerBorderColor}
                          innerBorderColor={innerBorderColor}
                          radiusLineColor={radiusLineColor}
                          outerBorderWidth={outerBorderWidth}
                          innerBorderWidth={innerBorderWidth}
                          radiusLineWidth={radiusLineWidth}
                          fontSize={fontSize}
                          disableInitialAnimation={disableInitialAnimation}
                          textColors={textColors}
                          prizeNumber={prizeNumber as number}
                          data={data_wheel}
                          onStopSpinning={() => {
                            setTimeout(() => {
                              setMustSpin(false);
                              setLastToken(awardData?.id || '')
                              setWheelStopped(true);
                            }, 2000);
                          }}
                          spinDuration={0.70}
                        />
                      ) : (
                        <PrizeCard award={awardData} />
                      )
                    )}
                  </div>

                </div>
                )}
              </Transition>
            </div>
          </div>
            )}
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
