import { useState } from "react"
import http from "../http"
import { useNavigate } from "react-router-dom"
import { SubmitBtn } from "../components"
import { Form } from "react-bootstrap"
import { setInForm } from "../lib"
import { FormItem } from "../components"

export const Book = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleCheckout = ev => {
        ev.preventDefault()

        setLoading(true)

        http.post('booknow', form)
            .then(() => navigate('/'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <>
        <div className="col-12">
        {/* Main Content */}
        <div className="row">
            <div className="col-12 mt-3 text-center text-uppercase">
                <h2>Register</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
                <div className="row">
                    <div className="col-12">
                        <Form onSubmit={handleCheckout}>
                            <FormItem title="Name" label="Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>

                            <FormItem title="Email" label="Email">
                                <Form.Control type="email" name="email" id="email" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>

                            <FormItem title="Country" label="Country">
                                <Form.Control type="text" name="country" id="country" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>

                            <FormItem title="Phone" label="Phone">
                                <Form.Control type="text" name="phone" id="phone" onChange={ev => setInForm(ev, form, setForm)} />
                            </FormItem>



                    <div className="form-group">
                        <SubmitBtn loading={loading} icon="fa-user-plus" label="Book Now" />
                    </div>
                </Form>
            </div>
        </div>
        </div >
        </div>
        </div>

    </>
}