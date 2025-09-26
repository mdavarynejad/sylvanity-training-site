import { createClient } from '@/lib/supabase'

export interface AdminUser {
  id: string
  email: string
  role: 'user' | 'admin' | 'super_admin'
  full_name?: string
}

// Check if the current user is an admin
export async function isAdmin(userId?: string): Promise<boolean> {
  try {
    const supabase = createClient()

    // If no userId provided, use current user
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false
      userId = user.id
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    if (error || !data) return false

    return data.role === 'admin' || data.role === 'super_admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

// Check if the current user is a super admin
export async function isSuperAdmin(userId?: string): Promise<boolean> {
  try {
    const supabase = createClient()

    // If no userId provided, use current user
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false
      userId = user.id
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    if (error || !data) return false

    return data.role === 'super_admin'
  } catch (error) {
    console.error('Error checking super admin status:', error)
    return false
  }
}

// Get current admin user info
export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, role, full_name')
      .eq('id', user.id)
      .single()

    if (error || !profile) return null

    if (profile.role !== 'admin' && profile.role !== 'super_admin') {
      return null
    }

    return {
      id: profile.id,
      email: user.email || '',
      role: profile.role as 'admin' | 'super_admin',
      full_name: profile.full_name
    }
  } catch (error) {
    console.error('Error getting current admin user:', error)
    return null
  }
}

// Log admin activity
export async function logAdminActivity(
  action: string,
  resourceType: string,
  resourceId?: string,
  details?: Record<string, any>
): Promise<void> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    await supabase
      .from('admin_activity_log')
      .insert({
        admin_id: user.id,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details: details || {}
      })
  } catch (error) {
    console.error('Error logging admin activity:', error)
  }
}

// Middleware function to protect admin routes
export async function requireAdmin(): Promise<AdminUser> {
  const adminUser = await getCurrentAdminUser()

  if (!adminUser) {
    throw new Error('Access denied. Admin privileges required.')
  }

  return adminUser
}

// Get admin dashboard stats
export async function getAdminStats() {
  try {
    const supabase = createClient()

    // Check if user is admin first
    const adminUser = await getCurrentAdminUser()
    if (!adminUser) {
      throw new Error('Access denied. Admin privileges required.')
    }

    const { data, error } = await supabase
      .from('admin_stats')
      .select('*')
      .single()

    if (error) {
      console.error('Error fetching admin stats:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error getting admin stats:', error)
    return null
  }
}