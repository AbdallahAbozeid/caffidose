import { useState } from 'react'
import Authentication from './components/Authentication'
import CoffeeForm from './components/CoffeeForm'
import Hero from './components/Hero'
import Histroy from './components/Histroy'
import Layout from './components/Layout'
import Modal from './components/Modal'
import Stats from './components/Stats'
import { useAuth } from './context/AuthContext'
function App() {
  const { globalData, globalUser } = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length
  const [showModal, setShowModal] = useState(false)
  function handleCloseModal() { setShowModal(false) }
  function handleOpenModal() { setShowModal(true) }
  const authenticatedContent = (
    <>
      <Stats />
      <Histroy />
    </>
  )

  return (
    <>
      {
        showModal && (
          <Modal handleCloseModal={handleCloseModal}>
            <Authentication handleCloseModal={handleCloseModal} />
          </Modal>
        )
      }
      <Layout handleOpenModal={handleOpenModal}>
        <Hero />
        <CoffeeForm isAuthenticated={isAuthenticated}
          handleOpenModal={handleOpenModal} />
        {(isAuthenticated && isData) && (authenticatedContent)}
      </Layout>
    </>
  )
}

export default App
