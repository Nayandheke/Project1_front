import { Carousel } from "react-bootstrap"
import { PackageList } from "../components"
import { useEffect, useState } from "react"
import http from "../http"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export const Home = () => {
    const [featured, setFeatured] = useState([])
    const [most, setMost] = useState([])
    const [topSelling, setTopSelling] = useState([])
    const [loading, setLoading] = useState([])

    const user = useSelector((state) => state.user.value);

    useEffect(() => {
        setLoading(true)
        http.get('places/featured')
            .then(({ data }) => {
                setFeatured(data)
                return http.get('places/most')
            })
            .then(({ data }) => {
                setMost(data)
                return http.get('places/top')
            })
            .then(({ data }) => setTopSelling(data))
            .catch(err => { })
            .finally(() => setLoading(false))

    }, [])

    return <>
        {Object.keys(user).length ? null : <div className="container-fluid bg-danger">
            <div className="row">
                <div className="col-lg-12">
                    <p className="text-center align-items-center m-1 fw-semibold">Please <span><Link to="/login" className="text-black fs-5">login</Link></span> to get exciting discounts on various packages.</p>
                </div>
            </div>
        </div>}

        <div className="container-fluid banner">
            <div className="row">
                <h1 className="text-center fw-bolder banner-text1 mb-5 text-danger">Its A Big World Out There.
                    <br />Go Explore<br /></h1>
            </div>
            <div className="container">
                <div className="d-flex flex-row mb-3 justify-content-center mt-5">
                    <div className="p-2">
                        <form>
                            <div className="btn-group">
                                <button type="button" className="btn btn-light dropdown-toggle b-button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    What Are You Interested In?
                                </button>
                                <ul className="dropdown-menu bg-danger">
                                    <li><a className="dropdown-item" href="#">Activities</a></li>
                                    <li><a className="dropdown-item" href="#">Trekking</a></li>
                                    <li><a className="dropdown-item" href="#">Tour</a></li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    <div className="p-2">
                        <form>
                            <div className="btn-group">
                                <button type="button" className="btn btn-light dropdown-toggle  b-button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    What Would You Like To Do?
                                </button>
                                <ul className="dropdown-menu bg-danger">
                                    <li><a className="dropdown-item" href="#">8000m Expedition</a></li>
                                    <li><a className="dropdown-item" href="#">8000m Expedition</a></li>
                                    <li><a className="dropdown-item" href="#">8000m Expedition</a></li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    <div className="p-2">
                        <button className="btn btn-danger b-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>



        {/* <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <Carousel>
                        <Carousel.Item>
                            <img src="../../public/slider-1.webp" className="slider-image" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="../../public/slider-1.webp" className="slider-image" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="../../public/slider-1.webp" className="slider-image" alt="" />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div> */}





        <div className="container-fluid mt-5 border-bottom border-2  pb-5">
            <PackageList title="TOP DESTINATIONS" places={[...featured].splice(0, 3)} loading={loading} />
        </div>

        <div className="container-fluid mt-5 border-bottom border-2 pb-5">
            <PackageList title="Tour of the Year" places={[...most].splice(0, 3)} loading={loading} most />
        </div>

        <div className="container-fluid mt-5">
            <PackageList title="Travel Deals" places={[...topSelling].splice(0, 3)} loading={loading} />
        </div>
    </>
}