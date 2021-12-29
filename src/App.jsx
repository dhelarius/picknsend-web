import DataTable from './screens/Customers/DataTable'
import { RequiredAuth } from './screens/auth/Auth'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader/Loader'
import { useLoader } from './components/Loader/hooks/loader-hook'
import Popover from './components/common/Popover/Popover'
import { usePopover } from './components/common/Popover/hooks/popover-hook'
import { AuthProvider } from './context/provider'
import { Home, Auth, Main } from './screens'

function App() {
  const { popover } = usePopover({});
  const { loader } = useLoader();

  return (
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<Home />}>
          <Route exact path='/:authMode' element={<Auth loader={loader} popover={popover} />} />
        </Route>
        <Route 
          exact path="/main" 
          element={
            <RequiredAuth>
              <Main />
            </RequiredAuth>
          } 
        />
      </Routes>
      <Popover {...popover.getPopoverProps()} />
      <Loader {...loader.getLoaderProps()} />
    </AuthProvider>
  )
}

export default App
