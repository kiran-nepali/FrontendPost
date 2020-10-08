import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';  

export default function Todo(){

    const[tododata,setTododata]=useState({});

    useEffect(()=>{
        const todoapi="https://jsonplaceholder.typicode.com/todos";
        axios.get(todoapi)
        .then(response=>{
            const bardata = response.data;
            let todoid = [];
            let todoTitleletters = [];
            bardata.filter(record=>record.id<=30).forEach(record => {
                todoid.push(record.id)
                todoTitleletters.push(record.title.length)
            });
            setTododata({
                labels:todoid,
                datasets:[
                    {
                        label:"Total number of letters in title of Todos",
                        data:todoTitleletters
                    }
                ]
            });
        })
    })

    return(
        <div>
            <Bar data={tododata} options={{ maintainAspectRatio: false }}></Bar>
        </div>
    )
}
