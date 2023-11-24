import { Link } from "react-router-dom"
import { imgUrl } from "../lib"

export const PackageCard = ({ place, most = false }) => {
    return <div className=" mt-5 ">
        <div className="card d-card position-relative">
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
                    <a href="#" className="btn btn-outline-success  ">Book now</a>
                    <Link to={`place/${place._id}`} className="btn btn-outline-primary ">Learn more</Link>
                </div>
            </div>
        </div>
    </div>
}