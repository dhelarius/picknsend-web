import DataTable from './screens/Customers/DataTable'
import Auth from './screens/auth/Auth'
import './App.css'
import Home from './screens/home/Home'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader/Loader'
import { useLoader } from './components/Loader/hooks/loader-hook'
import Popover from './components/common/Popover/Popover'
import { usePopover } from './components/common/Popover/hooks/popover-hook'

function App() {
  const { popover } = usePopover({});
  const { loader } = useLoader();

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/:authMode' element={<Auth loader={loader} popover={popover} />} />
      </Routes>
      <Popover {...popover.getPopoverProps()} />
      <Loader {...loader.getLoaderProps()} />
    </>
  )
}

export default App
