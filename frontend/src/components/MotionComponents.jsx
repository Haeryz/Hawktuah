import { useEffect, useRef, useState } from "react";
import {
  Box,
  Spinner,
  Switch,
  FormLabel,
  FormControl,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useMotionStore } from "../store/motion";
import { useSystemStateStore } from "../store/systemState";

function MotionComponents() {
  const { motions} = useMotionStore();
  const { systemState, createSystemState, setSystemState } = useSystemStateStore();
  const [isSystemOn, setIsSystemOn] = useState(systemState ?? false);
  const canvasRef = useRef(null);
  const padding = 50;
  const numYTicks = 5;


  // Function to draw the chart
  const drawChart = () => {
    if (!canvasRef.current || motions.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Take only the last 10 entries
    const lastTenMotions = motions.slice(-10);

    // Find min and max sound values from the last 10 entries
    const soundValues = lastTenMotions.map((motion) => motion.sound);
    const minSound = Math.min(...soundValues);
    const maxSound = Math.max(...soundValues);

    // Normalize data
    const normalizedData = lastTenMotions.map((motion, index) => ({
      x: index, // For simplicity, we use index as x, but you could use time difference
      y:
        ((motion.sound - minSound) / (maxSound - minSound)) *
        (height - 2 * padding),
    }));

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart title
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Sound Levels Over Time", width / 2 - 80, padding / 2);

    // Draw gridlines
    drawGridlines(
      ctx,
      width,
      height,
      padding,
      numYTicks,
      minSound,
      maxSound,
      normalizedData
    );

    // Draw the line
    ctx.strokeStyle = "rgba(75,192,192,1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - normalizedData[0].y);

    normalizedData.forEach((point) => {
      const x =
        padding +
        (point.x * (width - 2 * padding)) / (normalizedData.length - 1);
      const y = height - padding - point.y;
      ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Draw axes and labels
    drawAxes(ctx, width, height, padding, numYTicks, minSound, maxSound);
  };

  // Gridlines function
  const drawGridlines = (
    ctx,
    width,
    height,
    padding,
    numYTicks,
    minSound,
    maxSound,
    normalizedData
  ) => {
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;

    // Horizontal gridlines
    const step = (maxSound - minSound) / (numYTicks - 1);
    for (let i = 0; i < numYTicks; i++) {
      const tickValue = minSound + step * i;
      const yPos =
        height -
        padding -
        ((tickValue - minSound) / (maxSound - minSound)) *
          (height - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(padding, yPos);
      ctx.lineTo(width - padding, yPos);
      ctx.stroke();
    }

    // Vertical gridlines
    const stepX = (width - 2 * padding) / (normalizedData.length - 1);
    for (let i = 0; i < normalizedData.length; i++) {
      const xPos = padding + stepX * i;
      ctx.beginPath();
      ctx.moveTo(xPos, padding);
      ctx.lineTo(xPos, height - padding);
      ctx.stroke();
    }
  };

  // Axes function
  const drawAxes = (
    ctx,
    width,
    height,
    padding,
    numYTicks,
    minSound,
    maxSound
  ) => {
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.save();
    ctx.translate(padding / 3, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Sound", 0, 0);
    ctx.restore();

    const step = (maxSound - minSound) / (numYTicks - 1);
    for (let i = 0; i < numYTicks; i++) {
      const tickValue = minSound + step * i;
      const yPos =
        height -
        padding -
        ((tickValue - minSound) / (maxSound - minSound)) *
          (height - 2 * padding);
      ctx.fillText(tickValue.toFixed(2), padding / 4, yPos);
    }

    ctx.fillText("Time (entries)", width / 2, height - padding / 3);
  };

  // Redraw chart whenever motions changes
  useEffect(() => {
    drawChart();
  }, [motions]);

  // Switch toggle handler
  const handleToggle = async () => {
    setIsSystemOn(!isSystemOn);
    await createSystemState();
    setSystemState(!isSystemOn);
  };

  return (
    <Box padding={5}>

      {motions.length === 0 ? (
        <Spinner size="xl" /> // Show loading spinner if no motions data
      ) : (
        <Box marginBottom={5}>
          {/* Display the Line Chart using Canvas */}
          <canvas ref={canvasRef} width="600" height="400" />
          {/* Display only the last keterangan */}
        </Box>
      )}

      {/* Enhanced UI */}
      <Box padding={5} bg="gray.50" borderRadius="lg" shadow="md">
        {/* Enhanced IoT System State */}
        <Box
          padding={4}
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
          marginBottom={4}
          shadow="sm"
        >
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormLabel htmlFor="systemState" fontWeight="bold" fontSize="lg">
              IoT System State
            </FormLabel>
            <Switch
              id="systemState"
              isChecked={isSystemOn}
              onChange={handleToggle}
              size="lg"
              colorScheme="teal"
            />
          </FormControl>
          <Box textAlign="center" marginTop={4}>
            <CircularProgress
              value={isSystemOn ? 100 : 0}
              color={isSystemOn ? "green.400" : "red.400"}
              size="120px"
            >
              <CircularProgressLabel>
                {isSystemOn ? "ON" : "OFF"}
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MotionComponents;
