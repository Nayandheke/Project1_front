import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const BookBtn = ({place, callback =() => {}}) => {
    const book = useSelector(state => state.book.value)
    const bookNow = () => {
        let temp = {...book}

        if(place._id in temp) {
            console.log('yes')
        } else {
            console.log('no')
        }
    }
    return <Link to="/book"><button className="btn btn-danger align-items-center mt-2" onClick={bookNow}>Book Now</button></Link>
}