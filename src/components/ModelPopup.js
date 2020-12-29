const ModelPopup = (props) => {

  const change = (e) => {

        props.setData({
            ...props.data,
            [e.target.name]: e.target.value
        })
    }

        return(
            <div>
                    <p className="popup-heading">Create Model</p>

                    <hr />

                    <small>Model Name</small>
                    <input type="text" className="form-control" name="modelName"  onChange={(e) => change(e)} required={true} />
                    <small>Country</small>
                    <input type="text" className="form-control" name="country" onChange={(e) => change(e)} required={true} />
                    <small>DOC Name</small>
                    <input type="text" className="form-control" name="docName" onChange={(e) => change(e)} required={true} />

                    <button className="btn btn-danger mt-5 mb-5" onClick={() => props.setShow(false)}>Cancle</button>
                    <button className="btn btn-primary mt-5 mb-5 ml-3" onClick={() => props.send()} >Create</button>
            </div>
        )
}

export default ModelPopup;