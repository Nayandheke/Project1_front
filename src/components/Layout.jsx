import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./Layout.css"
import "./Layouts.css"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { FrontNav } from "./FrontNav"
import { Login } from "../pages"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import { useEffect } from "react"
import { clearStorage, fromStorage } from "../lib"
import { clearUser, setUser } from "../store"
import http from "../http"

export const Layout = () => {
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
      if (Object.keys(user).length == 0) {
          const token = fromStorage('130fronttoken')

          if (token) {
              http.get('profile/details')
                  .then(({ data }) => dispatch(setUser(data)))
                  .catch(err => { })
          }
      }
  }, [user])

  const handleSubmit = ev => {
    ev.preventDefault()
    navigate(`/search?term=${term}`)
  }

  const handleLogout = () => {
    clearStorage('130fronttoken')
    dispatch(clearUser())
  }

  return <>
    <div>
      {/* Top nav */}
      <div className="container-fluid m-0 ">
        <div className="row">
          <div className="col-12 bg-black py-2 d-md-block d-none">
            <div className="row">
              <div className="col-auto me-auto">
                <div className="top-nav d-flex">
                  <a href="tel:+123-456-7890" className="text-light"><i className="fa fa-phone-square me-2" />+123-456-7890</a>
                  <a href="mailto:mail@ecom.com" className="text-light border-start ms-3"><i className="fa fa-envelope me-2 ms-3" />mail@ecom.com</a>
                </div>
              </div>
              <div className="col-auto">
                <ul className="top-nav d-flex">
                  {Object.keys(user).length ? (
                    <>
                      <li>
                        <Link to="/profile">
                          <i className="fas fa-user-edit me-2 mt-2"></i>
                          {user.name}
                        </Link>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          type="button"
                          className="p-0 link-light text-decoration-none"
                          onClick={handleLogout}
                        >
                          <small>
                            <i className="fas fa-sign-out-alt me-2"></i>Logout
                          </small>
                        </Button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/register">
                          <i className="fas fa-user-edit me-2"></i>Register
                        </Link>
                      </li>
                      <li>
                        <Link to="/login">
                          <i className="fas fa-sign-in-alt me-2"></i>Login
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FrontNav />
      
      {/* Top nav */}

      <Outlet />

      {/* Event */}
      <div className="container-fluid bg-gray ">
        <div className="row mt-3">
          <div className="col-lg-12">
            <h2 className="text-center fw-bolder mt-5">Subscribe and Win a Free Everest Trek!</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-3" />
          <div className="col-lg-6 mb-4">
            <form className="d-flex" role="search">
              <input className="form-control me-2 rounded-pill" type="search" placeholder="Enter Your Email" aria-label="Search" />
              <button className="btn btn-outline-danger rounded-pill" type="submit">Submit</button>
            </form>
          </div>
          <div className="col-lg-3" />
        </div>
      </div>
      {/* Event */}


      {/* Footer */}
      <div className="container-fluid bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mt-5 pt-4">
              <h4 className="text-light">Follow Us on:</h4>
              <div className="social mt-4">
                <span className="border border-light  rounded-circle pt-2 pb-1 me-3">
                  <h4 className="fa-brands fa-facebook  ms-1 me-1" />
                </span>
                <span className="border border-light  rounded-circle pt-2 pb-1 me-3">
                  <h4 className="fa-brands fa-twitter  ms-1 me-1" />
                </span>
                <span className="border border-light  rounded-circle pt-2 pb-1 me-3 p-1">
                  <h4 className="fa-brands fa-instagram  ms-1 me-1" />
                </span>
                <span className="border border-light  rounded-circle pt-2 pb-1 me-3">
                  <h4 className="fa-brands fa-youtube  ms-1 me-1" />
                </span>
                <span className="border border-light  rounded-circle pt-2 pb-1 me-3">
                  <h4 className="fa-brands fa-pinterest  ms-1 me-1" />
                </span>
                <span className="border border-light  rounded-circle pt-2 pb-1 pe-2 ps-1 ">
                  <h4 className="fa-brands fa-linkedin  ms-1" />
                </span>
              </div>
            </div>
            <div className="col-lg-6 mt-5">
              <img className="mt-4 align-items-center" src="/payment-accept.png" alt />
            </div>
          </div>
          <div className="border-top border-light mt-5 d-flex">
            <div className=" mt-5 text-light me-5">
              <h3 className="mb-4">Pages</h3>
              <p>HOME</p>
              <p>OUR TEAM</p>
              <p>MAKE A PAYMENT</p>
              <p>B2B PARTNER</p>
              <p>OUR PARTNERS</p>
              <p>CONTACT</p>
            </div>
            <div className=" mt-5 text-light ms-5 pe-1">
              <h3 className="mb-4">USEFUL LINKS</h3>
              <p>ABOUT US</p>
              <p>TERMS AND CONDITION</p>
              <p>PAYMENTS PROCEDURE</p>
              <p>Why Navigate?</p>
            </div>
            <div className=" mt-5 text-light ms-5 ">
              <h3 className="mb-4">ACTIVITIES</h3>
              <p>8000M EXPEDITION</p>
              <p>7000M EXPEDITION</p>
              <p>6000M PEAK CLIMBING</p>
              <p>POPULAR PEAK CLIMBING</p>
              <p>HIKING AND EXCURSION</p>
            </div>
            <div className=" mt-5 text-light ms-5">
              <h3 className="mb-4">EXPEDITIONS</h3>
              <p>EVEREST EXPEDITION (SOUTH)</p>
              <p>EVEREST EXPEDITION ( NORTH)</p>
              <p>EVEREST BASE CAMP TREK</p>
              <p>GOKYO VALLEY TREK</p>
            </div>
            <span>
              <div className="cards bg-dark mt-5 ms-5">
                <button className="btn btn-danger ms-5 f-botton rounded-5">CALL US FOR MORE DETAILS<br />
                  +977-9866007038</button>
              </div>
              <div className="cards bg-dark mt-3 ms-5">
                <button className="btn btn-danger ms-5 f-botton1 rounded-5">Help Me Plan My Trip</button>
              </div>
              <div className="cards bg-dark mt-3 ms-5">
                <button className="btn btn-danger ms-5 f-botton1 rounded-5">Contact Us</button>
              </div>
            </span>
          </div>
          <div className="container border-top border-light mt-4">
            <div className="row">
              <div className="col-lg-3">
                <img className="f-logo" src="/Gray_Explore_Mountain_Logo-removebg.png" alt />
              </div>
              <div className="col-lg-9">
                <p className="text-light mt-5 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam reprehenderit omnis maxime? Sunt sapiente dolorum minima ratione ab error inventore voluptatum commodi quo, pariatur ullam deserunt id. Cum temporibus accusantium officiis ducimus ipsam ipsa sed itaque minus excepturi soluta reprehenderit ad, nobis animi fuga deleniti nesciunt dolor totam voluptatem sapiente explicabo assumenda cupiditate. Tenetur esse, itaque eligendi et ducimus animi accusantium, dignissimos, mollitia obcaecati porro natus odio aliquam dolores minima ex! Porro voluptates impedit esse necessitatibus nulla provident mollitia magni cumque ipsam, aliquid omnis veritatis tempore. Quaerat, commodi obcaecati esse ratione odio nihil, totam dolor amet modi aut, accusantium omnis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
    </div>

  </>
}