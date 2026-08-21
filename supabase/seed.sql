-- Insert Room Types
INSERT INTO room_types (id, name, description, base_price, capacity, amenities) VALUES
('11111111-1111-1111-1111-111111111111', 'Standard Room', 'A cozy room for two', 500000.00, 2, '["wifi", "tv", "air_conditioning"]'::jsonb),
('22222222-2222-2222-2222-222222222222', 'Deluxe Room', 'Spacious room with a city view', 850000.00, 2, '["wifi", "tv", "air_conditioning", "minibar", "city_view"]'::jsonb),
('33333333-3333-3333-3333-333333333333', 'Suite', 'Luxury suite with a living area', 1500000.00, 4, '["wifi", "tv", "air_conditioning", "minibar", "ocean_view", "bathtub"]'::jsonb);

-- Insert Rooms
INSERT INTO rooms (id, room_number, room_type_id, status, floor) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '101', '11111111-1111-1111-1111-111111111111', 'available', '1'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '102', '11111111-1111-1111-1111-111111111111', 'cleaning', '1'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '201', '22222222-2222-2222-2222-222222222222', 'occupied', '2'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '301', '33333333-3333-3333-3333-333333333333', 'available', '3');

-- Insert Guests
INSERT INTO guests (id, first_name, last_name, email, phone, identity_number) VALUES
('44444444-4444-4444-4444-444444444444', 'John', 'Doe', 'john.doe@example.com', '08123456789', 'ID123456789'),
('55555555-5555-5555-5555-555555555555', 'Jane', 'Smith', 'jane.smith@example.com', '08198765432', 'ID987654321');

-- Insert Promotions
INSERT INTO promotions (id, code, description, discount_percentage, start_date, end_date) VALUES
('66666666-6666-6666-6666-666666666666', 'SUMMER2026', 'Summer Holiday Discount', 10.00, '2026-06-01', '2026-08-31'),
('77777777-7777-7777-7777-777777777777', 'WELCOME', 'New User Discount', 5.00, '2026-01-01', '2026-12-31');

-- Insert Bookings
INSERT INTO bookings (id, booking_code, guest_id, check_in_date, check_out_date, status, total_amount) VALUES
('88888888-8888-8888-8888-888888888888', 'BKG-001', '44444444-4444-4444-4444-444444444444', '2026-08-20', '2026-08-25', 'checked_in', 1700000.00),
('99999999-9999-9999-9999-999999999999', 'BKG-002', '55555555-5555-5555-5555-555555555555', '2026-09-10', '2026-09-12', 'confirmed', 1000000.00);

-- Insert Booking Items
INSERT INTO booking_items (booking_id, room_id, price_per_night) VALUES
('88888888-8888-8888-8888-888888888888', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 850000.00),
('99999999-9999-9999-9999-999999999999', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 500000.00);

-- Insert Payments
INSERT INTO payments (booking_id, amount, payment_method, status) VALUES
('88888888-8888-8888-8888-888888888888', 1700000.00, 'credit_card', 'completed');
