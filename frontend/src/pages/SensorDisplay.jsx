import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Stack,
  Select,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";

function SensorDisplay() {
  const [sensorData, setSensorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // State to reflect the LED status of the last row
  const [isLedOn, setIsLedOn] = useState(false);
  // State to reflect the Buzzer status of the last row
  const [isBuzzerOn, setIsBuzzerOn] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost/DB/db.php")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSensorData(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setSensorData([]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Update switch state based on the last row's led_status and buzzer_status
  useEffect(() => {
    if (sensorData.length > 0) {
      const lastRow = sensorData[sensorData.length - 1]; // Get the last row
      setIsLedOn(lastRow.led_status === "ON");
      setIsBuzzerOn(lastRow.buzzer_status === "ON");
    }
  }, [sensorData]); // This runs every time sensorData is updated

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentData =
    itemsPerPage === -1
      ? sensorData
      : sensorData.slice(firstItemIndex, lastItemIndex);

  const totalPages =
    itemsPerPage === -1 ? 1 : Math.ceil(sensorData.length / itemsPerPage);

  return (
    <Stack spacing={6} align="center" p={4}>
      <Select
        width="150px"
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setCurrentPage(1); // Reset to first page
        }}
      >
        {[5, 10, 30, 50, -1].map((size) => (
          <option key={size} value={size}>
            {size === -1 ? "All" : `${size} per page`}
          </option>
        ))}
      </Select>

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Display Sensor MPU 6050</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>AngleX</Th>
              <Th>AngleY</Th>
              <Th>Buzzer Status</Th>
              <Th>Led Status</Th>
              <Th>Mpu Status</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <Tr key={row.Id}>
                  <Td>{row.Id}</Td>
                  <Td>{row.angleX}</Td>
                  <Td>{row.angleY}</Td>
                  <Td>{row.buzzer_status}</Td>
                  <Td>{row.led_status}</Td>
                  <Td>{row.mpu_status}</Td>
                  <Td>{row.Timestamp}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="7" style={{ textAlign: "center" }}>
                  No data available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={4}>
        <Button
          isDisabled={currentPage === 1 || itemsPerPage === -1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <Button
          isDisabled={
            currentPage === totalPages ||
            totalPages === 0 ||
            itemsPerPage === -1
          }
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </Button>
      </Stack>

      {/* Switch for LED placed outside the table */}
      <Stack>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="Lampu Led">Lampu Led</FormLabel>
          <Switch
            id="Lampu Led"
            isChecked={isLedOn}  // This reflects the state based on the last row's led_status
            isDisabled={true}    // Makes the switch read-only
          />
        </FormControl>
      </Stack>

      {/* Switch for Buzzer placed outside the table */}
      <Stack>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="Buzzer">Buzzer</FormLabel>
          <Switch
            id="Buzzer"
            isChecked={isBuzzerOn}  // This reflects the state based on the last row's buzzer_status
            isDisabled={true}       // Makes the switch read-only
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default SensorDisplay;
