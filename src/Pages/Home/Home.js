import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function Home({ match }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawings, setDrawings] = useState({ lines: [], shapes: [], textAnnotations: [] });
  const [drawMode, setDrawMode] = useState('line'); // 'line', 'shape', or 'text'


  const startDrawing = (e) => {
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (drawMode === 'line') {
      // Draw a line
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 50, y + 50); // Example line
      ctx.stroke();
    } else if (drawMode === 'shape') {
      // Draw a rectangle
      ctx.fillStyle = 'red';
      ctx.fillRect(x, y, 100, 100);
    } else if (drawMode === 'text') {
      // Add text annotation
      ctx.font = '20px Arial';
      ctx.fillText('Sample Text', x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveDrawing = () => {
    // Save the drawing to the database
    const dataURL = canvasRef.current.toDataURL();
    const drawingData = {
      title: 'New Drawing',
      lines: drawings.lines,
      shapes: drawings.shapes,
      textAnnotations: drawings.textAnnotations,
    };
    console.log(drawingData)
  };

  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <h2 className=''>Whiteboard</h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      />
      <div className='flex gap-4 mt-10'>
        <button className='bg-black text-[#ffffff] w-[150px] py-2' onClick={() => setDrawMode('line')}>Line</button>
        <button className='bg-black text-[#ffffff] w-[150px] py-2' onClick={() => setDrawMode('shape')}>Shape</button>
        <button className='bg-black text-[#ffffff] w-[150px] py-2' onClick={() => window.location.reload()}>Reset</button>
        <button className='bg-black text-[#ffffff] w-[150px] py-2' onClick={saveDrawing}>Save Drawing</button>
      </div>
    </div>
  );
}

export default Home;
