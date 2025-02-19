import { Text, Modal, Transition } from '@mantine/core'
import { PrizeCard } from './PrizeCard'
import { useAward, useProfile } from '@/lib/frontend/hooks'
import { fetchRedemptionSettings, RedemptionSettings, StudentProfile, Award, fetchAwardsList } from '@/lib/frontend/api'
import { useQuery } from '@tanstack/react-query'
import { WheelDataType } from 'react-custom-roulette'
import React, { useEffect, useState } from 'react'
import { useBoundStore } from '@/lib/frontend/store'

// https://github.com/effectussoftware/react-custom-roulette/issues/135#issuecomment-2038621991
import dynamic from 'next/dynamic';
const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false, });


export function ModalContent() {
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);
  const [wheelStopped, setWheelStopped] = useState(false);
  const [lastAwardToken] = useState(() => useBoundStore.getState().token)
  const [token, setToken] = useState('')
  const showRedeemModal = useBoundStore((state) => state.showRedeemModal)

  // Fetch user data
  const { data, isLoading: isUserLoading, isError: isUserError } = useProfile()

  console.log("data: ", data)
  console.log("isUserLoading: ", isUserLoading)
  console.log("isUserError: ", isUserError)

  // Fetch award data
  const {
    data: awardData,
    isSuccess: awardLoaded,
    error: awardError,
    refetch,
    isLoading: isAwardLoading,
  } = useAward()

  console.log("awardLoading: ", isAwardLoading)
  console.log("awardData: ", awardData)
  console.log("awardLoaded: ", awardLoaded)
  console.log("awardError: ", awardError)

  // Check if user has enough points for a redeem
  const notEnoughPoints = awardError?.response?.status === 400
  console.log("notEnoughPoints: ", notEnoughPoints)

  const user = data as StudentProfile
  const redemptionSettings = useQuery<RedemptionSettings>(['redemptionSettings'], () => fetchRedemptionSettings())


  // Load awards list
  const { data: awardsListData, isLoading: isAwardsListLoading, isError: isAwardsListError, isSuccess: wheel_data_loaded } = useQuery<Award[]>(['awardsList'], () => fetchAwardsList())
  console.log("awardsList: ", awardsListData)

  // Create data for the wheel
  const data_wheel: WheelDataType[] = Array.isArray(awardsListData) && awardData?.type
  ? awardsListData?.filter((award) => award.type === awardData.type)?.map((award) => ({ option: award.name, optionSize: award.amountAvailable }))
  : [{ option: "Carregando..." }];

  // const data_wheel: WheelDataType[] = awardsListData ? awardsListData.map((award) => ({ option: award?.name })) : [{"option": "Carregando..."}]
  console.log("data_wheel: ", data_wheel)
  console.log("lastAwardToken:", lastAwardToken);
  console.log("awardData:", awardData?.id);

  // const isVisible = useBoundStore((state) => state.redeemModalVisible)
  // console.log("isVisible:", isVisible);

  // if (isVisible && !awardData) {
  //     refetch() // Fetch only when modal opens
  //     console.log("🕰️ refetching...")
  // }

  // Checkes if the award token has been previously seen
  const isSameToken = lastAwardToken === awardData?.id;
  console.log(isSameToken ? "same" : "different");


  // Debug Wheel stoped
  useEffect(() => {
    console.log("Wheel Stopped:", wheelStopped); // ✅ Debugging
  }, [wheelStopped]); // Runs whenever wheelStopped changes


  // Starts the wheel when the award is loaded
  useEffect(() => {
    if (awardLoaded && data_wheel.length > 1 && !notEnoughPoints) {
      console.log("setting up wheel...");
      const prizeIndex = data_wheel.findIndex((item) => item.option === awardData?.award.name);
      console.log("prizeIndex:", prizeIndex);
      console.log("target:" , data_wheel[prizeIndex].option);
      setPrizeNumber(prizeIndex);
      console.log("wheel setup done");
      setMustSpin(true);
      console.log("wheel started");
    }
  }, [awardLoaded, data_wheel]);

  // Closes model after redeeming
  useEffect(() => {
    if(awardLoaded){
      if (token === ''){
        setToken(awardData?.id || '')
      }
      else{
        showRedeemModal(false)
      }
    }
  }, [awardData]);

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
                mounted={true} //{awardLoaded}
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
                          prizeNumber={prizeNumber as number}
                          data={data_wheel}
                          onStopSpinning={() => {
                            setTimeout(() => {
                              setMustSpin(false);
                              setWheelStopped(true);
                            }, 2000); // Delay of 2 seconds
                          }}
                          spinDuration={0.70}
                        />
                      ) : (
                        <PrizeCard award={awardData} />
                      )
                    )}
                  </div>

                {/* {lastAwardToken == awardData?.id ? (
                  <PrizeCard award={awardData} />
                ) :( */}
                  {/* <div>
                    {!wheelStopped ? (
                      <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data_wheel}
                        onStopSpinning={() => { // wait 1 second for readind the prize, and then hide wheel and show qrcode
                          setTimeout(() => {
                            setWheelStopped(true);
                          }, 1000);
                        }}
                        spinDuration={0.70}
                      />
                    ) : (
                      <PrizeCard award={awardData} />
                    )}
                  </div> */}
                {/* )} */}
                </div>
                )}
              </Transition>
            </div>
          </div>
            )}
          </div>

          {/* <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-4">
              <Transition
                mounted={true} //{awardLoaded}
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
                          prizeNumber={prizeNumber}
                          data={data_wheel}
                          onStopSpinning={() => {
                            setTimeout(() => {
                              setWheelStopped(true);
                            }, 2000); // Delay of 2 seconds
                          }}
                          spinDuration={0.70}
                        />
                      ) : (
                        <PrizeCard award={awardData} />
                      )
                    )}
                  </div> */}

                {/* {lastAwardToken == awardData?.id ? (
                  <PrizeCard award={awardData} />
                ) :( */}
                  {/* <div>
                    {!wheelStopped ? (
                      <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data_wheel}
                        onStopSpinning={() => { // wait 1 second for readind the prize, and then hide wheel and show qrcode
                          setTimeout(() => {
                            setWheelStopped(true);
                          }, 1000);
                        }}
                        spinDuration={0.70}
                      />
                    ) : (
                      <PrizeCard award={awardData} />
                    )}
                  </div> */}
                {/* )} */}
                {/* </div>
                )}
              </Transition>
            </div>
          </div> */}
        </div>

        {/* {useEffect(() => {
          console.log("Wheel Stopped:", wheelStopped);
        }, [wheelStopped])} */}

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
