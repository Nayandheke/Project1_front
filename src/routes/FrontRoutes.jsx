import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import * as Pages from "../pages"
import { PrivateRoutes } from "./PrivateRoutes"

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
                <Route path="book" element={<Pages.Book/>}/>
                <Route path="search" element={<Pages.Search/>}/>
                <Route path="profile" element={<PrivateRoutes element={<Pages.Profile />} />} />
            </Route>
        </Routes>
    </BrowserRouter>
}