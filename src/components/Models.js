import {useState} from 'react';
import ModelPopup from "./ModelPopup";

function Models(props){
    
    const [show, setShow] = useState(false);

    const [data, setData] = useState({
        modelName: '',
        country: '',
        docName: ''
    })

    const send = () => {

        if(!data.modelName || !data.country || !data.docName){
            return alert("All Fields are required!")
        }

        return (
            props.history.push({
                pathname: '/configure',
                data: data 
            })
        )
    }

    return(
        <div className="container-fluid">
            <div className="row heading">
                    <small>Models</small>
            </div>

            <div className="row">
                    <div className="btn">
                        <i onClick={() => setShow(true)} className="plus-btn fas fa-plus-circle plus"></i>
                    </div>
                    <div className="col col-xl-4 ml-auto mr-auto mt-5 mb-5 popup">
                        {show ? <ModelPopup data={data} setData={setData} setShow={setShow} send={send} /> : null}
                    </div>
            </div>
        </div>
    )
}
export default Models;