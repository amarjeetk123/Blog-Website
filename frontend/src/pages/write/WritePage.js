import "./WritePage.css"

const WritePage = () => {
    return (
        <div className="write" >
            <img  className="writeImage"
            src="https://th.bing.com/th/id/R.76ec744f8d3443801313dae09bea7f89?rik=olWRWzNmaS%2fFfQ&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2014%2f01%2fhighway-wallpapers.jpg&ehk=nuL50mggYS7XcuDVS8KOCzq6D45e6isNyAdQ3r965YY%3d&risl=&pid=ImgRaw&r=0"

             />
            <form className="writeform" >
                <div className="abcd" >
                    <label htmlFor="fileInput" >
                        <i className="fas fa-plus writeIcon"> </i>
                    </label>
                    <input type="file" id="fileInput" className="fileinputwe" />
                    <input type={"text"} placeholder="Title" className="writeTitle" autoFocus={true} />
                </div>
                <div className="writefromGroup">
                    <textarea placeholder="Write About Your Story....." className="writeTectArea writeTitle" ></textarea>

                </div>
                <button  className="writebtn">
                    Publish
                </button>
            </form>

        </div>
    )
}

export default WritePage