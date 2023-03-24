import axios from 'axios';
import React, { Component } from 'react';
import '../../css/search.css'
import { withRouter } from "react-router";
import Error from '../../index/error';
import NavBar from '../../Profile/freelancer/navbar';
import { NavLink } from 'react-router-dom';
import './windows'

class Search extends Component {
   
    constructor() {
        super()
        this.state = {
            data:[],
            dataa:'',
            data_filter:[]
        }


    }
  
    
      handleButtonClick = () => {
        this.setState({data:this.state.data_filter})
        var min='asd'
      var cost=document.getElementsByName('cost')
      var costCheck=[]
       cost.forEach(element => {
        if(element.checked){
            costCheck.push(element)
        }
       });
       min=costCheck[0].value.split('-')[0]
      
      var max=costCheck[costCheck.length-1].value.split('-')[1]
      if (max == 'more')
      max='10000000000000'

      if (max!='type') {
       var arr=[]
       this.state.data_filter.forEach(element => {
        if(Number(element.cost) >= Number(min) && Number(element.cost) <= Number(max)){
            arr.push(element)
        }
       });
       this.setState({data:arr})
      }else{
        var minnnnn=document.getElementById('from').value
        var maaax=document.getElementById('to').value
        if (!isNaN(minnnnn) && !isNaN(maaax)) {
            var arr=[]
            this.state.data_filter.forEach(element => {
             if(Number(element.cost) >= Number(minnnnn) && Number(element.cost) <= Number(maaax)){
                 arr.push(element)
             }
            });
            this.setState({data:arr})
        }else if(!isNaN(maaax)  && !isNaN(min)){

            var arr=[]
            this.state.data_filter.forEach(element => {
             if(Number(element.cost) >= Number(min) && Number(element.cost) <= Number(maaax)){
                 arr.push(element)
             }
            });
            this.setState({data:arr})
        }
      }
      };
    componentDidMount(){
        const studentId = window.location.href.split('/')[4]
        document.getElementById('search_id').value=studentId
        axios.post('http://127.0.0.1:8000/home/job_search/',{
            word:studentId
        }).then(response=>{
            console.log(response.data);
            this.setState({data:response.data})
        })
        axios.post('http://127.0.0.1:8000/profile/get_details_free/',{
          id:localStorage.getItem("uid")  
        }).then(res=>{
            console.log(res.data);
            this.setState({dataa:res.data})
            this.setState({data_filter:res.data})
        })
    }

    settingS=() =>{
        this.setState({isMenu:true})
        const DoM = document.getElementById("setting")
        DoM.style.display = 'block'
    }
    XsettingS=()=> {
        this.setState({isMenu:false})
        const DoM = document.getElementById("setting")
        DoM.style.display = 'none'
    }
    render() {
        if(localStorage.getItem('uid')){
            var type= localStorage.getItem("type");
        if(type=='user')
        {
           return (<Error/>)
        }else{
        return (
            <div>
                <NavBar url='http://127.0.0.1:8000/profile/get_details_free/'
        openMenu={this.state.isMenu?(this.XsettingS):(this.settingS)}/>
         <div className='row'>
                        <div className=' col-sm-3 buttonSetting text-center' id='setting' >
                            <img className='littleSymbolImage' src={"data:image/*;base64,"+this.state.dataa.image} />
                            <h4 className='mt-3'>{this.state.dataa.name}</h4>
                            <hr />
                            <NavLink to={'/Freelancersettings'}><h5>Settings</h5></NavLink>
                            <NavLink onClick={
                                () => {
                                    localStorage.clear()
                                    window.location = "/"
                                }
                            }><h5 className='pb-4'>Logout</h5></NavLink>
                        </div></div>
         <div class="container my-4" onClick={
                (e)=>{
                  
                   
                    this.XsettingS()
                   
                }
            }></div>
                 <div class="container my-4">
        <div class="row">

            <div class=" col-md-3 px-2">
                <div class="container-border my-2">
                    <h3>Filter By</h3>
                    <hr />
                   
                        <div class="filter-wrapper">
                            <div class="filter-heading">Filter Jobs By Type</div>
                            <div class="filter-options">
                           <form >
                           <div class="form-group">
                                    <label>Choose your favorite cost:</label>
                                <div class="form-check">
                                    <label class="form-check-label" for="fixed-price">
                                        Fixed Price
                                    </label>
                                    <div class="pl-2">
                                        <div class="form-check small">
                                            <input class="form-check-input" name='cost' type="checkbox" value="0-100" id="first" onChange={this.handleButtonClick}/>
                                            <label class="form-check-label small" for="first">less than 100$ </label>
                                        </div>
                                        <div class="form-check small">
                                            <input class="form-check-input" name='cost' type="checkbox" value="100-500" id="first" onChange={this.handleButtonClick}/>
                                            <label class="form-check-label small" for="first"> 100$ to 500$ </label>
                                        </div>
                                        <div class="form-check small">
                                            <input class="form-check-input" name='cost' type="checkbox" value="500-1000" id="first" onChange={this.handleButtonClick}/>
                                            <label class="form-check-label small" for="first">500$ to 1k$ </label>
                                        </div>
                                        <div class="form-check small">
                                            <input class="form-check-input" name='cost' type="checkbox" value="1000-5000" id="first" onChange={this.handleButtonClick}/>
                                            <label class="form-check-label small" for="first">1k$ to 5k$ </label>
                                        </div>
                                        <div class="form-check small">
                                            <input class="form-check-input" name='cost' type="checkbox" value="5000-more" id="first" onChange={this.handleButtonClick}/>
                                            <label class="form-check-label small" for="first">+5k$ </label>
                                        </div>
                                        <div class="form-check small d-flex">
                                            <input class="form-check-input p-2" name='cost' type="checkbox" value="0-type" id="first" onChange={this.handleButtonClick}/>
                                            <div class="d-flex p-1">
                                                <input type="text" class="form-control form-control-sm"
                                                    aria-describedby="helpId" placeholder="from" id='from'/>
                                                <input type="text" class="form-control form-control-sm" id='to'
                                                    aria-describedby="helpId" placeholder="to" onChange={this.handleButtonClick}/>
                                            </div>


                                        </div>




                                    </div>

                                </div>
                               </div>
                           </form>
                            </div>
                        </div>





                    






                </div>





            </div>

            <div class=" col-md-9  px-2 ">

                <div class="row my-3">
                    <form class="form-inline" onSubmit={
                        (e)=>{
                            e.preventDefault()
                            var value=document.getElementById('search_id').value
                            if (value)
                            {
                                axios.post('http://127.0.0.1:8000/home/job_search/',{
            word:value
        }).then(response=>{
            console.log(response.data);
            this.setState({data:response.data})
            this.setState({data_filter:response.data})
        })
                            }
                        }
                    }>
                        <div class="input-group">
                            <input type="text" class="form-control" id='search_id' placeholder="Search for jobs..."/>
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-success"><i
                                        class="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                    </form>

                </div>
                <div class="container-border my-2 ">
                    <div>
                        <div class="d-flex justify-content-between">
                            <h5> {this.state.data.length} jobs found</h5>
                            <div>

                                <a href="#" class="text-center text-success" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">Advanced Search</a>

                            </div>

                        </div>

                        <hr/>
                        {this.state.data?(this.state.data.map(element=>
                        {

                            var a = new Date(element.create_at)
                            var b = new Date()
                            function padTo2Digits(num) {
                                return num.toString().padStart(2, '0');
                              }
                              
                              function convertMsToTime(milliseconds) {
                                let seconds = Math.floor(milliseconds / 1000);
                                let minutes = Math.floor(seconds / 60);
                                let hours = Math.floor(minutes / 60);
                              
                                seconds = seconds % 60;
                                minutes = minutes % 60;
                              
                                // 👇️ If you don't want to roll hours over, e.g. 24 to 00
                                // 👇️ comment (or remove) the line below
                                // commenting next line gets you `24:00:00` instead of `00:00:00`
                                // or `36:15:31` instead of `12:15:31`, etc.
                                hours = hours % 24;
                              
                                return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
                                  seconds,
                                )}`;
                              }

                              var islike=false
                              var isDislike=false
                              element.likeId=0

                              
                              element.likes.forEach(ele => {
                                if(ele.id_free==localStorage.getItem("uid"))
                                {

                                    islike=true
                                    element.likeId=ele.id
                                    return;
                                }
                             });

                             element.dislikes.forEach(ele => {
                                if(ele.id_free==localStorage.getItem("uid"))
                                {

                                    isDislike=true
                                    element.likeId=ele.id
                                    return;
                                }
                             });
                                
                            
                            return(
                            <div>

                                <div class="container" >
                            <div class="row my-3">
                                <div class="col-md-6">
                                    <a href="#" class="text-center text-success">{element.title}</a>
                                </div>
                                <div class="col-md-6 text-end">



                                    <a name=""  class="btn btn-primary rounded-pill btn-sm" onClick={
                                        ()=> {
                                            
                                            if(document.getElementById("dislike"+element.id).style.color=='red'){
                                                axios.post('http://127.0.0.1:8000/home/removeDislike_job/',{
                                                id:localStorage.getItem('uid'),
                                                job_id:element.id,
                                                like_id:element.likeId
                                            }).then(response=>{
                                                document.getElementById("dislike"+element.id).style.color="white"
                                            })
                                        }else{
                                            
                                            if(document.getElementById("like"+element.id).style.color=='red'){
                                              console.log(element.likeId);
                                            axios.post('http://127.0.0.1:8000/home/removelike_job/',{
                                                id:localStorage.getItem('uid'),
                                                job_id:element.id,
                                                like_id:element.likeId
                                            }).then(response=>{
                                               if(response.data=='ok'){

                                                //islike=false
                                                axios.post('http://127.0.0.1:8000/home/dislike_job/',{
                                                    id:localStorage.getItem('uid'),
                                                    job_id:element.id,
                                                  
                                                }).then(response=>{
                                                    if(response.data.res=='ok'){
                                                       // isDislike=true
                                                        element.likeId=response.data.id
                                                        document.getElementById("like"+element.id).style.color="white"
                                                        document.getElementById("dislike"+element.id).style.color="red"
    
                                                    }
                                                                                                   }) 
                                               }
                                            }) 
                                        }else{
                                            axios.post('http://127.0.0.1:8000/home/dislike_job/',{
                                                    id:localStorage.getItem('uid'),
                                                    job_id:element.id,
                                                  
                                                }).then(response=>{

                                                    if(response.data.res='ok'){
                                                       // isDislike=true
                                                        element.likeId=response.data.id
                                                        document.getElementById("dislike"+element.id).style.color="red"
    
                                                    }
                                                                                                   }) 
                                        }
                                        }
                                    }
                                }
                                        role="button"><i class="fa-solid fa-thumbs-down" id={"dislike"+element.id} style={
                                            {

                                                color:isDislike?"red":"white"
                                            }
                                        }></i></a>
                                    <a name="" id="" class="btn btn-success rounded-pill btn-sm" onClick={
                                        ()=>{

                                         
                                            if(document.getElementById("like"+element.id).style.color=='red'){
                                               // console.log(element.likeId);
                                                axios.post('http://127.0.0.1:8000/home/removelike_job/',{
                                                    id:localStorage.getItem('uid'),
                                                    job_id:element.id,
                                                    like_id:element.likeId
                                                }).then(response=>{
                                                   // console.log(response.data);
                                                    document.getElementById("like"+element.id).style.color="white"
                                                })
                                               
                                            }else{
                                                //
                                                if(document.getElementById("dislike"+element.id).style.color=='red'){
                                                   // console.log(element.likeId);
                                                axios.post('http://127.0.0.1:8000/home/removeDislike_job/',{
                                                    id:localStorage.getItem('uid'),
                                                    job_id:element.id,
                                                    like_id:element.likeId
                                                }).then(response=>{

                                                  
                                                   if(response.data=='ok'){
                                                    isDislike=false
                                                
                                                    axios.post('http://127.0.0.1:8000/home/like_job/',{
                                                        id:localStorage.getItem('uid'),
                                                        job_id:element.id,
                                                      
                                                    }).then(response=>{

                                                      
                                                       if(response.data.res=='ok'){
                                                        
                                                        islike=true
                                                        element.likeId=response.data.id
                                                        document.getElementById("like"+element.id).style.color="red"
                                                        document.getElementById("dislike"+element.id).style.color="white"

                                                       }                                                    }) 
                                                   }
                                                }) 
                                            }else{
                                                axios.post('http://127.0.0.1:8000/home/like_job/',{
                                                        id:localStorage.getItem('uid'),
                                                        job_id:element.id,
                                                      
                                                    }).then(response=>{

                                                        if(response.data.res=='ok'){
                                                            islike=true
                                                            element.likeId=response.data.id
                                                        document.getElementById("like"+element.id).style.color="red"

                                                        }
                                                                                                            }) 
                                            }
                                            }
                                        }
                                    }
                                        role="button"><i class="fa-solid fa-heart" id={"like"+element.id} style={
                                            {

                                                color:islike?"red":"white"
                                            }
                                        }></i></a>


                                </div>

                            </div>

                            <div class="row my-3">
                                <p class="text-muted small">Fixed-price - Intermediate - Est. Budget: ${element.cost} - Posted {convertMsToTime(b-a)} ago</p>


                            </div>

                            <div class="row my-3 text-center">
                                  <div id={"carouselExampleIndicators"+element.id} class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target={"#carouselExampleIndicators"+element.id} data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target={"#carouselExampleIndicators"+element.id} data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target={"#carouselExampleIndicators"+element.id} data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    {element.images.map((ele,index)=>{
        if(index==0)
        {
            return ( <div class="carousel-item active">
            <img src={"http://localhost:8000"+ele.image} class="d-block w-100 haimage" alt="..." />
          </div>)
        }else{
            return ( <div class="carousel-item">
            <img src={"http://localhost:8000"+ele.image} class="d-block w-100 haimage" alt="..." />
          </div>)
        }
    })}
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target={"#carouselExampleIndicators"+element.id} data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target={"#carouselExampleIndicators"+element.id} data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
                            </div>
                            <div class="row my-3">
                                <p>{element.description}</p>


                            </div>
                            <div class=" mb-1">

                                {element.skills.map(ele=>(
                                     <span class="badge bg-secondary rounded-pill">{ele.name}</span>
                                ))}
                             

                            </div>
                            <div class="row my-3">
                                <p class="text-muted">Proposals:{element.Proposals.length}</p>

                            </div>
                           {element.is_pyment?( <div class="row">
                              
                              <div class=" d-flex" style={{
                                  "paddingLeft": 0
                              }}>
                                  <div>
                                      <p class="text-muted px-2"><i class="fa-solid fa-check"></i> payment verifid
                                      </p>
                                  </div>
                                  <div>
                                      <i class="fa-solid fa-star"></i>
                                      <i class="fa-solid fa-star"></i>
                                      <i class="fa-solid fa-star"></i>
                                      <i class="fa-solid fa-star"></i>
                                      <i class="fa-solid fa-star"></i>
                                  </div>
                                  <div class="mx-3">

                                      <div>
                                          <i class="fa-solid fa-location-dot"></i>
                                          <span class="">Egypt</span>
                                      </div>

                                  </div>

                              </div>






                         

                      </div>):(<div></div>)}



                        </div>
                        <hr/>
                            </div>
                        )})):(<div></div>)}


                    </div>

                </div>

            </div>


        </div>


    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Advanced Serach</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="mb-3">
                        <label for="" class="form-label">All of these words</label>
                        <input id='all' type="text" class="form-control" name=""  aria-describedby="helpId"/>

                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Any of these words</label>
                        <input id='any' type="text" class="form-control" name=""  aria-describedby="helpId"/>

                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">The exact phrase</label>
                        <input id='exact' type="text" class="form-control" name=""  aria-describedby="helpId"/>

                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Skills Search</label>
                        <input id='se_skills' type="text" class="form-control" name=""  aria-describedby="helpId"/>

                    </div>





                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={
                        ()=>{
                            var all=document.getElementById('all').value
                            var any=document.getElementById('any').value
                            var exact=document.getElementById('exact').value
                            var se_skills=document.getElementById('se_skills').value
                            if(all){
                                axios.post('http://127.0.0.1:8000/home/All_of_these_words/',{
                                    word:all
                                }).then(response=>{
                                    this.setState({data:response.data})
                                })
                            }else if(any){
                                axios.post('http://127.0.0.1:8000/home/job_search/',{
                                    word:any
                                }).then(response=>{
                                    this.setState({data:response.data})
                                })
                            }else if(exact){
                                axios.post('http://127.0.0.1:8000/home/The_exact_phrase/',{
                                    word:exact
                                }).then(response=>{
                                    this.setState({data:response.data})
                                })
                            }else if(se_skills){
                                axios.post('http://127.0.0.1:8000/home/Skills_Search/',{
                                    word:se_skills
                                }).then(response=>{
                                    this.setState({data:response.data})
                                })
                            }
                        }
                    }>Search</button>
                </div>
            </div>
        </div>
    </div>
            </div>
        )
    }}else{
        return <Error/>
    }
}
}
export default Search;
