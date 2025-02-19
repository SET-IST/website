import { PrizeData } from '@/data/prizes'
import { Paper, Image, em } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export default function Prize({ title, image, description }: PrizeData) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  // Set container size based on screen size
  const containerClasses = isMobile
    ? 'w-full h-[320px]'       // On mobile, full width & 320px tall 
    : 'w-[400px] h-[200px]'    // On desktop, 400px wide & 200px tall

  return (
    <Paper
      radius={0}
      className={`relative z-0 overflow-hidden select-none cursor-default grow flex items-center justify-center ${containerClasses}`}
    >
      <Image
        alt="Prémio"
        src={image.src}
        fit="contain"
        className="object-center w-full h-full"
      />
      <div className="group absolute inset-0 z-30">
        <div className="absolute inset-0 z-10 bg-[#00415a] opacity-70 sm:opacity-50 transition-all"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-stretch justify-end">
          <div className="p-4">
            <h2 className="text-white text-2xl font-semibold sm:group-hover:opacity-0 transition-all">
              {title}
            </h2>
            <h3 className="text-white sm:hidden text-lg font-medium transition-all">
              {description}
            </h3>
          </div>
        </div>
        <div className="absolute inset-0 z-30 opacity-0 sm:group-hover:bg-[#00415a] sm:group-hover:opacity-90 transition-all flex flex-col items-center justify-center">
          <h3 className="text-white text-xl font-bold transition-all text-center">
            {description}
          </h3>
        </div>
      </div>
    </Paper>
  )
}
