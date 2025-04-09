"use client";

import { useState, useEffect } from 'react';
import { useQsys } from '@/context/QsysProvider';

interface UseImagePreviewProps {
  componentName: string;
  controlName: string;
}

export const useImagePreview = ({ componentName, controlName }: UseImagePreviewProps) => {
  const { components } = useQsys();
  const [imageData, setImageData] = useState<string>("");
  useEffect(() => {
    if (!components?.[componentName]?.Controls[controlName]) {
      console.error(`Component or control not found: ${componentName}.${controlName}`);
      return;
    }

    const fetchImageData = () => {
      const control = components[componentName].Controls[controlName];
      try {
        const parsedValue = JSON.parse(control.String);
        setImageData(parsedValue.IconData);
      } catch (error) {
        console.error("Failed to parse IconData:", error);
        setImageData("");
      }
    };

    fetchImageData();

    const interval = setInterval(fetchImageData, 1000);

    return () => clearInterval(interval);
  }, [components, componentName, controlName]);

  return { imageData };
};