import io from "socket.io-client";
import {useEffect, useState} from "react"
import styles from "../styles/main.module.css"


export default function Home() {
  const socket = io.connect("http://localhost:8000");

  const [data,setData] = useState([]);
  const [money,setMoney] = useState(0)

useEffect(()=>{
  getdata()
},[])
  const getdata = ()=>{
    socket.on("currency",(payload)=>{
      setData(payload.data);
      setMoney(payload.userdata[0].money)
    })
  }
  console.log(data);
  console.log(money)
  return (
    <div className={styles.main}>
        <h1>socket</h1>
        <table>
           <thead>
             <tr className={styles.tr}>
               <th>Code</th>
               <th>Quentity</th>
               <th>Currency</th>
               <th>Country</th>
               <th>Order</th>
               <th>Order</th>
             </tr>
           </thead>
           <tbody>
             {data.map((el)=>(
               <tr className={styles.tr}>
                 <td>{el.name}</td>
                 <td>{el.qty}</td>
                 <td>{el.price}</td>
                 <td>{el.country}</td>
                 <td>Buy</td>
                 <td>Sell</td>
               </tr>
             ))}
           </tbody>
        </table>
    </div>
  )
}
