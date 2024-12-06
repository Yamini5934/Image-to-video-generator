
import { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
// import './Imgae.css';
import './App.css';

const ffmpeg = new FFmpeg({
  log: true,
  corePath: "../public/js/ffmpeg-core.js",
});

const App = () => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...files]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imageUrls]);
  };

  const readFileAsArrayBuffer = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });

  const convertToVideo = async (event) => {
    console.log("convert video called")
    event.preventDefault();
    setIsProcessing(true);

    try {
      await FFmpeg.load();
      setIsProcessing(true);

      // Write images to FFmpeg FS
      for (let i = 0; i < images.length; i++) {
        const fileBuffer = await readFileAsArrayBuffer(images[i]);
        ffmpeg.FS("writeFile", `image${i + 1}.png`, new Uint8Array(fileBuffer));
      }

      // Run FFmpeg command
      await ffmpeg.run(
        "-framerate",
        "1",
        "-i",
        "image%d.png", // FFmpeg uses this for sequentially numbered files
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "output.mp4"
      );

      // Retrieve the output video file
      const data = ffmpeg.FS("readFile", "output.mp4");
      const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error("Error processing:", error);
      alert("An error occurred while converting images to video.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <h1>Images <span>To</span> Video</h1>
      <h3>Image Uploader</h3>
      <form onSubmit={convertToVideo}>
        <label htmlFor="file-upload" className="imageUpload"></label>
        <input
          type="file"
          id="file-upload"
          
          multiple
          accept="image/*"
          onChange={handleImageChange}
          disabled={isProcessing}
        />

        <div className="preview-container" style={{
               display:'flex' , flexWrap:'wrap' , 
               gap:'10px' , 
               margin:'30px'
               }}>
          {imagePreviews.map((imageUrl, index) => (
            <div key={index} className="imagePreview">
              <img src={imageUrl} alt={`Preview ${index}`} />
            </div>
          ))}
        </div>

        <button type="submit" disabled={isProcessing || images.length === 0} className="ConvertButton">
          {isProcessing ? "Processing..." : "Convert to Video"}
        </button>

        {videoUrl && (
          <div>
            <h2>Generated Video</h2>
            <video controls src={videoUrl} style={{ width: "500px" }} />
            <a href={videoUrl} download="output.mp4">
              Download Video
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
