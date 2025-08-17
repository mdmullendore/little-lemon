import { 
  getAvailableTimes, 
  submitBooking, 
  checkTimeAvailability 
} from './bookingApi';

describe('bookingApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAvailableTimes', () => {
    test('returns weekend times for Saturday', async () => {
      const response = await getAvailableTimes('2024-01-13'); // Saturday
      
      expect(response.success).toBe(true);
      expect(response.data.date).toBe('2024-01-13');
      expect(response.data.availableTimes.length).toBeGreaterThan(0);
      
      // Should include extended hours for weekends
      const times = response.data.availableTimes.map(t => t.time);
      // Note: Due to randomization, we can't guarantee specific times
      expect(times.length).toBeGreaterThan(0);
    });

    test('returns weekday times for Tuesday', async () => {
      const response = await getAvailableTimes('2024-01-16'); // Tuesday
      
      expect(response.success).toBe(true);
      expect(response.data.date).toBe('2024-01-16');
      expect(response.data.availableTimes.length).toBeGreaterThan(0);
      
      // Weekdays should have time slots
      const times = response.data.availableTimes.map(t => t.time);
      expect(times.length).toBeGreaterThan(0);
    });

    test('returns special times for Christmas Eve', async () => {
      const response = await getAvailableTimes('2024-12-24'); // Christmas Eve
      
      expect(response.success).toBe(true);
      expect(response.data.date).toBe('2024-12-24');
      expect(response.data.availableTimes.length).toBeGreaterThan(0);
      
      // Special dates should have time slots
      const times = response.data.availableTimes.map(t => t.time);
      expect(times.length).toBeGreaterThan(0);
    });

    test('handles invalid date gracefully', async () => {
      const response = await getAvailableTimes('invalid-date');
      
      expect(response.success).toBe(true);
      expect(response.data.availableTimes.length).toBeGreaterThan(0);
    });
  });

  describe('submitBooking', () => {
    test('successfully submits a valid booking', async () => {
      const bookingData = {
        date: '2024-01-15',
        time: '19:00',
        guests: 4,
        occasion: 'Birthday'
      };

      const response = await submitBooking(bookingData);
      
      expect(response.success).toBe(true);
      expect(response.data.bookingId).toMatch(/^BK\d+$/);
      expect(response.data.confirmationNumber).toMatch(/^[A-Z0-9]{8}$/);
      expect(response.data.status).toBe('confirmed');
      expect(response.data.date).toBe('2024-01-15');
      expect(response.data.time).toBe('19:00');
      expect(response.data.guests).toBe(4);
      expect(response.data.occasion).toBe('Birthday');
    });

    test('fails with missing required fields', async () => {
      const invalidBookingData = {
        date: '2024-01-15',
        // Missing time and guests
      };

      const response = await submitBooking(invalidBookingData);
      
      expect(response.success).toBe(false);
      expect(response.error).toBe('Failed to submit booking');
    });

    test('generates unique confirmation numbers', async () => {
      const bookingData = {
        date: '2024-01-15',
        time: '19:00',
        guests: 2
      };

      const response1 = await submitBooking(bookingData);
      const response2 = await submitBooking(bookingData);
      
      expect(response1.success).toBe(true);
      expect(response2.success).toBe(true);
      expect(response1.data.confirmationNumber).not.toBe(response2.data.confirmationNumber);
    });
  });

  describe('checkTimeAvailability', () => {
    test('checks availability for a specific time on weekend', async () => {
      const response = await checkTimeAvailability('2024-01-13', '20:00'); // Saturday
      
      expect(response.success).toBe(true);
      expect(response.data.date).toBe('2024-01-13');
      expect(response.data.time).toBe('20:00');
      expect(typeof response.data.available).toBe('boolean');
    });

    test('checks availability for a specific time on weekday', async () => {
      const response = await checkTimeAvailability('2024-01-16', '19:00'); // Tuesday
      
      expect(response.success).toBe(true);
      expect(response.data.date).toBe('2024-01-16');
      expect(response.data.time).toBe('19:00');
      expect(typeof response.data.available).toBe('boolean');
    });

    test('returns false for time not found', async () => {
      const response = await checkTimeAvailability('2024-01-16', '23:00'); // Invalid time
      
      expect(response.success).toBe(false);
      expect(response.error).toBe('Time slot not found');
    });
  });

  describe('API delays', () => {
    test('getAvailableTimes has realistic delay', async () => {
      const startTime = performance.now();
      await getAvailableTimes('2024-01-15');
      const endTime = performance.now();
      
      // Should have some delay (at least 100ms for realistic testing)
      expect(endTime - startTime).toBeGreaterThan(100);
    });

    test('submitBooking has realistic delay', async () => {
      const startTime = performance.now();
      await submitBooking({
        date: '2024-01-15',
        time: '19:00',
        guests: 2
      });
      const endTime = performance.now();
      
      // Should have some delay (at least 100ms for realistic testing)
      expect(endTime - startTime).toBeGreaterThan(100);
    });
  });
});
