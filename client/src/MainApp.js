// client/src/MainApp.js
import { useState, useEffect } from "react";
import styled from 'styled-components';
import ImageUpload from "./Components/ImageUpload";
import ImagesCard from "./Components/ImagesCard";
import Loader from "./Components/Loader/Loader";
import ResultCard from "./Components/ResultCard";
import axios from 'axios';
import { Images } from "./data";

// Add this import at the top
import TumorInfo from "./Components/TumorInfo";

// ============ STYLED COMPONENTS ============

const Body = styled.div`
  display: flex; 
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 80px);
  background-color: ${({ theme }) => theme.bg};
  overflow-y: scroll;
`;

const Heading = styled.div`
  font-size: 42px;
  @media (max-width: 530px) {
    font-size: 30px
  }
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 2% 0px;
`;

const Container = styled.div`
  max-width: 100%;
  display: flex; 
  justify-content: center;
  flex-direction: row;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
  gap: 40px;
  padding: 2% 0% 6% 0%;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FlexItem = styled.div`
  width: 500px;
  @media (max-width: 530px) {
    width: 400px
  }
  @media (max-width: 430px) {
    width: 300px
  }
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
`;

const TextCenter = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const SelectedImages = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 530px) {
    grid-template-columns: auto auto;
  }
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

const Button = styled.div`
  min-height: 48px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  background: ${({ theme }) => theme.primary};
  color: white;
  margin: 3px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DownloadButton = styled.div`
  min-height: 48px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  background: #28a745;
  color: white;
  margin: 3px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 10px;

  &:hover {
    background: #218838;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.div`
  min-height: 48px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  background: #dc3545;
  color: white;
  margin: 3px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Typo = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// ============ MAIN COMPONENT ============

function MainApp() {
  const [images, setImages] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const [predictions, setPredictions] = useState();
  const [loading, setLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

  // Generate prediction
  const generatePrediction = async () => {
    setLoading(true);
    const imageData = []
    for (let i = 0; i < images.length; i++) {
      imageData.push(images[i].base64_file)
    }
    const data = { image: imageData }
    
    try {
      const res = await axios.post('http://localhost:5000/', data);
      setPredictedImage(images)
      setPredictions({ image: imageData, result: res.data.result })
      setShowPrediction(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert('Error: Make sure backend is running on port 5000');
    }
  }

  // Download PDF Report
  const handleDownloadReport = async () => {
    try {
      setDownloadingReport(true);
      
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      console.log('📄 Generating report...');
      
      // Send request to backend to generate PDF
      const response = await axios.post(
        'http://localhost:5000/generate-report',
        {
          user: userData,
          predictions: predictions
        },
        {
          responseType: 'blob' // Important for file download
        }
      );
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename
      const fileName = `Brain_Tumor_Report_${userData.name || 'Patient'}_${Date.now()}.pdf`;
      link.setAttribute('download', fileName);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Report downloaded successfully');
      alert('✅ Report downloaded successfully!');
      
    } catch (error) {
      console.error('❌ Report download error:', error);
      alert('Failed to download report. Please make sure the backend is running.');
    } finally {
      setDownloadingReport(false);
    }
  };

  // Generate new sample images
  const generateNewImages = () => {
    const newImages = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * Images.length);
      newImages.push({
        base64_file: Images[randomIndex],
        file_name: `Sample ${i + 1}`,
      });
    }
    setImages(newImages);
    setShowPrediction(false);
    setPredictions(null);
    setPredictedImage(null);
  };

  // Clear predictions
  const clearPredictions = () => {
    setShowPrediction(false);
    setPredictions(null);
    setPredictedImage(null);
  };

  useEffect(() => {
    generateNewImages();
  }, []);

  return (
    <Body>
      <Heading>Brain Tumor Detector 🧠</Heading>
      
    {/* Add Tumor Information Section */}
    <div style={{ maxWidth: '1000px', width: '90%' }}>
      <TumorInfo />
    </div>
      {loading ?
        <Centered>
          <Loader />
        </Centered>
        :
        <Container>
          <FlexItem>
            <ImageUpload images={images} setImages={setImages} />
            <TextCenter>Or try with sample data</TextCenter>
            <SelectedImages>
              {images && images.map((image, index) => {
                return (
                  <ImagesCard
                    key={index}
                    image={image}
                  />
                );
              })}
            </SelectedImages>
            <Button onClick={() => generateNewImages()}>Get Sample Images</Button>
            {images &&
              <Button onClick={() => { generatePrediction() }}>PREDICT</Button>}
          </FlexItem>
          
          {showPrediction && predictions && predictedImage &&
            <FlexItem style={{ gap: '22px' }}>
              <Typo>Our Predictions</Typo>
              <ResultWrapper>
                {predictedImage.map((image, index) => {
                  return (
                    <ResultCard
                      key={index}
                      image={image}
                      prediction={predictions.result[index]}
                    />
                  );
                })}
              </ResultWrapper>
              
              {/* Download Report Button */}
              <DownloadButton 
                onClick={handleDownloadReport}
                disabled={downloadingReport}
              >
                {downloadingReport ? (
                  <>
                    <span>⏳ Generating Report...</span>
                  </>
                ) : (
                  <>
                    <span>📄</span>
                    <span>Download PDF Report</span>
                  </>
                )}
              </DownloadButton>
              
              {/* Clear Results Button */}
              <ClearButton onClick={clearPredictions}>
                🗑️ Clear Results
              </ClearButton>
            </FlexItem>
          }
        </Container>
      }
    </Body>
  );
}

export default MainApp;