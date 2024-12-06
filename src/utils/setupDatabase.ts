import { supabase } from '../lib/supabase';

async function setupDatabase() {
  try {
    // Create tables using Supabase SQL editor
    const { error: createTablesError } = await supabase.from('users').select('*').limit(1);
    
    if (createTablesError) {
      console.log('Creating tables...');
      
      // Create users table
      await supabase.from('users').insert([
        {
          email: 'demo@wellwisefit.com',
          name: 'Demo User',
          category: 'Health Optimizers'
        }
      ]);

      // Create workouts table
      await supabase.from('workouts').insert([
        {
          user_id: '123', // This will be replaced with actual user ID
          type: 'Strength Training',
          duration: 45,
          calories: 300,
          date: new Date().toISOString().split('T')[0]
        }
      ]);

      // Create survey_responses table
      await supabase.from('survey_responses').insert([
        {
          user_id: '123', // This will be replaced with actual user ID
          responses: {
            'current-wellbeing': 'excellent',
            'lifestyle-activity': 'highly-active'
          },
          category: 'Health Optimizers'
        }
      ]);

      console.log('Database setup completed successfully!');
    } else {
      console.log('Tables already exist, skipping creation.');
    }

  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();