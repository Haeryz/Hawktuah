import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
  Progress,
} from "@chakra-ui/react";
import { useMotionStore } from "../store/motion"; // Adjust the path accordingly

function ValueCard() {
  const { motions } = useMotionStore();

  // Get the latest motion data
  const latestMotion = motions.length > 0 ? motions[motions.length - 1] : null;

  // Calculate percentages for display
  const pirPercentage = latestMotion ? (latestMotion.pir / 1000) * 100 : 0; // Assuming max PIR value is 1000
  const soundPercentage = latestMotion ? (latestMotion.sound / 2000) * 100 : 0; // Assuming max sound value is 2000
  const buzzerPercentage = latestMotion ? (latestMotion.buzzer / 100) * 100 : 0; // Assuming max buzzer value is 100
  const ledPercentage = latestMotion ? (latestMotion.led / 100) * 100 : 0; // Assuming max LED value is 100

  const cardStyles = [
    { bg: "teal.500", color: "white" },
    { bg: "blue.500", color: "white" },
    { bg: "purple.500", color: "white" },
    { bg: "yellow.500", color: "white" },
  ];

  const renderCard = (label, value, percentage, color, index) => (
    <Box
      bg={cardStyles[index].bg}
      color={cardStyles[index].color}
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      m={2}
      flex="1"
      minW="200px"
    >
      <Flex direction="column" align="center">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {label}
        </Text>
        <CircularProgress value={percentage} color={color} size="100px" mb={4}>
          <CircularProgressLabel>{value}</CircularProgressLabel>
        </CircularProgress>
        <Progress
          hasStripe
          isAnimated
          value={percentage}
          colorScheme={color.split(".")[0]}
          size="sm"
          mt={2}
        />
      </Flex>
    </Box>
  );

  return (
    <Flex wrap="wrap" justifyContent="center" spacing={4} p={4}>
      {renderCard(
        "PIR",
        latestMotion ? latestMotion.pir : "N/A",
        pirPercentage,
        "green.400",
        0
      )}
      {renderCard(
        "Sound",
        latestMotion ? latestMotion.sound : "N/A",
        soundPercentage,
        "blue.400",
        1
      )}
      {renderCard(
        "Buzzer",
        latestMotion ? latestMotion.buzzer : "N/A",
        buzzerPercentage,
        "purple.400",
        2
      )}
      {renderCard(
        "LED",
        latestMotion ? latestMotion.led : "N/A",
        ledPercentage,
        "yellow.400",
        3
      )}
    </Flex>
  );
}

export default ValueCard;
