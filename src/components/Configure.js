import { useState } from "react";
import { Link } from "react-router-dom";
import UploadPopup from "./UploadPopup";

function Configure(props) {

    const [show, setShow] = useState(false);

    const [files, setFiles] = useState([]);

    const {country, docName} = props.history.location.data;

    const send = () => {
        return (
            props.history.push({
                pathname: '/save',
                data: {files, modelInfo:{country, docName}}
            })
        )
    }

    return (
        <div className="">
            <div className="container-fluid heading mb-3">
                    <Link to="/" className="fas fa-arrow-left arrow mr-3"></Link>
                    <span> {country} / {docName} </span>
            </div>

        {!show ? 
            <div className="configure-main mt-5">
                    <h3>Upload ID documents to create model</h3>
                    <button onClick={() => setShow(true)} className="btn btn-primary mt-3 mb-5">Upload Documents</button>
            </div>
        : null }

            {show ? <UploadPopup files={files} setFiles={setFiles} setShow={setShow} send={send} /> : null}
        </div>
    )
}
export default Configure;