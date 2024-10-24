import { useState } from "react"

const QrCode = () => {

 const [img,setImg]=useState(""); //ARRAY DESTRUCTION (USE STATE)=> [img,setImg]=>img=var.name(intial value),setImg=function
 const [loading,setLoading]= useState(false);
const [qrData,setQrData]=useState("dharshini");
const [qrSize,setQRSize] = useState("150");
//const [qrData,setQrData]=useState("LINK OF OUR WEBSITE")->ANOTHER WAY
 async function generateQR(){
  setLoading(true);

  try {
    const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;//TEMPLATE LITERALS
    // const url=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent{qrData}}`;-->encodeURIComponent= FUN TO ENCODE DATA
    setImg(url);

  } catch(error){
    console.error("Error generating QR code", error );
  }

  finally {
    setLoading(false);
  }
 
 }
function downloadQR() {
fetch(img).then((response)=>response.blob()).then((blob)=>{
  const link=document.createElement("a");
  link.href=URL.createObjectURL(blob)
  link.download="QRCode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}).catch((error)=>{
  console.error("Error downloading QR code",error);
})
//fetch,blob =>function,blob -> binary format data [file type (conversion)]
}

//   function generateQR(){
//     alert("Hi");
//   }
//   function downloadQR(name){
// alert("Welcome " + name);//STRING CONCATENATION
//   }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
       {loading && <p>Please wait....</p>}    {/* &&->TRUE/FALSE (CONDITIONAL RENDERING) */}
       { img && <img src={img}className="qr-code-image" /> }
      <div>
        <label htmlFor="dataInput" className="input-label">Data for QR code:</label>
       <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR code" onChange={(e)=>setQrData(e.target.value)} />{/*e/event-->event ,e.target.value-->given data to get stored */}
       <label htmlFor="sizeInput" className="input-label">Image size (e.g.,150):</label>
       <input type="text" value={qrSize} id="sizeInput" placeholder="Enter image size" onChange={(e)=>setQRSize(e.target.value)} />
      <button className="generate-button" disabled={loading} onClick={generateQR}  >Generate QR Code </button>   {/* onClick={generateQR} -> FUN.(generateQR)PASSED AS PROPS/FN.CALLING */}
       <button className="download-button" onClick={downloadQR}>Download QR Code</button>
         {/* onClick={()=>downloadQR("Siva Dharshini")} -> FUN.(downloadQR) CALLED AS ARROW FUN.(BECOZ OF PASSING DATA/VALUES)WITH VALUES */}
      </div>
        <p className="footer">Designed By <span className="footer-span">Siva Dharshini</span> </p> 
    </div>
  )
}

export default QrCode
