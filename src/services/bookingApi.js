// Mock API service for booking functionality

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for available times based on different dates
const mockAvailableTimes = {
  // Weekend times (Friday, Saturday, Sunday)
  weekend: [
    { time: "17:00", available: true },
    { time: "17:30", available: true },
    { time: "18:00", available: true },
    { time: "18:30", available: true },
    { time: "19:00", available: true },
    { time: "19:30", available: true },
    { time: "20:00", available: true },
    { time: "20:30", available: true },
    { time: "21:00", available: true },
    { time: "21:30", available: true },
    { time: "22:00", available: true }
  ],
  // Weekday times (Monday-Thursday)
  weekday: [
    { time: "17:00", available: true },
    { time: "17:30", available: true },
    { time: "18:00", available: true },
    { time: "18:30", available: true },
    { time: "19:00", available: true },
    { time: "19:30", available: true },
    { time: "20:00", available: true },
    { time: "20:30", available: true },
    { time: "21:00", available: true },
    { time: "21:30", available: false }, // Less popular time on weekdays
    { time: "22:00", available: false }  // Less popular time on weekdays
  ],
  // Special dates (holidays, etc.)
  special: [
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: true },
    { time: "18:00", available: true },
    { time: "18:30", available: true },
    { time: "19:00", available: true },
    { time: "19:30", available: true },
    { time: "20:00", available: true },
    { time: "20:30", available: true },
    { time: "21:00", available: true },
    { time: "21:30", available: true },
    { time: "22:00", available: true },
    { time: "22:30", available: true }
  ]
};

// Helper function to determine if a date is a weekend
const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

// Helper function to check if a date is a special date (holidays, etc.)
const isSpecialDate = (date) => {
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  
  // Example special dates (you can expand this)
  const specialDates = [
    { month: 12, day: 24 }, // Christmas Eve
    { month: 12, day: 25 }, // Christmas Day
    { month: 12, day: 31 }, // New Year's Eve
    { month: 1, day: 1 },   // New Year's Day
    { month: 2, day: 14 },  // Valentine's Day
    { month: 11, day: 22 }, // Thanksgiving (approximate)
  ];
  
  return specialDates.some(special => special.month === month && special.day === day);
};

// Mock API function to get available times for a specific date
export const getAvailableTimes = async (dateString) => {
  try {
    // Simulate API delay
    await delay(500);
    
    const selectedDate = new Date(dateString);
    
    // Determine which time slot to use based on the date
    let timeSlots;
    if (isSpecialDate(selectedDate)) {
      timeSlots = mockAvailableTimes.special;
    } else if (isWeekend(selectedDate)) {
      timeSlots = mockAvailableTimes.weekend;
    } else {
      timeSlots = mockAvailableTimes.weekday;
    }
    
    // Simulate some random unavailability for realism
    const randomizedSlots = timeSlots.map(slot => ({
      ...slot,
      available: slot.available && Math.random() > 0.1 // 10% chance of being unavailable
    }));
    
    return {
      success: true,
      data: {
        date: dateString,
        availableTimes: randomizedSlots.filter(slot => slot.available),
        unavailableTimes: randomizedSlots.filter(slot => !slot.available)
      }
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch available times",
      details: error.message
    };
  }
};

// Mock API function to submit a booking
export const submitBooking = async (bookingData) => {
  try {
    // Simulate API delay
    await delay(1000);
    
    // Simulate validation
    if (!bookingData.date || !bookingData.time || !bookingData.guests) {
      throw new Error("Missing required fields");
    }
    
    // Simulate successful booking
    return {
      success: true,
      data: {
        bookingId: `BK${Date.now()}`,
        confirmationNumber: Math.random().toString(36).substr(2, 8).toUpperCase(),
        ...bookingData,
        status: "confirmed",
        createdAt: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to submit booking",
      details: error.message
    };
  }
};

// Mock API function to check if a specific time is available
export const checkTimeAvailability = async (dateString, timeString) => {
  try {
    await delay(200);
    
    const selectedDate = new Date(dateString);
    let timeSlots;
    
    if (isSpecialDate(selectedDate)) {
      timeSlots = mockAvailableTimes.special;
    } else if (isWeekend(selectedDate)) {
      timeSlots = mockAvailableTimes.weekend;
    } else {
      timeSlots = mockAvailableTimes.weekday;
    }
    
    const timeSlot = timeSlots.find(slot => slot.time === timeString);
    
    if (!timeSlot) {
      return {
        success: false,
        error: "Time slot not found"
      };
    }
    
    return {
      success: true,
      data: {
        date: dateString,
        time: timeString,
        available: timeSlot.available && Math.random() > 0.1
      }
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to check time availability",
      details: error.message
    };
  }
};
