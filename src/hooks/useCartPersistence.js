import { useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export const useCartPersistence = (cartItems, setCartItems) => {
  const { user } = useAuth()

  const loadCartFromDatabase = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('user_carts')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.error('Error loading cart:', error)
        return
      }

      if (data && data.length > 0) {
        const cartItemsFromDB = data.map(item => ({
          id: item.product_id,
          name: item.product_name,
          price: parseFloat(item.product_price),
          image: item.product_image,
          quantity: item.quantity
        }))
        setCartItems(cartItemsFromDB)
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }, [user, setCartItems])

  const saveCartToDatabase = useCallback(async () => {
    try {
      // First, clear existing cart items for this user
      await supabase
        .from('user_carts')
        .delete()
        .eq('user_id', user.id)

      // Then insert current cart items
      if (cartItems.length > 0) {
        const cartItemsForDB = cartItems.map(item => ({
          user_id: user.id,
          product_id: item.id,
          product_name: item.name,
          product_price: item.price,
          product_image: item.image,
          quantity: item.quantity
        }))

        const { error } = await supabase
          .from('user_carts')
          .insert(cartItemsForDB)

        if (error) {
          console.error('Error saving cart:', error)
        }
      }
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }, [cartItems, user])

  // Load cart from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase()
    }
  }, [user, loadCartFromDatabase])

  // Save cart to database when cart changes and user is logged in
  useEffect(() => {
    if (user && cartItems.length >= 0) {
      saveCartToDatabase()
    }
  }, [cartItems, user, saveCartToDatabase])

  return {
    loadCartFromDatabase,
    saveCartToDatabase
  }
}
