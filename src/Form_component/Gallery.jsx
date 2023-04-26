
import React, { useState, useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import './Basic_info.css'
import { AiFillFastBackward } from "react-icons/ai";
import axios from "axios"
import { useAuthData } from '../DataProvider/AccountProvider';
import { useData } from "./FormContext";
// import { async } from "@firebase/util";



function Gallery() {
  const [files, setFiles] = useState([]);
  const [inputFile, setinputFile] = useState(null);
  const [error, seterror] = useState("");
  const { details } = useAuthData();
  const { formData, setformData } = useData();
  const { Thumbnail, Images } = formData;
  const [totalFiles,settotalFiles]=useState([]);
  const convert = new FormData();
  const set_input_image = async (e) => {
    const file = (e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setinputFile(reader.result)
      setformData(prev=>({...prev,Thumbnail:URL.createObjectURL(file)}))
      
    }
  }

  const onDrop = useCallback((acceptedFiles, rejected) => {
    // console.log("Rejected", rejected, files.length);
    if (acceptedFiles.length > 0 && files.length < 4) {
      setFiles(prevFiles => [
        ...prevFiles,
        ...acceptedFiles.map(File => {
          return Object.assign(File, { previw: URL.createObjectURL(File) })
        })
      ])
      seterror("");
    }
    if (files.length + acceptedFiles.length > 4) {
      seterror("Your are allowed to upload at max 4 Images");
      return;
    }
    else if (files.length + rejected.length > 4) {
      seterror("Your are allowed to upload at max 4 Images");
      return;
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 4 - files.length,
    onDrop
  })
  const upload_image = async (filed) => {
    // console.log(filed)
    const formData = new FormData();
    formData.append("file", filed);
    formData.append("upload_preset", "Listing_images");
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dxbo7f16e/image/upload',
        {
          method: 'POST',
          body: formData,
          mode: 'cors',
        }
      );
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const data = await response.json();
      console.log(data);
      return data.secure_url;

    } catch (error) {
      console.error(error);
    }
  }
  const upload_array=async(files)=>{
    files.map(async(file,index)=>{

      try{
      const link= await upload_image(file);
      // totalFiles.push(link);
      // console.log(link);
      settotalFiles(prev=>[...prev,link]);
      console.log(totalFiles)
      }catch(e){console.log(e)}
    })
  }

  React.useEffect(() => {

    if(inputFile!==null){
      const upload=async(inputFile)=>{
        try{
          const link=await upload_image(inputFile)
          // console.log(link);
        setformData(prev=>({...prev,Thumbnail:link}))
        }catch(e){console.log(e)}
      }
      upload(inputFile);
    }
    if(files.length>0)
    {
      upload_array(files);
      setformData(prev=>({...prev,Images:totalFiles}))
      // console.log(totalFiles);
    }
  }, [files,inputFile])
React.useEffect(() => {
  setformData(prev=>({...prev,Images:totalFiles}))
  console.log(totalFiles)
}, [totalFiles])






  return (
    <div className="gallery-outer">
      <div className="gallery-main">
        <section className="input_upload">
          <label>Property Thumbnail</label>
          <div className="input-div">
            <input
              type="file"
              onChange={set_input_image} />
            <span>Browse</span>
          </div>
          <div className={inputFile && "image-li"}>
            {inputFile && <img className="image" src={inputFile} />}
          </div>
        </section>
        <section className="dropzone-outer">
          <label> Property Gallery</label>
          {error && <small style={{ color: "red" }}>{error}</small>}
          <div className="dropzone-main" {...getRootProps({ disabled: files.length >= 4 })}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag and  drop upto 4 files here, or click to select files</p>
            }
          </div>
          <small>* You can upload upto 4 Images</small><br />
          <small>* Listing images should be atleast 620x480 in dimensions</small>

          <section className="display-image">
            <ul>
              {
                files.map((file, index) => (
                  <li className="image-li" key={index}>
                    <img src={file.previw} key={index} width="50px" height="50px" />
                  </li>
                ))
              }
            </ul>

          </section>
        </section>

      </div>





    </div>
  );
}

// export default ImageDropzone;


export default Gallery