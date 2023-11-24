import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../http"
import { Loading, PackageCard } from "../components"
import { Pagination } from "react-bootstrap"

export const Choice = () => {
    const [choice, setChoice] = useState({})
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(false)
    const [paginated, setPaginated] = useState([])
    const [current, setCurrent] = useState(1)
    const [pages, setPages] = useState(1)
    const limit = 9
    const [offset, setOffset] = useState(0)
    const [pagelinks, setPagelinks] = useState([])

    const params = useParams()

    useEffect(() => {
        setLoading(true)

        http.get(`choices/${params.id}`)
            .then(({ data }) => {
                setChoice(data)

                return http.get(`choices/${params.id}/places`)
            })
            .then(({ data }) => setPlaces(data))
            .catch(err => { })
            .finally(() => setLoading(false))
    }, [params.id])

    useEffect(() => {
        setCurrent(1)

        let temp = [...places].splice(offset, limit)
        let total = (Math.ceil(places.length / limit))

        setPaginated(temp)
        setPages(total)
    }, [places])

    useEffect(() => {
        let temp = (current - 1) * limit
        setOffset(temp)
    }, [current])

    useEffect(() => {
        let temp = [...places].splice(offset, limit)

        setPaginated(temp)
    }, [offset,places])

    useEffect(() => {
        let list = [<Pagination.Prev onClick={() => setCurrent(current - 1)} disabled={current == 1}/>]
        for(let i = 1; i <= pages; i++){
            list.push(<Pagination.Item key={i} onClick={() => setCurrent(i)} active={i == current}>{i}</Pagination.Item>)
        }

        list.push(<Pagination.Prev onClick={() => setCurrent(current + 1)} disabled={current == pages}/>)

        setPagelinks(list)
    }, [pages, current])

    return loading ? <Loading /> : <>
        <div className="container">
            <div className="row row-cols-lg-3 row-cols-sm-1 justify-content-center mb-5">
                {paginated.map(place => <PackageCard place={place} key={place._id}/>)}
            </div>

            <div className="col-12">
                {pages > 1 ? <Pagination >
                    {pagelinks.map(link => link)}
                </Pagination>:null}
            </div>
        </div>
    </>
}