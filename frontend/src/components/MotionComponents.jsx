import { useEffect, useRef } from "react";
import { useMotionStore } from "./../store/motion"; // Assuming Zustand store is in 'store.js'
import { Box, Spinner } from "@chakra-ui/react";

function MotionComponents() {
  const { motions, fetchMotions } = useMotionStore();
  const canvasRef = useRef(null); // To access the canvas element
  const padding = 50; // Padding for the chart
  const numYTicks = 5; // Number of ticks for the Y-axis

  useEffect(() => {
    fetchMotions(); // Fetch motions data when the component mounts
  }, [fetchMotions]);

  // Function to draw the chart manually
  const drawChart = () => {
    if (!canvasRef.current || motions.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Exclude the first 30 data points to prioritize the newest data
    const recentMotions = motions.slice(Math.max(motions.length - 30, 0));

    // Find the min and max of sound values to normalize the data
    const soundValues = recentMotions.map((motion) => motion.sound);
    const minSound = Math.min(...soundValues);
    const maxSound = Math.max(...soundValues);

    // Normalize data to fit in canvas dimensions
    const normalizedData = recentMotions.map((motion) => ({
      x:
        (new Date(motion.createdAt).getTime() -
          new Date(recentMotions[0].createdAt).getTime()) /
        1000, // Time difference in seconds
      y:
        ((motion.sound - minSound) / (maxSound - minSound)) *
        (height - 2 * padding), // Normalize y values
    }));

    // Clear canvas before redrawing
    ctx.clearRect(0, 0, width, height);

    // Set up drawing styles
    ctx.strokeStyle = "rgba(75,192,192,1)";
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Move to the first data point
    ctx.moveTo(padding, height - padding - normalizedData[0].y);

    // Draw the line for each data point
    normalizedData.forEach((point) => {
      const x =
        padding +
        (point.x * (width - 2 * padding)) /
          normalizedData[normalizedData.length - 1].x; // Scale x-axis to fit
      const y = height - padding - point.y; // y-axis
      ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Add y-axis label (Sound)
    ctx.save();
    ctx.translate(padding / 3, height / 2); // Rotate the Y label to be vertical
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText("Sound", 0, 0); // Y-axis label
    ctx.restore();

    // Add y-axis ticks (for sound values)
    const step = (maxSound - minSound) / (numYTicks - 1); // Calculate the step size
    for (let i = 0; i < numYTicks; i++) {
      const tickValue = minSound + step * i; // Calculate tick value
      const yPos =
        height -
        padding -
        ((tickValue - minSound) / (maxSound - minSound)) *
          (height - 2 * padding);
      ctx.fillText(tickValue.toFixed(2), padding / 4, yPos); // Draw tick value
    }
  };

  // Draw the chart after the component mounts or after the data changes
  useEffect(() => {
    drawChart();
  }, [motions]);

  return (
    <Box padding={5}>
      {motions.length === 0 ? (
        <Spinner size="xl" /> // Show loading spinner if no motions data
      ) : (
        <>
          {/* Display the Line Chart using Canvas */}
          <Box marginBottom={5}>
            <canvas ref={canvasRef} width="600" height="400" />
          </Box>
        </>
      )}
    </Box>
  );
}

export default MotionComponents;
