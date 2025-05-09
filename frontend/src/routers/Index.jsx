import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TentangKami from '../pages/Guest/TentangKami'
import Beranda from '../pages/Guest/Beranda'
import GuestLayout from '../layouts/GuestLayout'
import TestingSocketIo from '../testing/TestingSocketIo'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<GuestLayout />} >
                <Route path="/" element={<Beranda />} />
                <Route path="/tentangkami" element={<TentangKami />} />
                <Route path="/testing" element={<TestingSocketIo />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;