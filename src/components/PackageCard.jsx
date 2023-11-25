import { Link } from "react-router-dom"
import { imgUrl } from "../lib"
import { BookBtn } from "./BookBtn"

export const PackageCard = ({ place, most = false }) => {
    return <div className=" mt-5 ">
            {most ?  <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <article className="postcard dark blue">
    <a className="postcard__img_link" >
        <img className="postcard__img h-100" src={imgUrl(place.images[0])} alt="Image Title" />
    </a>
    <div className="postcard__text">
        <h1 className="postcard__title blue">{place.name}</h1>
        <div className="postcard__subtitle small">
        </div>
        <div className="postcard__bar" />
        <div className="postcard__preview-txt ">The Annapurna Circuit Trek first opened to trekkers in 1980, and today is considered one of the best trekking destinations in the world, passing through Rhododendron forests in the lower regions of the Annapurna and Dhaulagiri mountains.</div>
        <Link to={`place/${place._id}`}><button className="btn btn-outline-primary mt-4">Learn More</button></Link>
    </div>
    </article>
                    </div>
                </div>
            </div>  : <div className="card d-card position-relative">
            <img src={imgUrl(place.images[0])} className="card-img-top position-absolute " alt="..." />
            <button className="btn btn-dark price mb-5">
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
            </button>
            <div className="card-body mt-5 pt-5">
                <h5 className="card-title mt-5">{place.name}</h5>
                <p className="card-text">The Annapurna Circuit Trek first opened to trekkers in 1980, and today is considered one of the best trekking destinations in the world, passing through Rhododendron forests in the lower regions of the Annapurna and Dhaulagiri mountains.</p>
                <div className="button d-flex justify-content-between">
                    <BookBtn place={place}/>
                    <Link to={`place/${place._id}`} className="btn btn-outline-primary">Learn More</Link>
                </div>
            </div>
        </div>}
    </div>
}