import React, { Component, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
// import { useEffect } from 'react';
import '../../../index.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import NavBar from '../freelancer/navbar';

import './windows'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
const ClientProfile = () => {

    const [id, setId] = useState('');
    const [data, setData] = useState('');
    const setting = useRef('');
    const jobSection = useRef('');
    const JTitle = useRef('')
    const [isMenu, setIsMenu] = useState(false);
    const [emp,setEmp]=useState('');

    const [titlez, setTitle] = useState('');
    const [costz, setCost] = useState('');
    const [descriptionz, setDescription] = useState('');
    const [is_pymentz, setIs_pyment] = useState('');
    const [imagesz, setImages] = useState('');
    const animatedComponents = makeAnimated();
    const [optionsSkills, setOptionsSkills] = useState([]);
    const [selectionSkills, SetSelectionSkills] = useState([]);
    const [select_error, setselect_error] = useState('')
    const [jobs, setJobs] = useState([]);
    const [jobsDetails, setJobsDetails] = useState([]);
    const [applay, setApplay] = useState('');

    let calday=(create_at)=>{
        var a = new Date(create_at)
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
          return convertMsToTime(b-a)
    }
    useEffect(() => {
        axios.post(`http://localhost:8000/home/latestJobs/`, { client_id: localStorage.getItem('uid') })
            .then(res => {
                setJobs(res.data);
                console.log(res.data)
                console.log(jobs)
                console.log(res.data.images)
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);



    useEffect(() => {

        axios.post(`http://localhost:8000/home/jobDetails/`, { id: jobs.id })
            .then(res => {
                setJobsDetails(res.data);
                console.log(res.data)
                console.log(jobsDetails)
                console.log(res.data.images)
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);


    useEffect(() => {
        if (localStorage.getItem('uid')) {
            if (localStorage.getItem('type') == 'user') {
                setting.current.focus();
            }
        }
        axios.get("http://127.0.0.1:8000/auth/get_skills/").then(response => {
            var optionslist = []

            response.data.forEach(element => {
                optionslist.push({ value: element.id, label: element.name })

            });
            setOptionsSkills(optionslist)
        })

    }, []);

    useEffect(() => {
        jobSection.current.focus();
    }, []);

    function contactS() {
        const DoM = jobSection.current;
        DoM.style.display = 'block'
    }
    function XcontactS() {
        const DoM = jobSection.current;
        DoM.style.display = 'none'
    }


    function settingS() {
        setIsMenu(true)
        const DoM = setting.current;
        DoM.style.display = 'block'
    }
    function XsettingS() {
        setIsMenu(false)
        const DoM = setting.current;
        DoM.style.display = 'none'
    }

    function JTitleOP() {
        setIsMenu(true)
        const DoM = JTitle.current;
        DoM.style.display = 'block'
    }
    function XJTitleOP() {
        setIsMenu(false)
        const DoM = JTitle.current;
        DoM.style.display = 'none'
    }
    
  

    useEffect(() => {
        axios.post(`http://127.0.0.1:8000/profile/clientDetails/`, { id: localStorage.getItem('uid') })
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [id]);
    if (localStorage.getItem('uid')) {
        if (localStorage.getItem('type') == 'user') {

            return (
                <div>
                    <NavBar
                        url='http://127.0.0.1:8000/profile/clientDetails/'

                        openMenu={isMenu ? (XsettingS) : (settingS)}
                    />
                    <div className='row'>
                        <div className=' col-sm-3 buttonSetting text-center animate' id="setting" ref={setting}>
                            <img className='littleSymbolImage' src={data.image ? ("data:image/*;base64," + data.image) : ("./images/default.png")} />
                            <h4 className='mt-3'>{data.name}</h4>
                            <hr />
                            <NavLink to={'/clientsettings'}><h5>Settings</h5></NavLink>
                            <NavLink onClick={
                                () => {
                                    localStorage.clear()
                                    window.location = "/"
                                }
                            }>
                                <h5 className='pb-4'>Logout</h5></NavLink>
                        </div></div>
                    <div className='container' onClick={
                        () => {
                            document.getElementById("setting").style.display = 'none'
                        }
                    }>
                        <div className='mt-md-5 mt-xs-3 mt-1'>
                            <h1 className='text-dark'>Hi , {data.name} </h1>
                            <h3 className='text-dark'>Your workspace</h3>
                        </div>

                        {/* Add job */}
                        <div className="container w-75 jobModal  ms-5 border border-success " ref={jobSection}>
                            <div className=" container mt-3">
                                <form className="text-center " onSubmit={
                                    (e) => {
                                        e.preventDefault()
                                        if (selectionSkills.length == 0) {
                                            setselect_error("select skills")
                                        } else {
                                            axios.post(`http://localhost:8000/home/JobClient/`, {
                                                title: titlez,
                                                cost: costz,
                                                description: descriptionz,
                                                is_pyment: data.is_payments,
                                                images: imagesz,
                                                client_id: localStorage.getItem('uid'),
                                                skills: selectionSkills,
                                            }, {
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            }).then(res => {

                                                setTitle('')
                                                setCost('')
                                                setDescription('')
                                                SetSelectionSkills([])
                                                setImages([])
                                                setselect_error('')
                                                XcontactS()

                                            })
                                        }
                                    }
                                }>
                                    <h3>Add Job</h3>
                                    <div className="row text-start m-auto">
                                        <div className="col-md-6 mt-3 ">
                                            <label for="fname" className="">Job Title</label>
                                            <input type="text" className="form-control" id="fname" name="title" placeholder="Job Title"
                                                value={titlez}
                                                onChange={
                                                    (e) => {
                                                        setTitle(e.target.value)
                                                    }}
                                                required />
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <label for="cost"> Job Cost</label>
                                            <input type="number" id="cost" name="cost" className="form-control" placeholder="Job Cost"
                                                value={costz}
                                                onChange={
                                                    (e) => {
                                                        setCost(e.target.value)
                                                    }}
                                                required />
                                        </div>
                                    </div>
                                    <div className="row text-start">
                                        <div className="mt-3">
                                            <label for="description">Job Description </label>
                                            <textarea type="text" id="description" name="description" className="form-control" rows={8} placeholder="Just Enter your city"
                                                value={descriptionz}
                                                onChange={
                                                    (e) => {
                                                        setDescription(e.target.value)
                                                    }}
                                                required />
                                        </div>
                                        <div className='mt-2'></div>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={optionsSkills}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={
                                                (e) => {
                                                    setselect_error('')
                                                    var m = []
                                                    e.forEach(element => {
                                                        m.push(element.value)
                                                    });
                                                    SetSelectionSkills(m)

                                                    // this.setState({ defaultSkills: e })
                                                }
                                            }
                                            required />
                                        <div className='text-danger'>
                                            {select_error}
                                        </div>
                                    </div>

                                    <div className="row text-start ">
                                        <div className="col-md-6 mt-3">
                                            <label for="images">Job Images</label>
                                            <input type="file" id="images" name="images" className="form-control" placeholder="Choose your images" multiple
                                                onChange={
                                                    (e) => {

                                                        setImages(e.target.files)
                                                    }}
                                                required />
                                        </div>
                                    </div>

                                    <input type="submit" value="Add Job" className="btn btn-success mb-3 mt-3" />
                                    <button className="btn btn-light text-success ms-5"
                                        onClick={XcontactS}
                                    >Return</button>
                                </form>
                            </div>
                        </div>

                        {/* Job Details Section   */}
                        <div className='JobDetails m-auto text-center w-md-75 mt-5 animate ' id="JobDetails" ref={JTitle}>
                            <div className=" p-4" >
                            <div class="maimgcontainer">
                                                <span class="close" onClick={
                                                    () => {

                                                        document.getElementById('JobDetails').style.display = 'none'
                                                    }
                                                }>&times;</span>

                                            </div>
                                {
                                   <div class="row ">
                                   <div class="">
                                      
                                       <div class=" mt-5">
                                           <h5><a href="#" class="text-center text-success">{jobsDetails.title}</a></h5>
           
                                           <p class="text-muted">
                                               post at {
                                                 calday(jobsDetails.create_at) 
                                                   
                                                   
                                               }
           
                                               </p>
           
           
                                       </div>
                                       <hr />
                                       <div class="row">
                                           <div class="row my-3 text-center">
           
           
                                               <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                                                   <div class="carousel-indicators">
                                                       {
                                                           jobsDetails.images?(jobsDetails.images.map((ele,ind)=>{
                                                               if(ind==0){
                                                                   return(
                                                                       <button type="button" data-bs-target="#carouselExampleIndicators"
                                                                       data-bs-slide-to={ind} class="active" aria-current="true"
                                                                       aria-label="Slide 1"></button>
                                                                   )
                                                               }else{
                                                                   return(
                                                                       <button type="button" data-bs-target="#carouselExampleIndicators"
                                                                       data-bs-slide-to={ind} aria-current="true"
                                                                       aria-label="Slide 1"></button>
                                                                   )
                                                               }
                                                           })):(<div></div>)
                                                       }
                                                   
                                                   </div>
                                                   <div class="carousel-inner">
                                                       {
                                                           jobsDetails.images?(jobsDetails.images.map((ele,ind)=>{
                                                               if(ind==0){
                                                                   return (
                                                                       <div class="carousel-item active">
                                                           <img src={"http://localhost:8000"+ele} class="d-block w-100 image_slid" alt="..." />
                                                       </div>
                                                                   )
                                                               }else{
                                                                   return (
                                                                       <div class="carousel-item">
                                                           <img src={"http://localhost:8000"+ele} class="d-block w-100 image_slid" alt="..." />
                                                       </div>
                                                                   )
                                                               }
                                                           })):(<div></div>)
                                                       }
                                                       
                                                   </div>
                                                   <button class="carousel-control-prev" type="button"
                                                       data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                       <span class="visually-hidden">Previous</span>
                                                   </button>
                                                   <button class="carousel-control-next" type="button"
                                                       data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                       <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                       <span class="visually-hidden">Next</span>
                                                   </button>
                                               </div>
           
           
           
                                           </div>
           
                                       </div>
           
           
                                       <hr />
                                       <div>
                                           <p>{jobsDetails.description}</p>
           
           
                                       </div>
                                       <hr />
                                       <div class=" d-flex justify-content-around">
                                           <div class="">
                                               <h6>
                                                   {jobsDetails.cost}$
                                               </h6>
                                               <p class="text-muted">
                                                   Fixed-price
           
                                               </p>
           
                                           </div>
                                           <div class="">
                                               <h6>
                                                   Intermediate
           
                                               </h6>
                                               <p class="text-muted w10">
                                                   I am looking for a mix of experience and value
                                               </p>
           
           
                                           </div>
                                       </div>
                                       <hr />
                                       <div class="row" >
                                           <div class="col" className='abskill'>
                                               <h6>
                                                   Skills and Expertise
                                               </h6>
                                               <div>
                                                   {jobsDetails.skills?(jobsDetails.skills.map(ele=>{
            return <span class="badge bg-secondary rounded-pill">{ele}</span>
           
                                                   })):(<div></div>)}
                                                                                    </div>
           
                                           </div>
           
           
                                       </div>
                                       <hr />
                                       <div class="row">
                                           <div class="col"  style={
                                            {
                                                textAlign:'left'
                                            }
                                           } className='abskill'>
                                               <h6>Activity on this job</h6>
                                               <div className='row mt-2' >
                                                {jobsDetails.proposals?jobsDetails.proposals.map(ele=>{
                                                    return ( <div class="chip col-3" onClick={() => {
                                                        console.log("id",id);
                                                        axios.post('http://localhost:8000/home/job_cover/',{
                                                            id:ele.id,
                                                            id_job:id
                                                        }).then(res=>{
                                                            setEmp(ele);
                                                        setApplay(res.data)       
                                                        document.getElementById('id0p2').style.display = 'block'                                                
                                                        })
                                                        //window.location.href = 'http://localhost:3000/cv_free';
                                                      }}>
                                                    <img src={"http://localhost:8000"+ele.image} alt="Person" width="96" height="96"/>
                                                   {ele.name}
                                                  </div>)
                            
                                                }):(<div></div>)}
                                               
                                    
           
                                               </div>
           
                                           </div>
           
                                       </div>
           
           
           
                                   </div>
                                  
                               </div>

                                }

                            </div>
                        </div>

                        {/* section 1 */}
                        <div className='mt-5'>
                            <div className='row'>
                                <div className='col-md-3 col-sm-6 col-12 mt-3'>

                                    <div className='profileCards container pCards1'>
                                        <div className='mt-3 p-3'>
                                            <h3>Guided tour</h3>
                                        </div>
                                        <div className='w-75 p-3'>
                                            Use your workspace to manage dragt hob postsm action items, and comleted work.
                                        </div>
                                    </div>

                                </div>
                                <div className='col-md-3 col-sm-6 col-12 mt-3'>

                                    <div className='profileCards container pCards2'>

                                        <div className='text-center pCardsTwo'>
                                            <button className='btn btn-success btn-bg  rounded-pill'
                                                onClick={contactS}
                                            >
                                                <i className="fa-duotone fa-plus h3"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-sm-6 col-12 mt-3'>

                                    <div className='profileCards container pCards2'>
                                        <div className='mt-3 p-3'>
                                            <h4>Pay with confidence</h4>
                                        </div>
                                        <div className='w-75 p-3'>
                                            Talent look for clients with cerified biling methods , there's no cost until you hire; you'll only be charged once you approve completed work.
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-sm-6 col-12 mt-3'>

                                    <div className='profileCards container pCards2'>
                                        <div className='mt-3'>
                                            <h4 className='p-3'>Stay safe on Upwork</h4>
                                        </div>
                                        <div className='w-75 p-3'>
                                            we are doing our best to keep you safe , and it's important you learn how to indenity  and report suspicious activity
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* section 2 */}
                        <div className='mt-md-5 mt-xs-3 mt-1'>
                            <h1 className='text-dark'>Complete these steps to stand out and hire fast </h1>
                        </div>
                        <div className='mt-5'>
                            <div className='row mb-5'>
                                <div className='col-md-4 col-sm-6 col-12 mt-3'>

                                    <div className='profileCards2 container pCards1 text-dark '>
                                        <div className='mt-3 p-3'>
                                            <h4>require to hire </h4>
                                        </div>
                                        <div className='w-75 p-3'>
                                            <a className='text-success' href='#'>Add a billing method.</a>
                                            There's no cost until you hire
                                        </div>
                                    </div>

                                </div>
                                <div className='col-md-4 col-12 mt-3'>
                                    <div className='profileCards2 container pCards2 text-dark' >
                                        <div className='mt-3 p-3'><h4>require to hire </h4></div>
                                        <div className=' ps-3 mt-3 h4 text-secondary'>
                                            You verified your Email address
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* Section 3 */}
                        <div className='mt-md-5 mt-xs-3 mt-1'>
                            <h1 className='text-dark'>Complete these steps to stand out and hire fast </h1>
                        </div>
                        <div className='mt-5 mb-5'>
                            <div className='row'>
                                <div className='col-md-3 col-sm-6 col-12 mt-3'>

                                    <div className='profileCards3 container pCards3 '>
                                        <div className='mt-3 p-3'>
                                            <h3>Guided tour</h3>
                                        </div>
                                        <div className='w-75 p-3'>
                                            Book a consultation with an expert to review your project's budget, timeline , and scope one-on-one
                                        </div>
                                        <button className='rounded-pill btn btn-success text-center mt-5'>
                                            Learn more
                                        </button>
                                    </div>

                                </div>
                                <div className='col-md-3 col-sm-6 col-12 mt-3'>

                                    <div className='profileCards3 container pCards2 text-center'>
                                        <div className='mt-3 p-3'>
                                            <h4 className='text-dark'>Development & IT</h4>
                                        </div>
                                        <img className='w-75' src='..\..\images\Develope.avif' />
                                    </div>
                                </div>
                                <div className='col-md-3 col-sm-6 col-12 mt-3'>

                                    <div className='profileCards3 container pCards2 text-center'>
                                        <div className='mt-3'>
                                            <h4 className='p-3 text-dark'>Marketing</h4>
                                        </div>
                                        <img className='w-75' src='./images/marketing.png' />
                                    </div>
                                </div>
                                <div className='col-md-3 col-sm-6 col-12 mt-3 text-center'>

                                    <div className='profileCards3 container pCards2'>
                                        <div className='mt-3 text-dark'>
                                            <h4 className='p-3'>Design</h4>
                                        </div>
                                        <img className='w-75' src='./images/Design.avif' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* section 4 */}
                        <div className='profileCards3 container pCards4 text-dark'>
                            <div className='mt-3 p-3'>
                                <h3>History Work</h3>
                            </div>
                            <div className='w-75 p-3 h2'>
                                Get started and connect with talent to get work done
                            </div>
                            <button className='rounded-pill btn btn-success text-center mt-5 ms-5'>
                                go to article
                            </button>
                        </div>
                        {/* section 5 */}
                        <div className='mt-md-5 mt-xs-3 mt-1'>
                            <h1 className='text-dark'>Latest Jobs</h1>
                        </div>
                        <div className='mt-5'>

                            <div className='row mb-5'>
                                {jobs.map(job => (
                                    <div className='col-md-4 mt-3'>
                                        <div className='profileCards2 container pCards2 text-dark' >
                                            <div className='mt-3 p-3'><h3 className='text-center'>{job.title} </h3></div>
                                            
                                            <div class="row my-3 text-center">
                                                <div id={"carouselExampleIndicators" + job.id} className="carousel  " data-bs-ride="true">
                                                    <div class="carousel-indicators">
                                                    {job.images.map((imgs, index) => {
                                                            if (index == 0) {
                                                               return <button type="button" data-bs-target={"#carouselExampleIndicators" + job.id} data-bs-slide-to={index} class="active" aria-current="true" aria-label="Slide 1"></button>
                                                            }else{
                                                               return  <button type="button" data-bs-target={"#carouselExampleIndicators" + job.id} data-bs-slide-to={index} aria-label="Slide 2"></button>
                                                            }
                                                        })
                                                    }
                                                       
                                                        
                                                       
                                                    </div>
                                                    <div class="carousel-inner "
                                                        onClick={
                                                            () => {
                                                                if (job.id.length == 0) {
                                                                    console.log("no data")
                                                                } else {
                                                                    axios.post(`http://localhost:8000/home/jobDetails/`, { id: job.id })
                                                                        .then(res => {
                                                                            setJobsDetails(res.data);
                                                                            setId(job.id)
                                                                            console.log(job.id)
                                                                            console.log(jobsDetails)

                                                                            JTitleOP()
                                                                        })
                                                                        .catch(err => {
                                                                            console.log(err.message);
                                                                        })

                                                                }
                                                            }
                                                        }
                                                    >
                                                        {job.images.map((imgs, index) => {
                                                            if (index == 0) {
                                                                return (<div class="carousel-item active">
                                                                    <img src={"http://localhost:8000" + imgs.image} className="d-block w-100 haimage slide BorderRadiusClass" alt="..." />
                                                                </div>)
                                                            } else {
                                                                return (<div class="carousel-item">
                                                                    <img src={"http://localhost:8000" + imgs.image} className="d-block w-100 haimage slide BorderRadiusClass " alt="..." />
                                                                </div>)
                                                            }
                                                        })}
                                                    </div>

                                                    <button class="carousel-control-prev" type="button" data-bs-target={"#carouselExampleIndicators" + job.id} data-bs-slide="prev">
                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Previous</span>
                                                    </button>
                                                    <button class="carousel-control-next" type="button" data-bs-target={"#carouselExampleIndicators" + job.id} data-bs-slide="next">
                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* Test Section */}

                    </div>
                    <div id="id0p2" class="mamodal rounded">

<div class="mamodal-content maanimate rounded">
    <div class="maimgcontainer">
        <span class="close" onClick={
            () => {

                document.getElementById('id0p2').style.display = 'none'
            }
        }>&times;</span>

    </div>

    <div class="container myconatiner pt-4">
        <h3 class="text-left ml-4">Cover</h3>
        <p>{applay.cover}</p>
        <div class="input-group mb-3">
  <span class="input-group-text">Cost</span>
  <input type="text" class="form-control" value={applay.cost_re} readOnly/>
</div>
<div id={"carouselExampleIndicators"+applay.id} class="carousel slide" data-bs-ride="true">
                                                   <div class="carousel-indicators">
                                                       {
                                                           applay.images?(applay.images.map((ele,ind)=>{
                                                               if(ind==0){
                                                                   return(
                                                                       <button type="button" data-bs-target={"#carouselExampleIndicators"+applay.id} 
                                                                       data-bs-slide-to={ind} class="active" aria-current="true"
                                                                       aria-label="Slide 1"></button>
                                                                   )
                                                               }else{
                                                                   return(
                                                                       <button type="button" data-bs-target={"#carouselExampleIndicators"+applay.id} 
                                                                       data-bs-slide-to={ind} aria-current="true"
                                                                       aria-label="Slide 1"></button>
                                                                   )
                                                               }
                                                           })):(<div></div>)
                                                       }
                                                   
                                                   </div>
                                                   <div class="carousel-inner">
                                                       {
                                                           applay.images?(applay.images.map((ele,ind)=>{
                                                               if(ind==0){
                                                                   return (
                                                                       <div class="carousel-item active">
                                                           <img src={"http://localhost:8000"+ele.image} class="d-block w-100 image_slid" alt="..." />
                                                       </div>
                                                                   )
                                                               }else{
                                                                   return (
                                                                       <div class="carousel-item">
                                                           <img src={"http://localhost:8000"+ele.image} class="d-block w-100 image_slid" alt="..." />
                                                       </div>
                                                                   )
                                                               }
                                                           })):(<div></div>)
                                                       }
                                                       
                                                   </div>
                                                   <button class="carousel-control-prev" type="button"
                                                       data-bs-target={"#carouselExampleIndicators"+applay.id}  data-bs-slide="prev">
                                                       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                       <span class="visually-hidden">Previous</span>
                                                   </button>
                                                   <button class="carousel-control-next" type="button"
                                                       data-bs-target={"#carouselExampleIndicators"+applay.id}  data-bs-slide="next">
                                                       <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                       <span class="visually-hidden">Next</span>
                                                   </button>
                                               </div>
                                               <br/>
                                               <div class="chip w-100" onClick={() => {
                        
                                                        window.location.href = 'http://localhost:3000/cv_free/'+emp.id;
                                                      }}>
                                                    <img src={"http://localhost:8000"+emp.image} alt="Person" width="96" height="96"/>
                                                   {emp.name}
                                                  </div>
<div class="btn-group w-100 p-4">
  <button className='w-50'>Chat</button>
  <button className='w-50'onClick={
    ()=>{
       
    }
  } >Finish Job</button>
</div>
                            
    </div>
</div>
</div>
<div id="id0pp1" class="mamodal rounded">

<div class="mamodal-content maanimate rounded">
    <div class="maimgcontainer">
        <span class="close" onClick={
            () => {

                document.getElementById('id0pp1').style.display = 'none'
            }
        }>&times;</span>

    </div>

    <div class="container myconatiner pt-4">

<div class="btn-group w-100 p-4">
  <button className='w-50'>Chat</button>
  <button className='w-50'onClick={
    ()=>{
       
    }
  } >Hire</button>
</div>
                            
    </div>
</div>
</div>
                </div >

            )
        }
        else {
            window.location = '/error'
        }
    } else {
        window.location = '/error'
    }
}


export default ClientProfile;
