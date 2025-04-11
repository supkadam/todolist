import './App.css'
import {useState} from 'react';
import Swal from "sweetalert2";

export default function App() {
  const[task, setTask] = useState([]);
  const[completed, setCompleted] = useState([]);
  const[text, setText] = useState();
  const[check, setCheck] = useState(false);
  const editTask = (index) =>{
    Swal.fire({
      title: 'Edit task',
      input: 'text',
      inputValue: task[index],
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Please enter a task');
        }
        else{
          task.splice(index,1,value);
          //task[index] = value;
          setTask([...task]);
        }
      }
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Task updated successfully!',
          icon: 'success',
        });
      }
    });

  }

  const deleteTask = (place) =>{
    task.splice(place,1)
    setTask([...task]);

  }

  const completeTheTask = (place) =>{

      setTimeout(()=>{
        let t = task.splice(place,1)
        setCompleted([...completed,t])
        setCb(false)
        setTask([...task])
      },500)

  }
  
  return(
    <>
      <div className='container'>
        <div className='heading'>
          <h1 id='heading'>To Do App</h1>
        </div>

        <div className='child1'>
          <input type='text'  value={text} onChange={(event)=>{setText(event.target.value)}} id='inp-box'/>
          <button id='btn' onClick={()=>{
            if(text){
              setTask([...task, text]);
              
            }else{
              alert('Please enter a task');
            }
            setText('');
          }}>Add Task</button>
        </div>

        <div className='child2'>
          <div className='ongoing'>
            <h1>Ongoing tasks</h1>

            {task.map((item,index)=>
              <div className='rendered-tasks'>
                <input type='checkbox' checked={check} onChange={()=>{completeTheTask(index)}}/>
                <li key={index}>{item}</li>
                <img src='/edit.png' onClick={()=>{editTask(index)}}></img>
                <img id={index} src="/delete.png" onClick={()=>{deleteTask(index)}} ></img>
              </div>)}

          </div>
          <div className='completed'>
            <h1>Completed tasks</h1>
            {completed.map((item,index)=>
              <div className='completed-tasks'>
                  
                  <li key={index}>{item}</li>
                  <img src='undo.png' onClick={()=>{

                    let c = completed.splice(index,1);
                    setTask([...task,c]);
                    setCompleted([...completed]);
                  }}/>
              </div>
              
            
            )}
          </div>
        </div>
        
      </div>
     
    </>
  )
}
