import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Reviews } from './Review';
import { EditProfile } from './EditProfile';
import { Password } from './Password';

export const Profile = () => {
    return <div className="col-12">
        {/* Main Content */}
        <div className="row">
            <div className="col-12 mt-3 text-center text-uppercase">
                <h2 className="banner-text text-danger">User Dashboard</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-10 mx-auto bg-white py-3 mb-4">
                <div className="row">
                    <div className="col-12">
                        <Tabs
                            defaultActiveKey="profile"
                            id="fill-tab-example"
                            className="mb-3"
                            fill>

                            <Tab eventKey="reviews" title="Reviews">
                                <Reviews/>
                            </Tab>
                            <Tab eventKey="profile" title="Profile">
                                <EditProfile/>
                            </Tab>
                            <Tab eventKey="password" title="Password">
                                <Password/>
                            </Tab>
                            
                        </Tabs>
                    </div>
                </div>
            </div >
        </div>
    </div>
}