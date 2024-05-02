import axios from 'axios';

// Replace `APPOINTMENT_SERVICE_URL` with the actual URL of your appointments service
const APPOINTMENT_SERVICE_URL = window.configs.apiUrl;

export const bookAppointment = async (appointmentDetails) => {
  try {
    const response = await fetch(`${APPOINTMENT_SERVICE_URL}/create-appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentDetails),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUpcomingAppointments = async (email) => {

  try {
    const response = await axios.get(`${APPOINTMENT_SERVICE_URL}/appointments`, {
      params: {
        email: email,
        upcoming: 'true', // Assuming your backend supports this query parameter for filtering upcoming appointments
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    throw error; // Rethrowing the error so it can be caught and handled in the component
  }
};

export const fetchAppointmentTypes = async () => {
  try {
      const response = await axios.get(`${APPOINTMENT_SERVICE_URL}/appointment-types`);
      return response.data; // Returns the list of appointment types
  } catch (error) {
      console.error('Error fetching appointment types:', error);
      throw error; // Rethrowing the error for handling in the component
  }
};