import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx"

function App() {

  const [msg,setmsg] = useState("")
  const [status,setstatus] = useState(false)
  const [emailList,setEmailList] = useState([])

  function handlemsg(evt)
  {
    setmsg(evt.target.value)
  }

  function handleFile(event)
  {
    const file = event.target.files[0]
  console.log(file)

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
    const totalemail = emailList.map(function(item){return item.A})
    console.log(totalemail)
    setEmailList(totalemail)
    
  }

  reader.readAsBinaryString(file);
  }

  function send()
  {
    setstatus(true)
    axios.post("http://localhost:5000/sendemail", { msg: msg, emailList: emailList })
    
  .then(function(data) {
    if (data.data === true) {
      alert("Email Sent Successfully");
      setstatus(false);
    } else {
      alert("Failed");
      setstatus(false);
    }
  })
  .catch(function(error) {
    console.error("Error:", error);
    alert("Network Error or Server Issue");
    setstatus(false);function send() {
      console.log("Sending message:", msg);
      console.log("Email List:", emailList);
    
      setstatus(true);
      axios.post("http://localhost:5000/sendemail", { msg: msg, emailList: emailList })
        .then(function(data) {
          if (data.data === true) {
            alert("Email Sent Successfully");
            setstatus(false);
          } else {
            alert("Failed");
            setstatus(false);
          }
        })
        .catch(function(error) {
          console.error("Error:", error);
          alert("Network Error or Server Issue");
          setstatus(false);
        });

      }})}




  return (
    <div>
      <div className="bg-red-800 text-white text-center">
        <h1 className="text-4xl font-medium px-5 py-5">Bulk Mail</h1>
      </div>
      <div className="bg-red-700 text-white text-center">
        <h1 className="text-2xl font-medium px-2 py-2">
          We help you to send bulk emails at once!
        </h1>
      </div>
      <div className="bg-red-600 text-white text-center">
        <h1 className="text-2xl font-small px-2 py-2">Drag and Drop</h1>
      </div>
      <div className="bg-red-200 flex flex-col items-center text-black px-3 py-3">
        <textarea
          onChange={handlemsg}
          value={msg}
          style={{ width: "60%" }}
          className="h-40 py-2 px-2 outline-none border border-black rounded-md"
          placeholder="Enter the email text..."
        ></textarea>
        <div>
          <input
            type="file"
            onChange={handleFile}
            className="border-4 border-dashed py-4 px-4 mt-5 mb-5"
          />
        </div>
        <p>Total Emails in the file: {emailList.length}</p>
        <button
          onClick={send}
          className="mt-2 bg-red-800 py-2 px-2 text-white font-medium rounded-md w-fit"
        >
          {status ? "Sending..." : "Send"}
        </button>
      </div>
      <div className="bg-red-300 text-white text-center p-8"></div>
      <div className="bg-red-400 text-white text-center p-8"></div>
    </div>
  );
}

export default App;
