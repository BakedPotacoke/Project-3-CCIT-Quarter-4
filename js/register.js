const supabaseUrl = "https://useaetqppiwnwskgflew.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZWFldHFwcGl3bndza2dmbGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDU2MzUsImV4cCI6MjA2MzI4MTYzNX0.-O82dmYa9tE6iWh5bC4LijaKgst5PPmiV1Hkf2tb7xM";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("usern").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  // Use supabaseClient instead of supabase
  const { data, error } = await supabaseClient
    .from("users")
    .insert([{ username,email, password }]);

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("User registered successfully!");
  }
});