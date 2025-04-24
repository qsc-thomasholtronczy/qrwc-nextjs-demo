"use client";

import { useState, useEffect } from 'react';
import { useQsys } from '@/context/QsysProvider';

// Create interface for the props of the useImagePreview hook
interface UseImagePreviewProps {
  componentName: string; // The name of the Q-Sys component to control
  controlName: string; //
}

export const useImagePreview = ({ componentName, controlName }: UseImagePreviewProps) => {
  const { components } = useQsys(); // Get the components from the Qsys context
  const [imageData, setImageData] = useState<string>(""); // State to hold the image data
  useEffect(() => {
    // Check if the component and control exist in the components object
    if (!components?.[componentName]?.Controls[controlName]) {
      console.error(`Component or control not found: ${componentName}.${controlName}`);
      return;
    }

    // Function to fetch the image data from the Q-SYS component
    // This function parses the IconData from the control and sets it to the imageData state
    const fetchImageData = () => {
      const control = components[componentName].Controls[controlName];  // Get the control object from the components
      try {
        const parsedValue = JSON.parse(control.String); // Parse the IconData from the control's String property
        setImageData(parsedValue.IconData); // Set the imageData state to the IconData
      } catch (error) {
        console.error("Failed to parse IconData:", error);
        setImageData("");
      }
    };

    fetchImageData();

    // Set up an interval to fetch the image data every 1000ms (1 second)
    const interval = setInterval(fetchImageData, 1000);

    return () => clearInterval(interval);
  }, [components, componentName, controlName]);

  return { imageData };
};