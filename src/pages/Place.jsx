import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../http"
import { Loading, PackageList } from "../components"
import { imgUrl } from "../lib"
import { useSelector } from "react-redux"

export const Place = () => {
    const [place, setPlace] = useState({})
    const [loading, setLoading] = useState(false)
    const [similars, setSimilars] = useState([])
    const [imgLarge, setImgLarge] = useState('')

    const user = useSelector(state => state.user.value)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        http.get(`places/${params.id}`)
            .then(({data}) => {
                setPlace(data)
                setImgLarge(data.images[0])

                return http.get(`places/${params.id}/similar`)
            })
            .then(({data}) =>setSimilars(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    },[params.id])

    return loading ? <Loading/> : <>

    <div className="container-fluid">
    <div className="row ">
        <img className="img-fluid m-0 p-0 position-absolute" src={`${imgUrl(imgLarge)}`} alt="" />
        <h1 className="text-center banner-text1 text-danger position-relative mb-5 pb-5">{place.name}</h1>
    </div>
    </div>

    <div className="container pa-con">
    <div className="row">
        <div className="col-lg-7 mt-3 ms-4">
        <h3 className=" fw-bold">Cross this off your “bucket list” – a “dream come true experience”</h3>
        <h5 className="text-center mt-5" dangerouslySetInnerHTML={{__html:place.summary}}></h5>
        <p className="mt-5" dangerouslySetInnerHTML={{__html: place.description}}></p> 
        <div className="border-2 border-top border-dark mt-5" />
        <h3 className="banner-text text-center mt-5 text-danger">Photos</h3>


        {/* {place.images &&  place.images.map((image, i) => 
            <div className="photos" key={i}>
                <img className="img-fluid  position-absolute" src={`${imgUrl(image)}`}  alt="" />
            </div>
        )} */}

        {place.images && place.images.map((image, i) => (
            <div className="photos d-flex" key={i}>
                {/* <div className="img-small border photos"
                    style={{ backgroundImage: `url('${imgUrl(image)}')`, height: `100px`}}>
                </div> */}
                <img  src={`${imgUrl(image)}`} alt="" />
            </div>
        ))}

        <div className="border-2 border-top border-dark mt-5" />
        <h3 className="mt-5 text-center banner-text text-danger">Latest Traveller's Reviews</h3>
        <p className="text-center fst-italic mt-4 fw-bold">"Travel experiences of our clients who recently returned from their trips."</p>
        <div className="card p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end">
            <div className="container">
            <div className="row mt-2">
                <div className="col-lg-3">
                <div className="stars d-flex">
                    <h5 className="fa-solid fa-star me-1" />
                    <h5 className="fa-solid fa-star me-1" />
                    <h5 className="fa-solid fa-star me-1" />
                    <h5 className="fa-solid fa-star me-1" />
                    <h5 className="fa-solid fa-star" />
                </div>
                <p className="fw-bold fs-6 m-0">Paradee Padee Wattanathon</p>
                <p className="text-muted">2 months ago</p>
                </div>
                <div className="col-lg-9 ">
                <h4 className="text-bold">A Trekking Experience Beyond Expectations</h4>
                <p className="mt-3">I had read numerous positive reviews about this company, so I decided to book my ABC trek online. Little did I know that I was about to embark on an adventure of a lifetime. My guide was not only friendly but also incredibly professional. He left no stone unturned in ensuring my safety and well-being. From the very first step to the guesthouse, he motivated me with his enthusiasm and expertise. Even in unfavorable weather conditions, he skillfully guided me without compromising on our safety. I wholeheartedly recommend this company and my guide to anyone seeking an unforgettable trekking experience.</p>
                </div>
            </div>
            <div className="border-top border-1 border-dark mt-3" />
            <div className="row mt-5">
                <div className="col-lg-3">
                <div className="stars d-flex">
                    <h5 className="fa-solid fa-star me-1" />
                    <h5 className="fa-solid fa-star me-1" />
                    <h5 className="fa-solid fa-star me-1" />
                    <h5 className="fa-solid fa-star me-1" />
                    <h5 className="fa-solid fa-star" />
                </div>
                <p className="fw-bold fs-6 m-0">Jirat Ratsedthapoom</p>
                <p className="text-muted">2 months ago</p>
                </div>
                <div className="col-lg-9 ">
                <h4 className="text-bold">Exceptional Service and Professionalism</h4>
                <p className="mt-3">From the moment I booked my ABC trek online, I knew I was in good hands. My guide, who was friendly and well-organized, made sure I had the best experience possible. He went above and beyond to take care of every detail, ensuring my safety and comfort throughout the entire journey. Even in challenging weather conditions, his professionalism shone through as he guided me without a single dangerous situation. I cannot recommend this company and my guide enough. Book with them without any hesitation!</p>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className="col-lg-4 ms-5 ">
        <div className="row sticky-top">
            <div className="card mt-4 align-items-center ms-5 border-4 border-danger">
            <h5 className="fst-italic mt-3">All Inclusive Cost</h5>
            <h5 className="text-center fw-bolder">
            {place.discounted_price ? <>
                    <span className="package-price-old">
                        <strike>${place.price}</strike><br/>
                    </span>
                    <span className="package-price">
                        ${place.discounted_price}
                    </span>
                </> : <span className="package-price">
                    ${place.price}
                </span>}
            </h5>
            <p className="fw-semibold">Per Person</p>
            <div className="stars d-flex">
                <h5 className="fa-solid fa-star me-1" />
                <h5 className="fa-solid fa-star me-1" />
                <h5 className="fa-solid fa-star me-1" />
                <h5 className="fa-solid fa-star me-1" />
                <h5 className="fa-solid fa-star" />
            </div>
            <button className="btn btn-danger align-items-center mt-2">Book Now</button>
            <h3 className="text-center fw-light mt-2">Share:</h3>
            <div className="social">
                <h4 className="fa-brands fa-facebook me-1" />
                <h4 className="fa-brands fa-twitter me-1" />
                <h4 className="fa-brands fa-pinterest me-1" />
                <h4 className="fa-solid fa-envelope" />
            </div>
            </div>
            <div className="container1 ms-5 mt-5">
            <h3 className="text-light">Add Reviews:</h3>
            <div className="post">
                <div className="text">Thanks for rating us!</div>
                <div className="edit">EDIT</div>
            </div>
            <div className="star-widget">
                <input type="radio" name="rate" id="rate-5" />
                <label htmlFor="rate-5" className="fas fa-star" />
                <input type="radio" name="rate" id="rate-4" />
                <label htmlFor="rate-4" className="fas fa-star" />
                <input type="radio" name="rate" id="rate-3" />
                <label htmlFor="rate-3" className="fas fa-star" />
                <input type="radio" name="rate" id="rate-2" />
                <label htmlFor="rate-2" className="fas fa-star" />
                <input type="radio" name="rate" id="rate-1" />
                <label htmlFor="rate-1" className="fas fa-star" />
                <form1 action="#">
                <header />
                <div className="textarea">
                    <textarea cols={30} placeholder="Describe your experience.." defaultValue={""} />
                </div>
                <div className="btn">
                    <button type="submit">Post</button>
                </div>
                </form1>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    {similars.length ? <div className="container border-top mt-5 border-2 border-dark">
        <div className="row mt-4">
            <h2 className="text-center banner-text text-danger ">More Exciting Package</h2>
                <div className="col-lg-4">
                    <PackageList places={[...similars].splice(0,3)}/>
                </div>
        </div>
    </div> : null}
    </>
}