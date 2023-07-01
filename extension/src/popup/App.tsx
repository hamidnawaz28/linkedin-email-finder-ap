


import React, { useState } from 'react'
import { ScreenContext } from '../context'
import Popup from './Popup'
import Layout from '../components/layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('scrapper');
  return (
    <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      <ToastContainer position="bottom-right" />
      <Layout>
        <Popup />
      </Layout>
    </ScreenContext.Provider>
  )
}

export default App