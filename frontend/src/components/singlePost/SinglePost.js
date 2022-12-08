import "./SinglePost.css"

const SinglePost = () => {
    return (
        <div className="singlePost" >

            <div className="singlePosetWrapper" >
                <img src="https://jooinn.com/images/beauty-of-nature-24.jpg"
                    className="singlepageimage"
                />
                <h1 className="singlePostTitle">Lorem ipsum dolor sit amet.
                    <div className="SinglePagecon">
                        <i className="fa-regular fa-pen-to-square editIcon"></i>
                        <i className="fa-solid fa-trash deleteIcon  "></i>
                    </div>
                </h1>
                <div className="postInformation">
                    <span className="postAuthor" >   Author: <b>Amarjeet Kumar</b> </span>
                    <span className="singlePostDate" >   1 Hour Ago </span>
                </div>
                <div className="singlepostdis" >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </div>


            </div>

        </div>
    )
}

export default SinglePost