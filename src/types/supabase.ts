export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string | null
          role: 'owner' | 'manager' | 'receptionist' | 'housekeeping' | 'finance' | 'marketing'
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name?: string | null
          role?: 'owner' | 'manager' | 'receptionist' | 'housekeeping' | 'finance' | 'marketing'
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string | null
          role?: 'owner' | 'manager' | 'receptionist' | 'housekeeping' | 'finance' | 'marketing'
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      room_types: {
        Row: {
          id: string
          name: string
          description: string | null
          base_price: number
          capacity: number
          amenities: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          base_price: number
          capacity?: number
          amenities?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          base_price?: number
          capacity?: number
          amenities?: Json
          created_at?: string
          updated_at?: string
        }
      }
      rooms: {
        Row: {
          id: string
          room_number: string
          room_type_id: string
          status: 'available' | 'occupied' | 'cleaning' | 'maintenance'
          floor: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          room_number: string
          room_type_id: string
          status?: 'available' | 'occupied' | 'cleaning' | 'maintenance'
          floor?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          room_number?: string
          room_type_id?: string
          status?: 'available' | 'occupied' | 'cleaning' | 'maintenance'
          floor?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          identity_number: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          identity_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          identity_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      promotions: {
        Row: {
          id: string
          code: string
          description: string | null
          discount_percentage: number
          start_date: string
          end_date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          description?: string | null
          discount_percentage: number
          start_date: string
          end_date: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          description?: string | null
          discount_percentage?: number
          start_date?: string
          end_date?: string
          is_active?: boolean
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_code: string
          guest_id: string
          promotion_id: string | null
          check_in_date: string
          check_out_date: string
          status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show'
          total_amount: number
          special_requests: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_code: string
          guest_id: string
          promotion_id?: string | null
          check_in_date: string
          check_out_date: string
          status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show'
          total_amount?: number
          special_requests?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_code?: string
          guest_id?: string
          promotion_id?: string | null
          check_in_date?: string
          check_out_date?: string
          status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show'
          total_amount?: number
          special_requests?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      booking_items: {
        Row: {
          id: string
          booking_id: string
          room_id: string
          price_per_night: number
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          room_id: string
          price_per_night: number
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          room_id?: string
          price_per_night?: number
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          amount: number
          payment_method: 'cash' | 'credit_card' | 'bank_transfer' | 'ota_virtual_card'
          status: 'pending' | 'completed' | 'refunded' | 'failed'
          transaction_id: string | null
          processed_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          amount: number
          payment_method: 'cash' | 'credit_card' | 'bank_transfer' | 'ota_virtual_card'
          status?: 'pending' | 'completed' | 'refunded' | 'failed'
          transaction_id?: string | null
          processed_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          amount?: number
          payment_method?: 'cash' | 'credit_card' | 'bank_transfer' | 'ota_virtual_card'
          status?: 'pending' | 'completed' | 'refunded' | 'failed'
          transaction_id?: string | null
          processed_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          guest_id: string
          rating: number
          comment: string | null
          response: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          guest_id: string
          rating: number
          comment?: string | null
          response?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          guest_id?: string
          rating?: number
          comment?: string | null
          response?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
