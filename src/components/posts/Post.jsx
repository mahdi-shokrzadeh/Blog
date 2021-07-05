import React , { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '../../actions/post';
import { Link } from 'react-router-dom';


const Post = ({match}) => {
    
    const post = useSelector(state => state.post) ;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSinglePost(match.params.id));
    } , [])
    
    return ( 
        <div className="row mt-4">

            <div className="col-12 col-lg-3 side-bar order-2">
                <div className="container">

                    <Link to="/" id="user-panel-link" style={{ textDecoration: "none" }}>
                    
                        <div className="row p-2 mb-2 rounded user-panel-item border mt-3">
                            <div className="col-3">
                            <img
                                src="https://secure.gravatar.com/avatar/d54efb622ee21b88bf34bb09217bba4e.jpg?s=40&d=retro&r=g"
                                className="img img-fluid rounded-pill"
                            />
                            </div>

                            <div className="col-9 text-right">
                            <p
                                className="bold text-dark m-0"
                                
                            >
                                Mahdi Shokrzadeh
                            </p>
                            <span className="text-muted">@shokrzadeh</span>
                            </div>
                            <div className="ml-3 mt-2">
                                <div className="text-dark m-0">
                                <p>
                                    decriptoin
                                </p>
                                </div>
                                
                                <div className="m-0 text-dark">
                                    <span className="mr-2" style={{fontSize:"14px" , color:"gray"}}>Registration date :</span>
                                    <span className="text-muted"><i>11 sep 2020</i></span>
                                </div>
                            </div>
                        

                        </div>
                    
                    </Link>
                </div>
            </div>


            <div className="col-12 col-lg-9">
                <div className="row">

                    <div className="col-1 d-flex flex-column">
                        <div className="d-none d-md-block">
                            <div className="like-icon">
                                <i className="fa fa-heart fa-2x" style={{color:"red"}}></i>
                            </div>
                            <div className="ml-2">
                                <span>2</span>
                            </div>
                            <div className="comments-icon mt-3">
                                <i className="fa fa-comments fa-2x" ></i>
                            </div>
                            <div className="ml-2">
                                <span>3</span>
                            </div>
                            <div className="mt-3">
                                <i className="fa fa-plus fa-2x" style={{color:"limegreen"}} ></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-11">
                        <div className="container single-post border rounded p-4">
                            <div className="header text-left">
                                <h5 className="mb-3">Title</h5>
                                <img src="https://static.roocket.ir/images/cover/2021/5/12/Rh6cme965gjFQepbK8jom0JmGoBJQFhyUiFi5ME8.jpg"
                                 alt="" 
                                 className="img img-fluid rounded  "
                                />

                                <div className="tags d-flex flex-row mt-3">
                                    <Link to="/" className="popular-tag-link mr-3" >
                                        <span className="badge badge-secondary p-1" style={{fontWeight:300 , fontSize:"13px"}}>#laravel</span>
                                    </Link>

                                    <Link to="/" className="popular-tag-link mr-3" >
                                        <span className="badge badge-secondary p-1" style={{fontWeight:300 , fontSize:"13px"}}>#Adonis Js</span>
                                    </Link>

                                    <Link to="/" className="popular-tag-link mr-3" >
                                        <span className="badge badge-secondary p-1" style={{fontWeight:300 , fontSize:"13px"}}>#Python</span>
                                    </Link>

                                </div>
                            </div>

                            <hr />
                            <div className="inf mt-2">
                                <span className="text-muted"> Posted on 11 Sep</span>
                                <span className="badge badge-info ml-5">read in 5 min</span>
                            </div>

                            <div className="content mt-4">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Maiores saepe, vero sed et est, quod at quam voluptatem error quas dolore modi? Commodi ratione eum repellendus
                                , id sit ex consequuntur.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Maiores saepe, vero sed et est, quod at quam voluptatem error quas dolore modi? Commodi ratione eum repellendus
                                , id sit ex consequuntur.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Maiores saepe, vero sed et est, quod at quam voluptatem error quas dolore modi? Commodi ratione eum repellendus
                                , id sit ex consequuntur.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Maiores saepe, vero sed et est, quod at quam voluptatem error quas dolore modi? Commodi ratione eum repellendus
                                , id sit ex consequuntur.
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Maiores saepe, vero sed et est, quod at quam voluptatem error quas dolore modi? Commodi ratione eum repellendus
                                , id sit ex consequuntur.
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Maiores saepe, vero sed et est, quod at quam voluptatem error quas dolore modi? Commodi ratione eum repellendus
                                , id sit ex consequuntur.
                            </div>
                            <hr className="d-md-none" />
                            <div className="d-md-none">

                                <div className="row">
                                    <div className="col-4 text-center like-icon">
                                        <i className="fa fa-heart mr-3" style={{color:"red"}}></i>
                                        <span>2</span>
                                        
                                    </div>
                                    
                                    <div className="col-4 text-center comments-icon">
                                        <i className="fa fa-comments mr-3" ></i>
                                        <span>3</span>
                                        
                                    </div>
                                    <div className="col-4 text-center">
                                        <i className="fa fa-plus" style={{color:"limegreen"}} ></i>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                        </div>


                        <div className="comments mt-5">
                            <h5>Comments</h5>
                            <div className=" border rounded p-4">
                                <div className="comment">

                                    <div className="">
                                    <img 
                                        src="https://secure.gravatar.com/avatar/d54efb622ee21b88bf34bb09217bba4e.jpg?s=50&d=retro&r=g"
                                        className="img img-fluid rounded-pill mr-3"
                                    />
                                        <h6 className="d-inline">Mahdi shokrzadeh</h6>
                                        <button className="btn text-center ml-4">
                                            <i className="fa fa-arrow-right" style={{color:"green"}}></i>
                                        </button>
                                    </div>

                                    <div className="mt-3">
                                        {/* 1 */}
                                        <div className="comment-content">
                                            <p 
                                            style={{fontSize:"14px"}}
                                            className="justfy"
                                            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate quaerat non cumque minima magni, quidem alias. Fugiat ab numquam illum beatae quasi dolorem saepe! Odit illo blanditiis tenetur voluptas natus.</p>
                                        </div>


                                        {/* 2  replied*/}

                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
            
        
        </div>
    );
}

export default Post;