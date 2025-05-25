const supabaseUrl = 'https://useaetqppiwnwskgflew.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZWFldHFwcGl3bndza2dmbGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDU2MzUsImV4cCI6MjA2MzI4MTYzNX0.-O82dmYa9tE6iWh5bC4LijaKgst5PPmiV1Hkf2tb7xM';

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const { data, error } = await supabaseClient
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error) {
            alert('Login failed: ' + error.message);
        } else if (data) {
            alert('Login successful! Welcome, ' + data.email);
            // Optional: redirect or store session
        } else {
            alert('Invalid email or password.');
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred.');
    }
});
