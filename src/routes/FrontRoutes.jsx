import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import * as Pages from "../pages"

export const FrontRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Pages.Home/>}/>
                <Route path="category/:id" element={<Pages.Category/>}/>
                <Route path="choice/:id" element={<Pages.Choice/>}/>
                <Route path="place/:id" element={<Pages.Place/>}/>
                <Route path="login" element={<Pages.Login/>}/>
                <Route path="register" element={<Pages.Register/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}