import { useEffect, useRef, useState } from "react";
import { Box, Spinner, Switch, FormLabel, FormControl } from "@chakra-ui/react";
import { useMotionStore } from "../store/motion";
import { useSystemStateStore } from "../store/systemState";

function MotionComponents() {
  const { motions, fetchMotions } = useMotionStore();
  const { systemState, createSystemState, setSystemState } = useSystemStateStore();
  const [isSystemOn, setIsSystemOn] = useState(systemState ?? false);
  const canvasRef = useRef(null);
  const padding = 50;
  const numYTicks = 5;
  const [lastKeterangan, setLastKeterangan] = useState('');

  // Fetch motions data and set up polling for new data
  useEffect(() => {
    const fetchAndUpdate = async () => {
      await fetchMotions();
      if (motions.length > 0) {
        setLastKeterangan(motions[motions.length - 1].keterangan);
      }
    };

    fetchAndUpdate(); // Fetch and update immediately

    // Set up polling to fetch new data every 3 seconds
    const interval = setInterval(fetchAndUpdate, 3000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [fetchMotions, motions]);

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
      x: (new Date(motion.createdAt).getTime() - new Date(recentMotions[0].createdAt).getTime()) / 1000, // Time difference in seconds
      y: ((motion.sound - minSound) / (maxSound - minSound)) * (height - 2 * padding), // Normalize y values
    }));

    // Clear canvas before redrawing
    ctx.clearRect(0, 0, width, height);

    // Set up the chart title
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Sound Levels Over Time", width / 2 - 80, padding / 2);

    // Draw gridlines
    drawGridlines(ctx, width, height, padding, numYTicks, minSound, maxSound, normalizedData);

    // Draw the line for each data point
    ctx.strokeStyle = "rgba(75,192,192,1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - normalizedData[0].y);

    normalizedData.forEach((point) => {
      const x = padding + (point.x * (width - 2 * padding)) / normalizedData[normalizedData.length - 1].x; // Scale x-axis to fit
      const y = height - padding - point.y; // y-axis
      ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Draw the axes labels and ticks
    drawAxes(ctx, width, height, padding, numYTicks, minSound, maxSound, normalizedData);
  };

  // Function to draw gridlines on the chart
  const drawGridlines = (ctx, width, height, padding, numYTicks, minSound, maxSound, normalizedData) => {
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;

    // Draw horizontal gridlines
    const step = (maxSound - minSound) / (numYTicks - 1);
    for (let i = 0; i < numYTicks; i++) {
      const tickValue = minSound + step * i;
      const yPos = height - padding - ((tickValue - minSound) / (maxSound - minSound)) * (height - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(padding, yPos);
      ctx.lineTo(width - padding, yPos);
      ctx.stroke();
    }

    // Draw vertical gridlines
    const stepX = (width - 2 * padding) / (normalizedData.length - 1);
    for (let i = 0; i < normalizedData.length; i++) {
      const xPos = padding + stepX * i;
      ctx.beginPath();
      ctx.moveTo(xPos, padding);
      ctx.lineTo(xPos, height - padding);
      ctx.stroke();
    }
  };

  // Function to draw axes and labels on the chart
  const drawAxes = (ctx, width, height, padding, numYTicks, minSound, maxSound) => {
    // Y-axis
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.save();
    ctx.translate(padding / 3, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Sound", 0, 0); // Y-axis label
    ctx.restore();

    // Y-axis ticks
    const step = (maxSound - minSound) / (numYTicks - 1);
    for (let i = 0; i < numYTicks; i++) {
      const tickValue = minSound + step * i;
      const yPos = height - padding - ((tickValue - minSound) / (maxSound - minSound)) * (height - 2 * padding);
      ctx.fillText(tickValue.toFixed(2), padding / 4, yPos); // Draw tick value
    }

    // X-axis
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText("Time (seconds)", width / 2, height - padding / 3);
  };

  // Draw the chart after the component mounts or after the data changes
  useEffect(() => {
    drawChart();
  }, [motions]);

  // Handle switch toggle
  const handleToggle = async () => {
    setIsSystemOn(!isSystemOn); // Update local state
    await createSystemState(); // Call the action to toggle system state in backend
    setSystemState(!isSystemOn); // Update Zustand store with the new state
  };

  return (
    <Box padding={5}>
      <FormControl display="flex" alignItems="center" marginBottom={4}>
        <FormLabel htmlFor="systemState" mb="0">
          IoT System State
        </FormLabel>
        <Switch
          id="systemState"
          isChecked={isSystemOn}
          onChange={handleToggle}
          colorScheme="teal"
        />
      </FormControl>

      {motions.length === 0 ? (
        <Spinner size="xl" /> // Show loading spinner if no motions data
      ) : (
        <Box marginBottom={5}>
          {/* Display the Line Chart using Canvas */}
          <canvas ref={canvasRef} width="600" height="400" />
          {/* Display only the last keterangan */}
          <Box>
            <strong>Latest Keterangan:</strong> {lastKeterangan}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MotionComponents;