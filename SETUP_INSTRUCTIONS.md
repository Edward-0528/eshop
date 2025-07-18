# Supabase Database Setup Instructions

## Step 1: Run Database Setup SQL

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to the "SQL Editor" in the left sidebar
4. Create a new query
5. Copy and paste the contents of `database-setup.sql` into the editor
6. Click "RUN" to execute the SQL

This will create:
- User profiles table
- User addresses table  
- Persistent cart table
- Orders and order items tables
- Row Level Security policies
- Automatic triggers for user creation and timestamps

## Step 2: Test Your Setup

1. Start your development server: `npm start`
2. Click the user icon in the header
3. Register a new account
4. Add items to your cart
5. Sign out and sign back in - your cart should persist!

## Features Now Available

✅ **User Registration & Login**
- Email/password authentication
- Account verification via email
- Password reset functionality

✅ **User Management**  
- User profile management
- Account dropdown with options
- Secure sign out

✅ **Persistent Cart**
- Cart data saved to database when logged in
- Cart automatically restored when signing back in
- Seamless experience across devices

✅ **Security**
- Row Level Security (RLS) enabled
- Users can only access their own data
- Secure API calls with user authentication

## Next Steps (Optional Enhancements)

1. **User Profile Page** - Allow users to edit their profile
2. **Address Management** - Add/edit shipping addresses  
3. **Order History** - View past orders
4. **Email Notifications** - Order confirmations, shipping updates
5. **Social Login** - Google, Facebook, etc.
6. **Admin Dashboard** - Manage products, orders, users

Your e-commerce app now has a complete authentication system with persistent cart functionality!
