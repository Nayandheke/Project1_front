import { Loading } from "./Loading"
import { PackageCard } from "./PackageCard"

export const PackageList = ({title, places = [], most=false, loading=false}) => {
    return <div className="container">
        <h1 className="text-center banner-text text-danger">{title}</h1>
        {most ? <div className="row ">
            {places.map(place => <PackageCard place={place} most={most} key={place._id}/>)}
        </div> : <div className="row row-cols-lg-3 row-cols-sm-1 justify-content-center">
            {places.map(place => <PackageCard place={place}  key={place._id}/>)}
        </div>}
    </div>
}