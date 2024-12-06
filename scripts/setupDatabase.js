import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddsmwhcsqvpkmwmwtniq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkc213aGNzcXZwa213bXd0bmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDUzMjMsImV4cCI6MjA0ODg4MTMyM30.p4AQpFSo5JXgIKMoTZpzSiVERLebl7ZJ1NsfO76Wz3Q';

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertSampleData() {
  try {
    console.log('Checking existing data...');
    
    // Check if demo user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'demo@wellwisefit.com')
      .single();

    if (existingUser) {
      console.log('Demo user already exists, skipping data insertion');
      return;
    }

    console.log('Inserting sample data...');

    // Insert sample user
    const { data: userData, error: insertUserError } = await supabase
      .from('users')
      .insert([
        {
          email: 'demo@wellwisefit.com',
          name: 'Demo User',
          category: 'Health Optimizers'
        }
      ])
      .select()
      .single();

    if (insertUserError) {
      console.error('Error inserting sample user:', insertUserError.message);
      return;
    }

    console.log('Sample user created:', userData);

    // Insert sample workout
    const { error: insertWorkoutError } = await supabase
      .from('workouts')
      .insert([
        {
          user_id: userData.id,
          type: 'Strength Training',
          duration: 45,
          calories: 300,
          date: new Date().toISOString().split('T')[0]
        }
      ]);

    if (insertWorkoutError) {
      console.error('Error inserting sample workout:', insertWorkoutError.message);
      return;
    }

    console.log('Sample workout created');

    // Insert sample survey response
    const { error: insertSurveyError } = await supabase
      .from('survey_responses')
      .insert([
        {
          user_id: userData.id,
          responses: {
            'current-wellbeing': 'excellent',
            'lifestyle-activity': 'highly-active'
          },
          category: 'Health Optimizers'
        }
      ]);

    if (insertSurveyError) {
      console.error('Error inserting sample survey response:', insertSurveyError.message);
      return;
    }

    console.log('Sample survey response created');
    console.log('Sample data insertion completed successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

insertSampleData();