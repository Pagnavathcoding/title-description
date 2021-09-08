import React from 'react';
import { useEffect, useState, Component } from 'react';
import "./index.css";
import light from './Images/sun.svg';
import dark from './Images/moon.svg';
import showing from './Images/eye.svg';
import hidden from './Images/eye-crossed.svg';
import close from './Images/close.svg';
import copy from './Images/copy.svg';
function local() {
    const data = localStorage.getItem("items");
    if (data) {
        return JSON.parse(localStorage.getItem("items"));
    }
    else {
        return [];
    }
}
function App() {
    const [toggle, setToggle] = useState(false);
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [show, setShow] = useState(false);
    const style = {
        main: {
            background: toggle ? "#20232a" : "none",
            color: toggle ? "#fff" : "#555"
        },
        text: {
            color: toggle ? "#fff" : "#555",
            border: toggle ? "0.01em solid #61dafb" : "0.01em solid #555"
        },
        btn: {
            boxShadow: toggle ? "none" : "0 2px 4px #c8c8c8"
        },
        item: {
            background: toggle ? "#282c34" : "#fff",
            boxShadow: toggle ? "none" : "0 2px 4px #c8c8c8"
        },
        range: {
            boxShadow: toggle ? "none" : "0 2px 4px #c8c8c8"
        },
        title: {
            color: toggle ? "#fff" : "#000",
        },
        desP: {
            color: toggle ? "#eee" : "#555"
        },
        link: {
            color: toggle ? "#fff" : "#555"
        }
    }
    const number = Date.now();
    const timeStart = new Date();
    let year = timeStart.getFullYear();
    let month = timeStart.getMonth();
    let day = timeStart.getDay();
    let hour = timeStart.getHours();
    let minute = timeStart.getMinutes();
    const date = timeStart.getDate();
    let am_pm = "AM";
    if (hour > 12) {
        hour = hour - 12;
        am_pm = "PM"
    }
    if (hour === 0) {
        hour = 12;
    }
    hour = (hour < 10) ? "0" + hour : hour;
    minute = (minute < 10) ? "0" + minute : minute;
    switch (day) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        default:
            day = "Saturday";
            break;
    }
    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "Feburary";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "Auguest";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }
    const timer = `${hour}:${minute}${am_pm}, ${day} ${date}, ${month} ${year}`;
    const [items, setItems] = useState(local())
    function firstChange(e) {
        setFirst(e.target.value);
    }
    function secondChange(e) {
        setSecond(e.target.value);
    }
    function handleSubmit() {
        if (first === '' && second === '') return;
        if (first === '' || second === '') return;
        setFirst('');
        setSecond('');
        const newItems = {
            id: number,
            title: first,
            description: second,
            time: timer
        }
        setItems([...items, newItems]);
    }
    function clearItem(id) {
        const updatedList = items.filter((item) => item.id !== id);
        setItems(updatedList);
    }
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items])
    return (
        <main style={style.main}>
            <header>
                <h1>T&D</h1>
                <div className="light-dark">
                    {toggle ? <div className="light" onClick={() => {
                        setToggle(!toggle);
                    }}>
                        <img src={light} />
                        <p>Light</p>
                    </div> : <div className="dark" onClick={() => {
                        setToggle(!toggle);
                    }}>
                        <img src={dark} />
                        <p>Dark</p>
                    </div>}
                </div>
            </header>
            <div className="show">
                <button onClick={() => {
                    setShow(!show);
                }} style={style.btn}>{show ? <img src={hidden} /> : <img src={showing} />}</button>
            </div>
            <div style={{ display: show ? "none" : "block" }}>
                <div className="text">
                    <p style={{ fontSize: "18px" }}>Input Title and Description.</p>
                </div>
                <section className="fill">
                    <div className="title">
                        <h1>Title:</h1>
                        <textarea placeholder="Input title..." style={style.text} value={first} onChange={firstChange}>

                        </textarea>
                    </div>
                    <div className="des">
                        <h1>Description:</h1>
                        <textarea placeholder="Input description..." style={style.text} value={second} onChange={secondChange}>
                        </textarea>
                    </div>
                    <div className="btn">
                        <button onClick={handleSubmit} style={style.btn}>Submit</button>
                        <button onClick={() => {
                            setFirst('');
                            setSecond('');
                        }} style={style.btn}>Clear Input</button>
                    </div>
                </section>
            </div>
            <div className="count">
                <h1 style={{ fontSize: "25px" }}>{items.length <= 0 ? "Empty " : `[${items.length}] `} {items.length > 1 ? "Items" : "Item"}</h1>
            </div>
            <section className="container">
                <div className="items">
                    {
                        items.map((data, index) => {
                            return (
                                <div className="item" style={style.item} key={data.id}>
                                    <div className="range" style={style.range}>
                                        <h1 style={{ fontSize: "18px" }} >{index + 1}</h1>
                                    </div>
                                    <div className="date">
                                        <p>Date: {data.time}</p>
                                        <button><img src={close} onClick={() => {
                                            clearItem(data.id);
                                        }} /></button>
                                    </div>
                                    <div className="title-item">
                                        <div className="a">
                                            <h1 style={style.title}>Title</h1><div className="copy">
                                                <img src={copy} onClick={() => {
                                                    navigator.clipboard.writeText(data.title);
                                                }} />
                                            </div>
                                        </div>
                                        <p>{data.title}</p>
                                    </div>
                                    <div className="des-item">
                                        <div className="a">
                                            <h1 style={style.title}>Description</h1> <div className="copy">
                                                <img src={copy} onClick={() => {
                                                    navigator.clipboard.writeText(data.description);
                                                }} />
                                            </div>
                                        </div>
                                        <p style={style.desP}>{data.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <footer>
                <p>&copy; tetd 2021 | developed by <a href="mailto:pagnavathcoding@gmail.com" style={style.link}>Pagnavath</a>, All rights reserved</p>
            </footer>
        </main>
    )
}
export default App;