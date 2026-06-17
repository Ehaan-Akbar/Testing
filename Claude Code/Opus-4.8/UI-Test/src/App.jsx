import TopBar from './components/TopBar'
import LeftColumn from './components/LeftColumn'
import MiddleColumn from './components/MiddleColumn'
import RightColumn from './components/RightColumn'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-canvas p-4 sm:p-6">
      {/* Outer rounded panel that frames the whole dashboard */}
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-line bg-panel p-4 sm:p-6 shadow-card">
        <TopBar />

        {/* Three-column workspace. Collapses to one column on small screens. */}
        <main className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LeftColumn />
          </div>
          <div className="lg:col-span-5">
            <MiddleColumn />
          </div>
          <div className="lg:col-span-3">
            <RightColumn />
          </div>
        </main>
      </div>
    </div>
  )
}
