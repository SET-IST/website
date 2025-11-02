import SetLogo from '@/assets/logos/logo_jet.svg'

const Loader = () => {
  return (
    <div
      role="progressbar"
      className="fixed inset-0 flex items-center justify-center animate-fade-in bg-white"
    >
      <SetLogo />
    </div>
  )
}

export default Loader
