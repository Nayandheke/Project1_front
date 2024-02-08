import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import http from "../http"
import { BookBtn, Loading, PackageList } from "../components"
import { imgUrl, setInForm } from "../lib"
import { useSelector } from "react-redux"
import moment from "moment"

export const Place = () => {
    const [place, setPlace] = useState({})
    const [loading, setLoading] = useState(false)
    
    const [imgLarge, setImgLarge] = useState('')
    const [form, setForm] = useState({ rating: 1 })
    const [rating, setRating] = useState(0)
    const [qty, setQty] = useState(1)
    const [stars, setStars] = useState({ '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 })

    const user = useSelector(state => state.user.value)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        http.get(`places/${params.id}`)
            .then(({ data }) => {
                setPlace(data)
                setImgLarge(data.images[0])

                return http.get(`places/${params.id}/similar`)
            })
            .catch(err => { })
            .finally(() => setLoading(false))
    }, [params.id])

    useEffect(() => {
        if (place.reviews && place.reviews.length) {
            let sum = 0;
            let temp = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

            for (let review of place.reviews) {
                sum += review.rating;
                temp[`${review.rating}`] += 1;
            }

            setRating(sum / place.reviews.length);
            setStars({
                1: (temp["1"] / place.reviews.length) * 100,
                2: (temp["2"] / place.reviews.length) * 100,
                3: (temp["3"] / place.reviews.length) * 100,
                4: (temp["4"] / place.reviews.length) * 100,
                5: (temp["5"] / place.reviews.length) * 100,
            });
        }
    },[place.reviews]);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        http.post(`places/${params.id}/review`, form)
            .then(() => http.get(`places/${params.id}`))
            .then(({ data }) => {
                setProduct(data);
                setImgLarge(data.image[0]);
                
                setForm({rating : 1})
            })
            .catch(err => {})
            .finally(() => setLoading(false));
        };

    return loading ? <Loading /> : <>
        <div className="container-fluid">
            <div className="row ">
                <img className="img-fluid m-0 p-0 position-absolute w-100 h-75" src={`${imgUrl(imgLarge)}`} alt="" />
                <h1 className="text-center banner-text1 text-danger position-relative mb-5 pb-5">{place.name}</h1>
            </div>
        </div>

        <div className="container pa-con">
            <div className="row">
                <div className="col-lg-7 mt-3 ms-4">
                    <h3 className=" fw-bold">Cross this off your “bucket list” – a “dream come true experience”</h3>
                    <h5 className="text-center mt-5" dangerouslySetInnerHTML={{ __html: place.summary }}></h5>
                    <p className="mt-5" dangerouslySetInnerHTML={{ __html: place.description }}></p>
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
                            <img className="w-100" src={`${imgUrl(image)}`} alt="" />
                        </div>
                    ))}

                </div>
                <div className="col-lg-4 ms-5 ">
                    <div className="row sticky-top">
                        <div className="card mt-4 align-items-center ms-5 border-4 border-danger">
                            <h5 className="fst-italic mt-3">All Inclusive Cost</h5>
                            <h5 className="text-center fw-bolder">
                                {place.discounted_price ? <>
                                    <span className="package-price-old">
                                        <strike>${place.price}</strike><br />
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
                            <BookBtn place={place}/>
                            <h3 className="text-center fw-light mt-2">Share:</h3>
                            <div className="social">
                                <h4 className="fa-brands fa-facebook me-1" />
                                <h4 className="fa-brands fa-twitter me-1" />
                                <h4 className="fa-brands fa-pinterest me-1" />
                                <h4 className="fa-solid fa-envelope" />
                            </div>
                        </div>
                        {Object.keys(user).length ? <div className="card m-3 p-3 align-items-center ms-5 border-4 border-danger rating-card">
                            <h3>Add Your Review</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 mt-2">
                                    <textarea className="form-control" placeholder="Give your review" name="comment" defaultValue={form.comment} onChange={ev => setInForm(ev, form, setForm)} />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex ratings justify-content-end flex-row-reverse">
                                        <input type="radio" defaultValue={5} name="rating" id="rating-5" checked={form.rating == 5} onChange={ev => setInForm(ev, form, setForm)} />
                                        <label htmlFor="rating-5" />

                                        <input type="radio" defaultValue={4} name="rating" id="rating-4" checked={form.rating == 4} onChange={ev => setInForm(ev, form, setForm)} />
                                        <label htmlFor="rating-4" />

                                        <input type="radio" defaultValue={3} name="rating" id="rating-3" checked={form.rating == 3} onChange={ev => setInForm(ev, form, setForm)} />
                                        <label htmlFor="rating-3" />

                                        <input type="radio" defaultValue={2} name="rating" id="rating-2" checked={form.rating == 2} onChange={ev => setInForm(ev, form, setForm)} />
                                        <label htmlFor="rating-2" />

                                        <input type="radio" defaultValue={1} name="rating" id="rating-1" checked={form.rating == 1} onChange={ev => setInForm(ev, form, setForm)} />
                                        <label htmlFor="rating-1" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-danger" type="submit">Add Review</button>
                                </div>
                            </form>
                        </div> : <div className="card m-2 p-2  align-items-center ms-5 border-4 border-danger">
                                    <h5 className="p-3 text-muted">Please <span><Link to="/login" className="text-black fs-4">login</Link></span> to add your review.</h5>
                            </div>}
                    </div>
                </div>
            </div>
        </div>


        <div className="container border border-1 border-dark mt-5"></div>
        <div className="container mt-5">
            <div className="row">
                 <div className="col-lg-7">
                <div className="border-2  mt-5" />
                    <h3 className="mt-5 text-center banner-text text-danger">Latest Traveller's Reviews</h3>
                    <p className="text-center fst-italic mt-4 fw-bold">"Travel experiences of our clients who recently returned from their trips."</p>
                    <div className="card p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end">
                        <div className="container">
                        {place.reviews && place.reviews.length ? place.reviews.map(review =><div className="row mt-2" key={review._id}>
                                <div className="col-lg-3">
                                    <div className="stars d-flex">
                                        {[1,2,3,4,5].map(v => <i className={`${v <= review.rating ? 'fas' : 'far'} fa-star`} key={v}></i>)}
                                    </div>
                                    <p className="fw-bold fs-6 m-0">{review.user.name}</p>
                                    <p className="text-muted">{moment(review.createdAt).fromNow()}</p>
                                </div>
                                <div className="col-lg-9 ">
                                    <p className="mt-3">{review.comment}</p>
                                </div>
                            </div>) : <div className="row">
                                    <h3 className="text-center">No reviews for this Package</h3>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="col-lg-1"></div>

                <div className="col-lg-4 mt-5 pt-5 ">
                    <div className="row sticky-top">
                    <div className="card p-0 rounded-3 border-3 border-danger  mt-4  shadow ">
                        <h4 className="bg-danger text-center  p-2 ">Average Customer Ratings</h4>
                        <h1 className="text-center m-0">{rating.toFixed(1)}</h1>
                        <p className="text-center m-0 text-muted">of {place.reviews && place.reviews.length} reviews</p>
                        <h5 className="text-center fw-semibold">How The Travellers Have Rated This Package</h5>
                        <div className="card m-2  border-0">
                        <div className="d-flex">
                            <div className="progress mb-1 w-100 me-2" role="progressbar" aria-label="Success example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-danger" style={{width: `${stars['5']}%`}}>{stars['5'].toFixed(1)}%</div> 
                            </div>
                            <div className="fas fa-star me-2">5</div>
                        </div>
                        <div className="d-flex">
                            <div className="progress mb-1 w-100 me-2" role="progressbar" aria-label="Success example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-danger" style={{width: `${stars['4']}%`}}>{stars['4'].toFixed(1)}%</div> 
                            </div>
                            <div className="fas fa-star me-2">4</div>
                        </div>
                        <div className="d-flex">
                            <div className="progress mb-1 w-100 me-2" role="progressbar" aria-label="Success example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-danger" style={{width: `${stars['3']}%`}}>{stars['3'].toFixed(1)}%</div> 
                            </div>
                            <div className="fas fa-star me-2">3</div>
                        </div>
                        <div className="d-flex">
                            <div className="progress mb-1 w-100 me-2" role="progressbar" aria-label="Success example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-danger" style={{width: `${stars['2']}%`}}>{stars['2'].toFixed(1)}%</div> 
                            </div>
                            <div className="fas fa-star me-2">2</div>
                        </div>
                        <div className="d-flex">
                            <div className="progress mb-1 w-100 me-2" role="progressbar" aria-label="Success example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar bg-danger" style={{width: `${stars['1']}%`}}>{stars['1'].toFixed(1)}%</div> 
                            </div>
                            <div className="fas fa-star me-2">1</div>
                        </div>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
}