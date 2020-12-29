import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins to react-filepond
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadPopup = (props) => {

        return(
            <div className="container">
                    <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 ml-auto mr-auto">
                        <FilePond
                            files={props.files}
                            allowReorder={true}
                            allowMultiple={true}
                            onupdatefiles={props.setFiles}
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                            maxFiles={6}
                            imagePreviewMaxHeight="150"
                        />
                    </div>

                <div className="col col-xl-6 col-lg-6 col-md-6 ml-auto mr-auto">
                    <button className="btn btn-danger mt-2 mb-5 mr-3" onClick={() => props.setShow(false)}>Cancle</button>
                    <button className="btn btn-info mt-2 mb-5" onClick={() => props.send()}>Upload</button>
                </div>
            </div>
        )
}

export default UploadPopup;