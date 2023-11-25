import { useSelector } from "react-redux"

export const BookBtn = ({place, callback =() => {}}) => {
    const book = useSelector(state => state.book.value)
    const bookNow = () => {
        let book = JSON.parse(fromStorage('130book') || '{}')

        if(place._id in book) {
            console.log('yes')
        } else {
            console.log('no')
        }
    }
    return <button className="btn btn-danger align-items-center mt-2" onClick={bookNow}>Book Now</button>
}